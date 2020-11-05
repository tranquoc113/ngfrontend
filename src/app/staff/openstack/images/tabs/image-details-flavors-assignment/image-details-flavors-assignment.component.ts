import { Component, OnInit } from '@angular/core';
import { DetailsComponentBase } from '@objects-view/details-component-base';
import { ConfigService } from '@shared/config/config.service';
import { IImageModel } from '@fleio-api/openstack/model/image.model';
import { FormBuilder } from '@angular/forms';
import { IFlavorModel } from '@fleio-api/openstack/model/flavor.model';
import { map, mergeMap, startWith } from 'rxjs/operators';
import { ImagesApiService } from '@fleio-api/openstack/image/image-api.service';
import { Observable } from 'rxjs';
import { FlavorsApiService } from '@fleio-api/openstack/flavor/flavors-api.service';
import { IFlavorGroupModel } from '@fleio-api/openstack/model/flavor-group.model';
import { FlavorGroupsApiService } from '@fleio-api/openstack/flavor-group/flavor-groups-api.service';
import { FleioObjectsList } from '@fleio-api/fleio-objects-list';
import { FleioId } from '@fleio-api/base-model/base-fleio-object.model';
import { NotificationService } from '@shared/ui-api/notification.service';

@Component({
  selector: 'app-image-details-flavors-assignment',
  templateUrl: './image-details-flavors-assignment.component.html',
  styleUrls: ['./image-details-flavors-assignment.component.scss']
})
export class ImageDetailsFlavorsAssignmentComponent extends DetailsComponentBase<IImageModel> implements OnInit {
  assignForm = this.formBuilder.group({
    flavor: [''],
    flavorGroup: [''],
  })
  filteredFlavors$: Observable<IFlavorModel[]>;
  filteredFlavorGroups$: Observable<IFlavorGroupModel[]>;
  flavors: FleioObjectsList<IFlavorModel>;
  flavorGroups: FleioObjectsList<IFlavorGroupModel>;

  currentFlavorPage = 1;
  currentFlavorGroupPage = 1;
  flavorColumns = ['id', 'name', 'region', 'actions'];
  flavorGroupColumns = ['id', 'name', 'actions'];

  constructor(
    public config: ConfigService,
    private formBuilder: FormBuilder,
    private imagesApiService: ImagesApiService,
    private flavorsApiService: FlavorsApiService,
    private flavorGroupsApiService: FlavorGroupsApiService,
    private notificationService: NotificationService,
  ) {
    super();
  }

  clearFlavorInput() {
    this.assignForm.get('flavor').setValue('');
  }

  flavorDisplay(flavor?: IFlavorModel): string {
    if (flavor) {
      return `${flavor.name} - ${flavor.region}`;
    } else {
      return '';
    }
  }

  clearFlavorGroupInput() {
    this.assignForm.get('flavorGroup').setValue('');
  }

  flavorGroupDisplay(flavorGroup?: IFlavorGroupModel): string {
    if (flavorGroup) {
      return `${flavorGroup.name}`;
    } else {
      return '';
    }
  }

  refreshFlavors() {
    this.flavorsApiService.getFlavorsAssignedToImage(
      this.object.id, this.currentFlavorPage,
    ).subscribe(flavors => {
      this.flavors = flavors;
    });
  }

  refreshFlavorGroups() {
    this.flavorGroupsApiService.getFlavorGroupsAssignedToImage(
      this.object.id, this.currentFlavorGroupPage,
    ).subscribe(flavorGroups => {
      this.flavorGroups = flavorGroups;
    });
  }

  refreshFlavorsAndFlavorGroups() {
    this.refreshFlavors();
    this.refreshFlavorGroups();
  }

  ngOnInit(): void {
    super.ngOnInit();

    if (this.object) {
      this.refreshFlavorsAndFlavorGroups();

      this.filteredFlavors$ = this.assignForm.controls.flavor.valueChanges.pipe(
        startWith(''),
        map(value => {
          return typeof value === 'string' ? value : value.id;
        }),
        mergeMap(() => {
          return this.flavorsApiService.getAvailableFlavorsForImage(
            this.object.id,
          ).pipe(map(flavorsList => flavorsList.objects));
        })
      );
      this.filteredFlavorGroups$ = this.assignForm.controls.flavorGroup.valueChanges.pipe(
        startWith(''),
        map(value => {
          return typeof value === 'string' ? value : value.id;
        }),
        mergeMap(() => {
          return this.flavorGroupsApiService.getAvailableFlavorGroupsForImage(
            this.object.id,
          ).pipe(map(flavorGroupsList => flavorGroupsList.objects));
        })
      );
    }
  }

  changeFlavorPage(action: string) {
    if (action === 'next') {
      this.currentFlavorPage = this.currentFlavorPage + 1;
      this.refreshFlavors();
    }
    if (action === 'previous') {
      this.currentFlavorPage = this.currentFlavorPage - 1;
      this.refreshFlavors();
    }
  };

  changeFlavorGroupPage(action: string) {
    if (action === 'next') {
      this.currentFlavorGroupPage = this.currentFlavorGroupPage + 1;
      this.refreshFlavorGroups();
    }
    if (action === 'previous') {
      this.currentFlavorGroupPage = this.currentFlavorGroupPage - 1;
      this.refreshFlavorGroups();
    }
  };

  assignFlavor() {
    const flavor = this.assignForm.controls.flavor.value as IFlavorModel
    if (flavor && flavor.id) {
      this.flavorsApiService.addToImage(flavor.id, this.object.id).subscribe(() => {
        this.notificationService.showMessage('Flavor assigned to image');
        this.refreshFlavors();
        this.clearFlavorInput();
      })
    }
  }

  removeFlavor(flavorId: FleioId) {
    this.notificationService.confirmDialog({
      title: 'Remove flavor from image',
      message: `Are you sure you want to remove flavor ${flavorId} from image?`
    }).subscribe(result => {
      if (result === 'yes') {
        this.flavorsApiService.removeFromImage(flavorId, this.object.id).subscribe(() => {
          this.notificationService.showMessage('Flavor removed from image');
          this.refreshFlavors();
        });
      }
    });
  }

  assignFlavorGroup() {
    const flavorGroup = this.assignForm.controls.flavorGroup.value as IFlavorGroupModel
    if (flavorGroup && flavorGroup.id) {
      this.flavorGroupsApiService.addToImage(flavorGroup.id, this.object.id).subscribe(() => {
        this.notificationService.showMessage('Flavor group assigned to image');
        this.refreshFlavorGroups();
        this.clearFlavorGroupInput();
      })
    }
  }

  removeFlavorGroup(flavorGroupId: FleioId) {
    this.notificationService.confirmDialog({
      title: 'Remove flavor group from image',
      message: `Are you sure you want to remove flavor group ${flavorGroupId} from image?`
    }).subscribe(result => {
      if (result === 'yes') {
        this.flavorGroupsApiService.removeFromImage(flavorGroupId, this.object.id).subscribe(() => {
          this.notificationService.showMessage('Flavor group removed from image');
          this.refreshFlavorGroups();
        });
      }
    });
  }
}
