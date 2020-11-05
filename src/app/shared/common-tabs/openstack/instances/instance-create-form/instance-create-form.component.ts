import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { DetailsFormBase } from '@objects-view/details-form-base';
import { IInstanceModel } from '@fleio-api/openstack/model/instance.model';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfigService } from '@shared/config/config.service';
import { InstancesApiService } from '@fleio-api/openstack/instance/instances-api.service';
import { Observable, of } from 'rxjs';
import { debounceTime, switchMap } from 'rxjs/operators';
import { ClientsApiService } from '@fleio-api/client-user/client/clients-api.service';
import { IClientModel } from '@fleio-api/client-user/model/client.model';
import { IActionResult } from '@objects-view/interfaces/actions/action-result';
import { IInstanceCreateOptions } from '@fleio-api/openstack/model/instance-create-options';
import { ISelectedBootSource } from './boot-source-select/boot-source-select.component';
import { IFlavorModel } from '@fleio-api/openstack/model/flavor.model';
import { NotificationService } from '@shared/ui-api/notification.service';
import { FlavorsAsCardsComponent } from '@shared/fleio-data-controls/flavors-as-cards/flavors-as-cards.component';
import { ImagesApiService } from '@fleio-api/openstack/image/image-api.service';

@Component({
  selector: 'app-instance-create-form',
  templateUrl: './instance-create-form.component.html',
  styleUrls: ['./instance-create-form.component.scss']
})
export class InstanceCreateFormComponent extends DetailsFormBase<IInstanceModel> implements OnInit {
  @ViewChild('nicsSelect', {static: true}) nicsSelect;
  @ViewChild('bootSourceSelectComponent', {static: false}) bootSourceSelectComponent;
  @ViewChild('flavorsAsCards') flavorsAsCardsComponent: FlavorsAsCardsComponent;
  instanceForm = this.formBuilder.group({
    name: ['', Validators.required],
    client: ['', Validators.required],
    region: ['', Validators.required],
    flavor: ['', Validators.required],
    user_data: [null],
    nics: [[], Validators.required],
    ssh_keys: [[]],
    root_password: [''],
  });
  clientControl = this.instanceForm.controls.client;
  filteredClients: IClientModel[];
  createOptions = this.activatedRoute.snapshot.data.createOptions as IInstanceCreateOptions;
  selectedBootSource: ISelectedBootSource | null;
  showUserData = false;
  showPasswordText = false;
  selectedFlavor: IFlavorModel | null;
  loading = false;
  flavorsAsCards = this.flavorsAsCardsActive();
  flavorsAsCardsReload = true;
  clickedSave = false;
  imageLaunchId = this.activatedRoute.snapshot.queryParams.image_id || null;
  requestedImage = this.activatedRoute.snapshot.queryParams.requestedImage || false;
  shareImage = false;

  flavorsAsCardsActive() {
    if (this.config && this.config.current) {
      return this.config.current.settings.instanceForm.flavorsAsCards;
    }
    return false;
  }

  constructor(
    private formBuilder: FormBuilder, private instancesApiService: InstancesApiService, private router: Router,
    public config: ConfigService, private activatedRoute: ActivatedRoute, private clientApiService: ClientsApiService,
    private notificationService: NotificationService, changeDetectorRef: ChangeDetectorRef,
    private imagesApiService: ImagesApiService,
  ) {
    super(null, changeDetectorRef);
  }

  clickedClientInput() {
    this.instanceForm.get('client').setValue('');
  }

  displayClientFn(client) {
    return client.name || client.id;
  }

  private saveInstance(): Observable<IActionResult> {
    this.clickedSave = true;
    if (this.flavorsAsCards) {
      if (this.flavorsAsCardsComponent.selectedFlavor) {
        this.instanceForm.controls.flavor.setValue(this.flavorsAsCardsComponent.selectedFlavor.id);
      } else {
        this.notificationService.showMessage('You must choose a flavor!');
        return of(null);
      }
    }
    if (!this.instanceForm.controls.client.value) {
      this.notificationService.showMessage('You must choose a client!');
      return of(null);
    }
    if (!this.selectedBootSource || (this.selectedBootSource && !this.selectedBootSource.objectId)) {
      this.notificationService.showMessage('You must choose a boot source!');
      return of(null);
    }
    if (!this.instanceForm.value.flavor) {
      this.fieldErrors.flavor = 'This field is required';
      return of(null);
    }
    this.loading = true;
    if (!this.instanceForm.valid) {
      this.loading = false;
      return of(null);
    }
    const value = this.instanceForm.value;
    let volumeType = this.selectedBootSource.storageType;
    if (this.selectedBootSource.type === 'volume') {
      volumeType = '';
    }
    value.boot_source = {
      create_new_volume: this.selectedBootSource.createNewVolume,
      delete_on_termination: this.selectedBootSource.deleteOnTermination,
      source_id: this.selectedBootSource.objectId,
      source_type: this.selectedBootSource.type,
      volume_size: this.selectedBootSource.volumeSize,
      volume_type: volumeType,
    }; // set boot_source based on selectedBootSource options sent from the boot-source-select-component
    value.client = value.client.id;
    if (value.hasOwnProperty('ssh_keys') && value.ssh_keys.length === 0) {
      delete value.ssh_keys;
    } else {
      value.ssh_keys = JSON.stringify(value.ssh_keys);
    }
    if (value.root_password === '') {
      delete value.root_password;
    }
    if (this.shareImage === true) {
      value.share_image = true;
    }
    this.createOrUpdate(this.instancesApiService, value, true).subscribe(() => {
      this.loading = false;
      this.notificationService.showMessage('Create instance operation started.');
      this.router.navigateByUrl(
        this.config.getPanelUrl(
          this.object.id ? `openstack/instances/${this.object.id}` : 'openstack/instances'
        )
      ).catch(() => {
        this.loading = false;
      });
    }, () => {
      this.loading = false;
    });

    return of(null);
  }

  public resetCreateOptions() {
    const clientId = this.instanceForm.get('client').value.id;
    if (clientId) {
      const params = {
        client: this.instanceForm.get('client').value.id,
        region: this.instanceForm.get('region').value
      };
      if (this.imageLaunchId && this.requestedImage) {
        // @ts-ignore
        params.image = this.imageLaunchId;
      }
      this.instancesApiService.createOptions(params)
        .subscribe((createOptions: IInstanceCreateOptions) => {
        this.createOptions = createOptions;
        this.preselectPublicNics();
        if (this.imageLaunchId) {
          // init boot source on image launch
          const imagesArray = [
            this.createOptions.bootSources.image,
            this.createOptions.bootSources.owned_image,
            this.createOptions.bootSources.community_image,
          ];
          if (this.requestedImage && Array.isArray(this.createOptions.bootSources.requested_image)) {
            // add requested image array
            imagesArray.push(this.createOptions.bootSources.requested_image);
          }
          this.selectedBootSource = this.bootSourceSelectComponent.initBootSource(imagesArray);
          this.checkImageAvailableToClient();
          this.refreshFlavors(true);
        } else if (!this.setSimilarImage()) {
          // if function returns false, it means similar boot source image was not set, de-select boot source
          this.selectedBootSource = this.bootSourceSelectComponent.initBootSource();
        }
        if (this.flavorsAsCards) {
          this.flavorsAsCardsReload = !this.flavorsAsCardsReload;
          this.changeDetectorRef.detectChanges();
          this.flavorsAsCardsReload = !this.flavorsAsCardsReload;
          this.changeDetectorRef.detectChanges();
        }
        this.setSimilarFlavor();
      });
    } else {
      // fetch only by region
      this.instancesApiService.createOptions({
        region: this.instanceForm.get('region').value
      }).pipe().subscribe((createOptions: IInstanceCreateOptions) => {
        this.createOptions = createOptions;
        this.preselectPublicNics();
        if (!this.setSimilarImage()) {
          // if function returns false, it means similar boot source image was not set, de-select boot source
          this.selectedBootSource = this.bootSourceSelectComponent.initBootSource();
        }
        if (this.flavorsAsCards) {
          this.flavorsAsCardsReload = !this.flavorsAsCardsReload;
          this.changeDetectorRef.detectChanges();
          this.flavorsAsCardsReload = !this.flavorsAsCardsReload;
          this.changeDetectorRef.detectChanges();
        }
        this.setSimilarFlavor();
      });
    }
  }

  private checkImageAvailableToClient() {
    // if selected image boot source has to be shared with selected client, show a dialog to do so
    if (this.selectedBootSource && this.selectedBootSource.objectId) {
      const client = this.instanceForm.controls.client.value;
      this.imagesApiService.availableToClient(
        this.selectedBootSource.objectId,
        client.id
      ).subscribe(response => {
        if (response.needsSharing) {
          this.notificationService.confirmDialog({
            title: `Share image to client?`,
            message: `The selected image is not available to ${client.name}`,
            importantMessage: `In order to proceed, the image needs to be shared with ${client.name}`,
          }).subscribe(dialogResult => {
            if (dialogResult === 'yes') {
              this.shareImage = true;
            }
          });
        }
      }, error => {
        this.notificationService.showMessage('Could not determine if image has to be shared with client.');
      });
    }
  }

  private preselectPublicNics() {
    if (this.createOptions && this.createOptions.nics.length === 1 &&
      this.config.current.settings.instanceForm.hideNetworksIfOnlyOneAvailable) {
      // only one network, select it and hide input selector
      this.instanceForm.controls.nics.setValue([this.createOptions.nics[0].id]);
      return;
    }
    if (this.createOptions && this.createOptions.nics && this.createOptions.nics.length &&
      this.config.current.settings.instanceForm.preselectPublicNetworks) {
      for (const nic of this.createOptions.nics) {
        for (const tag of nic.tags) {
          if (tag.tag_name === 'public') {
            this.instanceForm.controls.nics.setValue([nic.id]);
            return;
          }
        }
      }
    }
  }

  public closeNicsSelect() {
    this.nicsSelect.close();
  }

  public switchUserData() {
    this.showUserData = !this.showUserData;
    if (this.showUserData === false) {
      this.instanceForm.controls.user_data.setValue(null);
    }
  }

  refreshFlavors(onlyCompatibleFlavors=false) {
    if (this.selectedBootSource && this.selectedBootSource.object) {
      this.instancesApiService.getFlavorsAssignedToImage(
        this.selectedBootSource.object.id, this.instanceForm.value.client.id, onlyCompatibleFlavors
      ).subscribe(response => {
        this.createOptions.flavor = response.flavors;
        let oldSelectedStillPresent = false;
        const selectedFlavorId = this.instanceForm.controls.flavor.value;
        if (selectedFlavorId) {
          for (const flavor of this.createOptions.flavor) {
            if (flavor.id === selectedFlavorId) {
              oldSelectedStillPresent = true;
            }
          }
        }
        if (selectedFlavorId && !oldSelectedStillPresent) {
          this.instanceForm.controls.flavor.setValue('');
        }
        if (this.flavorsAsCards && this.imageLaunchId) {
          this.flavorsAsCardsReload = !this.flavorsAsCardsReload;
          this.changeDetectorRef.detectChanges();
          this.flavorsAsCardsReload = !this.flavorsAsCardsReload;
          this.changeDetectorRef.detectChanges();
        }
      }, () => {
        this.notificationService.showMessage('Could not refresh flavors.');
      });
    }
  };

  public onBootSourceChange(selectedBootSource: ISelectedBootSource) {
    this.selectedBootSource = selectedBootSource;
    if (this.bootSourceIsImage()) {
      if (!this.flavorsAsCards) {
        this.refreshFlavors();
      }
      // de-select selected flavor if it is incompatible
      if (this.instanceForm.controls.flavor.value) {
        for (const flavor of this.createOptions.flavor) {
          if (this.instanceForm.controls.flavor.value === flavor.id) {
            if (this.selectedBootSource.object.min_disk > flavor.root_gb ||
              this.selectedBootSource.object.min_ram > parseInt(flavor.memory_mb, 2)) {
              this.instanceForm.controls.flavor.setValue(null);
            }
          }
        }
      }
    }
  }

  public bootSourceIsWindows() {
    return (this.selectedBootSource && this.selectedBootSource.object &&
      this.selectedBootSource.object.os_distro === 'windows');
  }

  public bootSourceIsImage() {
    if (this.selectedBootSource && this.selectedBootSource.type) {
      return [
        'image', 'owned_image', 'community_image', 'shared_image', 'requested_image'
      ].indexOf(this.selectedBootSource.type) > -1;
    }
    return false;
  }

  private setSimilarFlavor() {
    // on region change, select a similar flavor
    if (this.createOptions.flavor && this.instanceForm.controls.flavor.value) {
      if (this.selectedFlavor && this.selectedFlavor.name && this.selectedFlavor.memory_mb) {
        for (const newFlavor of this.createOptions.flavor) {
          if (newFlavor.name === this.selectedFlavor.name && newFlavor.memory_mb === this.selectedFlavor.memory_mb) {
            this.instanceForm.controls.flavor.setValue(newFlavor.id);
            this.flavorChanged(newFlavor);
            return;
          }
        }
      }
    }
    // de-select flavor if a similar one was not found
    this.instanceForm.controls.flavor.setValue(null);
  }

  onFlavorChosen(flavor: IFlavorModel) {
    // on flavors as cards flavor select
    this.flavorChanged(flavor);
  }

  flavorChanged(newFlavor: IFlavorModel) {
    if (newFlavor) {
      // this will trigger flavor - boot source compatibility checks in boot source component
      this.selectedFlavor = newFlavor;
    }
    if (this.flavorsAsCards) {
      this.refreshImages(newFlavor);
    }
  }

  refreshImages(newFlavor: IFlavorModel) {
    this.instancesApiService.getFlavorRelatedImages(
      newFlavor,
      this.instanceForm.controls.region.value,
      this.instanceForm.controls.client.value.id,
    ).subscribe(response => {
      if (response.bootSources) {
        this.createOptions.bootSources.image = response.bootSources.image;
        this.createOptions.bootSources.owned_image = response.bootSources.owned_image;
        this.createOptions.bootSources.shared_image = response.bootSources.shared_image;
        this.createOptions.bootSources.community_image = response.bootSources.community_image;
      }
      this.checkAndResetBootSources(newFlavor);
    }, () => {
      this.notificationService.showMessage('Failed to load images related to selected flavor.');
    });
  }

  isFlavorDisabled(flavor) {
    // If booting from image , test image disk size to make sure we can boot from it
    if (this.selectedBootSource && this.selectedBootSource.object &&
      ['image', 'owned_image', 'community_image'].indexOf(this.selectedBootSource.type) > -1) {
      return (this.selectedBootSource.object.min_disk > flavor.root_gb && flavor.root_gb > 0) ||
        this.selectedBootSource.object.min_ram > flavor.memory_mb;
    }
    return false;
  };

  checkOldImageAvailableInNewImages(image, alreadyFound) {
    if (alreadyFound === true) {
      return true;
    }
    if (this.selectedBootSource && ['image', 'owned_image', 'shared_image',
        'community_image'].indexOf(this.selectedBootSource.type) > -1 && this.selectedBootSource.object &&
      this.selectedBootSource.object.id === image.id) {
      return image.assigned_to_flavor;
    }
    return false;
  }

  checkAndResetBootSources(newFlavor: IFlavorModel) {
    let maxRam = Number.MAX_VALUE;
    let maxStorage = Number.MAX_VALUE;
    if (newFlavor) {
      maxRam = newFlavor.memory_gb;
      maxStorage = newFlavor.root_gb;
    }
    const imagesKeys = ['image', 'owned_image', 'shared_image', 'community_image'];
    let availableInNewImages = false;
    for (const imageKey of imagesKeys) {
      for (const image of this.createOptions.bootSources[imageKey]) {
        image.disabled = (image.min_disk > maxStorage && maxStorage > 0) || ((image.min_ram / 1024) > maxRam);
        availableInNewImages = this.checkOldImageAvailableInNewImages(image, availableInNewImages);
      }
    }
    if (this.isFlavorDisabled(newFlavor) || !availableInNewImages) {
      this.selectedBootSource = this.bootSourceSelectComponent.initBootSource();
    }
  }

  private setSimilarImage() {
    if (this.selectedBootSource && this.selectedBootSource.object && this.selectedBootSource.type === 'image'
      && this.selectedBootSource.createNewVolume) {
      let foundSimilarVolumeType = false;
      for (const volumeType of this.createOptions.bootSources.volume_types) {
        if (volumeType.name === this.selectedBootSource.storageType) {
          foundSimilarVolumeType = true;
        }
      }
      if (!foundSimilarVolumeType) {
        return false;
      }
    }
    if (this.selectedBootSource && this.selectedBootSource.object && this.selectedBootSource.type === 'image'
      && this.createOptions.bootSources.image && this.createOptions.bootSources.image.length) {
      for (const newImage of this.createOptions.bootSources.image) {
        if (newImage.min_disk <= this.selectedBootSource.object.min_disk &&
          newImage.os_distro === this.selectedBootSource.object.os_distro &&
          newImage.min_ram <= this.selectedBootSource.object.min_ram) {
          // similar image was found
          this.selectedBootSource.object = newImage as any;
          this.selectedBootSource.objectId = newImage.id as string;
          this.bootSourceSelectComponent.selectedBootSource.object = newImage as any;
          this.bootSourceSelectComponent.selectedBootSource.objectId = newImage.id as string;
          this.bootSourceSelectComponent.similarBootSourceWasSet();
          return true;
        }
      }
    }
    return false;
  }

  public getSelectedFlavor(): (IFlavorModel | null) {
    if (this.flavorsAsCards) {
      return this.selectedFlavor;
    }
    if (this.instanceForm.controls.flavor.value) {
      for (const flavor of this.createOptions.flavor) {
        if (flavor.id === this.instanceForm.controls.flavor.value) {
          return flavor;
        }
      }
    }
    return null;
  }

  ngOnInit() {
    if (this.objectController) {
      this.objectController.actionCallback = () => this.saveInstance();
    }

    if (this.createOptions) {
      if (this.activatedRoute.snapshot.queryParams.region) {
        this.createOptions.selected_region = this.activatedRoute.snapshot.queryParams.region;
      }
      for (const region of this.createOptions.region) {
        if (this.createOptions.selected_region && region.id === this.createOptions.selected_region) {
          this.instanceForm.get('region').setValue(region.id);
        }
      }
    }

    this.preselectPublicNics();
    this.instanceForm.get('client').valueChanges
      .pipe(
        debounceTime(300),
        switchMap(value => this.clientApiService.list({
          search: value,
          has_enabled_project: true,
        }).pipe()),
      ).subscribe((clients: { objects: IClientModel[] }) => {
      this.filteredClients = clients.objects;
    });
    this.selectedFlavor = null;
    this.instanceForm.get('flavor').valueChanges
      .pipe().subscribe(flavorId => {
      for (const flavor of this.createOptions.flavor) {
        if (flavor.id === flavorId) {
          this.selectedFlavor = flavor;
        }
      }
    });
  }

}
