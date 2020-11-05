import {
  Component,
  EventEmitter,
  HostBinding,
  Input, OnChanges,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { IImageModel } from '@fleio-api/openstack/model/image.model';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { IVolumeModel } from '@fleio-api/openstack/model/volume.model';
import { IVolumeType } from '@fleio-api/openstack/model/volume-type.model';
import { ConfigService } from '@shared/config/config.service';
import { IFlavorModel } from '@fleio-api/openstack/model/flavor.model';
import { NotificationService } from '@shared/ui-api/notification.service';
import { MatTabGroup } from '@angular/material/tabs';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '@shared/auth/auth.service';
import { IVolumeSnapshotModel } from '@fleio-api/openstack/model/volume-snapshot.model';

export interface ISelectedBootSource {
  object: (IImageModel & IVolumeModel) | null;
  objectId: string | null;
  type?: string;
  createNewVolume: boolean;
  deleteOnTermination: boolean;
  volumeSize?: number;
  storageType?: string;
  tabIndex?: number;
}

@Component({
  selector: 'app-boot-source-select',
  templateUrl: './boot-source-select.component.html',
  styleUrls: ['./boot-source-select.component.scss'],
  animations: [
    trigger('openCloseDialog', [
      state('closed', style({
        opacity: '0',
        left: '100%'
      })),
      state('open', style({
        opacity: '1',
        left: '{{leftSize}}px'
      }), {
        params: {
          leftSize: 330
        }
      }),
      transition('open => closed', [
        animate('0.2s ease-out')
      ]),
      transition('closed => open', [
        animate('0.2s ease-out')
      ]),
    ]),
  ],
})
export class BootSourceSelectComponent implements OnInit, OnChanges {
  @ViewChild('bootSourcesTabGroup', {static: false}) bootSourcesTabGroup: MatTabGroup;
  @Input() images: IImageModel[];
  @Input() communityImages: IImageModel[];
  @Input() ownedImages: IImageModel[];
  @Input() sharedImages: IImageModel[];
  @Input() volumes: IVolumeModel[];
  @Input() volumeSnapshots: Array<IVolumeSnapshotModel>;
  @Input() requestedImages: Array<IImageModel>;
  @Input() volumeTypes: IVolumeType[];
  @Input() requestedBootSource: boolean;
  @Input() showStorageSelection = true;
  @Input() selectedFlavor: (IFlavorModel | null);
  @Input() selectedRegionName: string;
  @Output() selectedBootSourceInter = new EventEmitter<ISelectedBootSource>();
  sizeIncrement: number | null;
  minimumSize: number | null;
  selectedBootSource: ISelectedBootSource | null;
  savedBootSource: ISelectedBootSource | null;
  showSources = false;
  selectedTab = 0;
  leftSize: number;
  trigger: any;
  isImageType = ['image', 'owned_image', 'community_image', 'shared_image', 'requested_image'];

  constructor(
    public config: ConfigService,
    private notificationService: NotificationService,
    private activatedRoute: ActivatedRoute,
    public authService: AuthService,
  ) {
  }

  @HostBinding('@openCloseDialog') get openCloseDialog() {
    const screenWidth = window.innerWidth;
    if (screenWidth > 1280) {
      this.leftSize = 330;
    } else {
      this.leftSize = 0;
    }
    return {value: this.trigger, params: {leftSize: this.leftSize}};
  }

  public changedSource(type) {
    this.selectedBootSource.type = type;
    if (this.isImageType.indexOf(type) > -1) {
      this.setBootVolumeSize();
    }
  }

  public bootSourceIcon() {
    if (this.selectedBootSource && this.selectedBootSource.type) {
      if (this.isImageType.indexOf(this.selectedBootSource.type) > -1) {
        if (this.selectedBootSource.object) {
          return (this.selectedBootSource.object.os_distro || 'otheros').split('-').pop();
        } else {
          return 'otheros';
        }
      }
      if (this.selectedBootSource.type === 'volume' || this.selectedBootSource.type === 'volume_snapshot') {
        return 'volumes';
      }
    }
    return 'otheros';
  }

  getImageTooltip(image: IImageModel) {
    if (!image.assigned_to_flavor) {
      return 'Image is not assigned to the selected\nflavor or flavor group.';
    }
    if (image.disabled) {
      return 'Image requires a flavor\nwith more resources.';
    }
    return '';
  }

  public storageTypeChanged() {
    if (this.selectedBootSource.storageType === 'local') {
      this.selectedBootSource.createNewVolume = false;
      return;
    } else {
      this.selectedBootSource.createNewVolume = true;
      if (!this.sizeIncrement) {
        this.sizeIncrement = 1;
      }
      if (!this.minimumSize) {
        this.minimumSize = 1;
      }
    }
    let newSizeIncrement = 1;
    let newMinimumSize = 1;
    if (this.selectedBootSource.storageType) {
      this.volumeTypes.forEach((el) => {
        if (el.name === this.selectedBootSource.storageType) {
          newSizeIncrement = el.sizeIncrement;
          newMinimumSize = el.minimumSize;
        }
      });
    }
    this.sizeIncrement = newSizeIncrement;
    this.minimumSize = newMinimumSize;
    this.setBootVolumeSize();
  }

  private setBootVolumeSize() {
    const currentVolumeSize = (this.selectedBootSource.volumeSize ?
      this.selectedBootSource.volumeSize : this.minimumSize);
    if (this.selectedBootSource.object && this.selectedBootSource.object.min_disk > currentVolumeSize) {
      this.selectedBootSource.volumeSize = this.selectedBootSource.object.min_disk;
    } else {
      this.selectedBootSource.volumeSize = currentVolumeSize;
    }
    if (this.selectedBootSource.volumeSize) {
      while (this.selectedBootSource.volumeSize % this.sizeIncrement !== 0) {
        this.selectedBootSource.volumeSize = this.selectedBootSource.volumeSize + 1;
      }

      if (this.selectedBootSource.volumeSize < this.minimumSize) {
        this.selectedBootSource.volumeSize = this.minimumSize;
      }
    }
  }

  public validVolumeSize() {
    if (!this.selectedBootSource || !this.selectedBootSource.object) {
      return true;
    }
    const isImageSelected = this.isImageType.indexOf(this.selectedBootSource.type) > -1;
    if (typeof this.selectedBootSource.volumeSize !== 'number') {
      return false;
    }
    if (this.selectedBootSource.volumeSize % this.sizeIncrement !== 0) {
      return false;
    }
    if (isImageSelected && this.selectedBootSource && this.selectedBootSource.type &&
      this.selectedBootSource.object.min_disk) {
      if (this.selectedBootSource.volumeSize < this.selectedBootSource.object.min_disk) {
        return false;
      }
    }
    return true;
  }

  public setBootSourceObject(object) {
    this.selectedBootSource.object = object;
  }

  public makeSelection() {
    this.showSources = !this.showSources;
    this.emitBootSourceEvent();
    this.selectedBootSource.tabIndex = this.selectedTab;
    this.savedBootSource = JSON.parse(JSON.stringify(this.selectedBootSource));
  }

  public cancelSelection() {
    this.showSources = !this.showSources;
    this.selectedBootSource = JSON.parse(JSON.stringify(this.savedBootSource));
    if (this.savedBootSource && this.savedBootSource.tabIndex) {
      this.selectedTab = this.savedBootSource.tabIndex;
    } else {
      this.selectedTab = 0;
    }
  }

  private initBootSource(imagesList: Array<Array<IImageModel>> = null) {
    const defaultStorageType = this.getDefaultStorageType();
    const createNewVolume = defaultStorageType !== 'local';
    const imageId = this.activatedRoute.snapshot.queryParams.image_id || null;
    let image = null;
    let tabIndex = 0;
    if (!imagesList) {
      imagesList = [this.images, this.ownedImages, this.communityImages];
      if (Array.isArray(this.requestedImages)) {
        imagesList.push(this.requestedImages);
      }
    }
    for (const [index, imageList] of imagesList.entries()) {
      if (imageList) {
        image = imageList.find(i => i.id === imageId);
        if (image) {
          tabIndex = index;
          break;
        }
      }
    }

    this.selectedBootSource = {
      type: image ? 'image' : null,
      objectId: image ? image.id : null,
      object: image ? image : null,
      tabIndex,
      createNewVolume,
      deleteOnTermination: true,
      storageType: this.getDefaultStorageType(),
    };
    this.storageTypeChanged();
    this.setBootVolumeSize();
    this.savedBootSource = JSON.parse(JSON.stringify(this.selectedBootSource));
    return this.selectedBootSource;
  }

  public showSideDialog() {
    this.showSources = !this.showSources;
    // initialize selected tab based on the saved value
    if (this.savedBootSource && this.savedBootSource.tabIndex) {
      this.selectedTab = this.savedBootSource.tabIndex;
    } else {
      this.bootSourcesTabGroup.realignInkBar();
      // has to be realigned due to a bug that doesn't show it if hidden at first
    }
  }

  public changedTab(tabEvent) {
    if (tabEvent.index >= 0) {
      this.selectedTab = tabEvent.index;
      if (['Public images', 'Client images', 'Community images',
        'Requested image', 'Shared images'].indexOf(tabEvent.tab.textLabel) > -1) {
        this.selectedBootSource.type = 'image'; // type will correctly be set when choosing a new object or when
        // clicking cancel because of object reset from the saved boot source
      } else if (['Volume snapshots'].indexOf(tabEvent.tab.textLabel) > -1) {
        this.selectedBootSource.type = 'volume_snapshot';
      } else {
        this.selectedBootSource.type = 'volume';
      }
    }
  }

  public doubleClickedSource() {
    this.makeSelection();
  }

  private getDefaultStorageType(): string {
    if (this.config && this.config.current && this.config.current.settings) {
      let computeStorageEnabled = this.config.current.settings.instanceForm.localComputeStorageEnabled;
      if (this.selectedFlavor) {
        if (this.selectedFlavor.root_gb > 0) {
          if (this.config.current.settings.instanceForm.hideVolumeSelectionForFlavorsWithDisk) {
            computeStorageEnabled = true; // only local storage type
          }
        } else {
          computeStorageEnabled = false; // always disable local storage when flavor has disk == 0
        }
      }
      if (computeStorageEnabled) {
        return 'local';
      } else {
        if (this.volumeTypes && this.volumeTypes.length) {
          if (this.config.current.settings.instanceForm.defaultVolumeType && this.selectedRegionName) {
            if (this.config.current.settings.instanceForm.defaultVolumeType.hasOwnProperty(this.selectedRegionName)) {
              let foundVolumeType = false;
              for (const volumeType of this.volumeTypes) {
                if (volumeType.name === this.config.current.settings.instanceForm.defaultVolumeType[this.selectedRegionName]) {
                  foundVolumeType = true;
                  break;
                }
              }
              if (foundVolumeType) {
                return this.config.current.settings.instanceForm.defaultVolumeType[this.selectedRegionName];
              } else {
                return this.volumeTypes[0].name;
              }
            } else {
              return this.volumeTypes[0].name;
            }
          } else {
            return this.volumeTypes[0].name;
          }
        }
      }
    }
    return 'local';
  }

  // TODO: create method to de-select source when region changes or select a similar one
  ngOnInit() {
    this.leftSize = 330;
    this.sizeIncrement = 1;
    const defaultStorageType = this.getDefaultStorageType();
    const createNewVolume = defaultStorageType !== 'local';
    this.savedBootSource = {
      tabIndex: 0,
      objectId: null,
      createNewVolume,
      deleteOnTermination: true,
      object: undefined,
      storageType: defaultStorageType,
    };
    this.initBootSource();
  }

  showVolumeOptions() {
    return this.authService.feature('openstack.volumes') && this.selectedBootSource &&
      (this.isImageType.indexOf(this.selectedBootSource.type) > -1) &&
      !(this.config.current.settings.instanceForm.hideVolumeSelectionForFlavorsWithDisk &&
        this.selectedFlavor && this.selectedFlavor.root_gb > 0);
  }

  ngOnChanges(changes) {
    if (changes.selectedFlavor && changes.selectedFlavor.currentValue) {
      const newFlavor = changes.selectedFlavor.currentValue;
      if (this.selectedBootSource && this.selectedBootSource.createNewVolume) {
        if (newFlavor.root_gb > 0 && this.config.current.settings.instanceForm.hideVolumeSelectionForFlavorsWithDisk) {
          this.initBootSource();
          this.notificationService.showMessage(
            'Please reselect boot source as selected flavor cannot be used with volumes.'
          );
        }
      } else {
        if (newFlavor.root_gb === 0 && this.selectedBootSource && this.selectedBootSource.object &&
          this.selectedBootSource.type !== 'volume' && this.selectedBootSource.type !== 'volume_snapshot') {
          this.initBootSource();
          this.notificationService.showMessage(
            'Please reselect boot source as selected flavor cannot be used without volumes.'
          );
        }
      }
    }
  }

  public similarBootSourceWasSet() {
    this.selectedBootSource.tabIndex = 0;
    this.emitBootSourceEvent();
    this.savedBootSource = JSON.parse(JSON.stringify(this.selectedBootSource));
  }

  private emitBootSourceEvent() {
    const bootSource = {...this.selectedBootSource}
    if (['volume', 'volume_snapshot'].indexOf(bootSource.type) >= 0) {
      bootSource.deleteOnTermination = false;
    }
    this.selectedBootSourceInter.emit(bootSource);
  }
}
