import { IPermissionsModel } from '@fleio-api/base-model/IPermissionsModel';
import { IIcon } from '@shared/ui/common/interfaces/icon';
import { ITitle } from '@objects-view/interfaces/card-data/card-title';
import { IObjectStatus, StatusType, StatusValue } from '@objects-view/interfaces/object-status';
import { ObjectUIServiceBase } from '@objects-view/object-ui-service-base';
import { IAction } from '@objects-view/interfaces/actions/action';
import { RouterLinkAction } from '@objects-view/actions/router-link-action';
import { Router } from '@angular/router';
import { ConfigService } from '@shared/config/config.service';
import { IDataField } from '@objects-view/interfaces/card-data/data-field';
import { ApiCallAction, CallType } from '@objects-view/actions/api-call-action';
import { IDetailsTab } from '@objects-view/interfaces/details/details-tab';
import { DatePipe } from '@angular/common';
import { ImagesApiService } from '@fleio-api/openstack/image/image-api.service';
import { IImageModel } from '@fleio-api/openstack/model/image.model';
import { ImageDetailsOverviewComponent } from '@openstack-images-tabs/image-details-overview/image-details-overview.component';
import { ImageEditFormComponent } from '@openstack-images-tabs/image-edit-form/image-edit-form.component';

export class ImageUiService extends ObjectUIServiceBase<IImageModel> {
  private readonly router: Router;
  private readonly config: ConfigService;
  private readonly imagesApiService: ImagesApiService;
  private readonly datePipe: DatePipe;


  constructor(
    image: IImageModel, permissions: IPermissionsModel, state: string,
    router: Router, config: ConfigService, imagesApiService: ImagesApiService
  ) {
    super(image, permissions, state);
    this.router = router;
    this.config = config;
    this.imagesApiService = imagesApiService;
    this.datePipe = new DatePipe(this.config.locale);
  }

  isGlobal(): boolean {
    return !this.object.reseller_resources;
  }

  getIcon(): IIcon {
    if (this.state === 'create') {
      return null;
    }
    return {
      class: 'fl-icons',
      name: (this.object.os_distro || 'otheros').split('-').pop(),
    };
  }

  getStatus(): IObjectStatus {
    switch (this.object.status) {
      case 'deactivated':
        return {
          type: StatusType.Defined,
          value: StatusValue.Deactivated,
        };
      case 'active':
      default:
        return {
          type: StatusType.Defined,
          value: StatusValue.Active,
        };
    }
  }

  getTitle(): ITitle {
    let prefix = '';
    if (this.object.type === 'snapshot') {
      prefix = 'snapshot';
    }

    if (this.object.disk_format === 'iso') {
      prefix = 'ISO';
    }

    if (prefix.length > 0) {
      prefix = `[${prefix}] `;
    }

    switch (this.state) {
      case 'edit':
        return {
          text: `Edit ${this.object.name || this.object.id}`,
          subText: this.object.status ? this.object.status.toLocaleUpperCase() : 'n/a',
        };

      case 'create':
        return {
          text: `Create new image`,
        };

      case 'details':
      default:
        return {
          text: `${prefix}${this.object.name || this.object.id}`,
          subText: this.object.status ? this.object.status.toLocaleUpperCase() : 'n/a',
        };
    }
  }

  getActions(): IAction[] {
    const actions: IAction[] = [];

    if (!this.isGlobal()) {
      actions.push(new RouterLinkAction({
          icon: {name: 'edit', class: 'fl-icons'},
          name: 'Edit',
          tooltip: 'Edit image',
          routerUrl: this.config.getPanelUrl(`openstack/images/${this.object.id}/edit`),
          router: this.router,
        }
      ));
    } else {
      if (this.object.display_for_clients) {
        actions.push(new ApiCallAction(
          {
            object: this.object,
            icon: {name: 'visibility_off'},
            name: 'Hide for clients',
            tooltip: 'Hide for clients',
            confirmOptions: {
              confirm: true,
              title: 'Hide image for clients',
              message: `Are you sure you want hide image ${this.object.name || this.object.id} for clients`,
            },
            apiService: this.imagesApiService,
            callType: CallType.Post,
            apiAction: 'hide_for_clients'
          }
        ));
      } else {
        actions.push(new ApiCallAction(
          {
            object: this.object,
            icon: {name: 'visibility'},
            name: 'Display for clients',
            tooltip: 'Display for clients',
            confirmOptions: {
              confirm: true,
              title: 'Display image for clients',
              message: `Are you sure you want display image ${this.object.name || this.object.id} for clients`,
            },
            apiService: this.imagesApiService,
            callType: CallType.Post,
            apiAction: 'display_for_clients'
          }
        ));
      }
    }

    if (!this.isGlobal()) {
      actions.push(new ApiCallAction(
        {
          object: this.object,
          icon: {name: 'delete'},
          name: 'Delete',
          tooltip: 'Delete image',
          confirmOptions: {
            confirm: true,
            title: 'Delete image',
            message: `Are you sure you want to delete image ${this.object.name}`,
          },
          successMessage: 'Image delete queued',
          errorMessage: 'Failed to delete image',
          apiService: this.imagesApiService,
          callType: CallType.Delete,
          refreshAfterExecute: false,
          redirectAfterExecute: true,
          redirectUrl: this.config.getPanelUrl('openstack/images'),
        }
      ));
    }

    return actions;
  }

  getDetailsActions(): IAction[] {
    const actions = [];

    return actions;
  }

  getDetailsLink(): string {
    return this.config.getPanelUrl(`openstack/images/${this.object.id}`);
  }

  getCardFields(): IDataField[] {
    const fields = [
      {
        value: `${this.object.min_disk} GB min. disk, ${this.object.region}`
      },
      {
        name: 'Created:',
        value: this.datePipe.transform(this.object.created_at),
      },
    ];

    return fields;
  }

  getTabs(): IDetailsTab[] {
    switch (this.state) {
      case 'details':
        return [
          {
            tabName: 'Overview',
            component: ImageDetailsOverviewComponent,
          },
        ];
      case 'create':
        return [
          {
            tabName: 'Create',
            component: ImageEditFormComponent,
          },
        ];
      case 'edit':
        return [
          {
            tabName: 'Create',
            component: ImageEditFormComponent,
          },
        ];
    }
  }

  getCardTags(): string[] {
    const tags: string[] = [];
    if (this.object.protected) {
      tags.push('protected');
    }
    return tags;
  }
}
