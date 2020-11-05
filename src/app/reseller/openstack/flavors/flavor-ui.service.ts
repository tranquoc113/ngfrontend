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
import { CallbackAction } from '@objects-view/actions/callback-action';
import { IFlavorModel } from '@fleio-api/openstack/model/flavor.model';
import { FlavorsApiService } from '@fleio-api/openstack/flavor/flavors-api.service';
import { FlavorDetailsOverviewComponent } from '@shared/common-tabs/openstack/flavors/flavor-details-overview/flavor-details-overview.component';
import { FlavorEditFormComponent } from '@shared/common-tabs/openstack/flavors/flavor-edit-form/flavor-edit-form.component';

export class FlavorUiService extends ObjectUIServiceBase<IFlavorModel> {
  private readonly router: Router;
  private readonly config: ConfigService;
  private readonly flavorsApiService: FlavorsApiService;
  private readonly datePipe: DatePipe;


  constructor(
    flavor: IFlavorModel, permissions: IPermissionsModel, state: string,
    router: Router, config: ConfigService, flavorsApiService: FlavorsApiService
  ) {
    super(flavor, permissions, state);
    this.router = router;
    this.config = config;
    this.flavorsApiService = flavorsApiService;
    this.datePipe = new DatePipe(this.config.locale);
  }

  isGlobal(): boolean {
    return !this.object.reseller_resources;
  }

  getIcon(): IIcon {
    return null;
  }

  getStatus(): IObjectStatus {
    if (this.object.disabled) {
      return {type: StatusType.Defined, value: StatusValue.Disabled};
    } else {
      return {type: StatusType.Defined, value: StatusValue.Enabled};
    }
  }

  getTitle(): ITitle {
    switch (this.state) {
      case 'edit':
        return {
          text: `Edit ${this.object.name}`,
        };

      case 'create':
        return {
          text: `Create new flavor`,
        };

      case 'details':
      default:
        return {
          text: `${this.object.name}`,
          subText: `${this.object.disabled ? 'DISABLED' : 'ACTIVE'}, ${this.object.region}`,
        };
    }
  }

  getActions(): IAction[] {
    const actions: IAction[] = [];

    if (!this.isGlobal()) {
      actions.push(new RouterLinkAction({
          icon: {name: 'edit', class: 'fl-icons'},
          name: 'Edit',
          tooltip: 'Edit',
          routerUrl: this.config.getPanelUrl(`openstack/flavors/${this.object.id}/edit`),
          router: this.router,
        }
      ));

      actions.push(new ApiCallAction(
        {
          object: this.object,
          icon: {name: 'delete'},
          name: 'Delete',
          tooltip: 'Delete',
          confirmOptions: {
            confirm: true,
            title: 'Delete flavor',
            message: `Are you sure you want to delete flavor ${this.object.name}`,
          },
          successMessage: 'Flavor deleted',
          errorMessage: 'Failed to delete flavor',
          apiService: this.flavorsApiService,
          callType: CallType.Delete,
          refreshAfterExecute: false,
          redirectAfterExecute: true,
          redirectUrl: this.config.getPanelUrl('openstack/flavors'),
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
              title: 'Hide flavor for clients',
              message: `Are you sure you want hide flavor ${this.object.name} for clients`,
            },
            apiService: this.flavorsApiService,
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
              title: 'Display flavor for clients',
              message: `Are you sure you want display flavor ${this.object.name} for clients`,
            },
            apiService: this.flavorsApiService,
            callType: CallType.Post,
            apiAction: 'display_for_clients'
          }
        ));
      }
    }

    return actions;
  }

  getDetailsActions(): IAction[] {
    const actions = [];

    switch (this.state) {
      case 'create':
        actions.push(new RouterLinkAction({
            name: 'Cancel',
            routerUrl: this.config.getPrevUrl(`openstack/flavors`),
            router: this.router,
          }
        ));
        actions.push(new CallbackAction({name: 'Create'}));
        break;
      case 'edit':
        actions.push(new RouterLinkAction({
            name: 'Cancel',
            routerUrl: this.config.getPrevUrl(`openstack/flavors`),
            router: this.router,
          }
        ));
        actions.push(new CallbackAction({
          name: 'Save',
          refreshAfterExecute: false,
        }));
        break;
      default:
        break;
    }

    return actions;
  }

  getDetailsLink(): string {
    return this.config.getPanelUrl(`openstack/flavors/${this.object.id}`);
  }

  getCardFields(): IDataField[] {
    const fields = [
      {
        value: `${this.object.vcpus} vCPUs`
      },
      {
        value: `${this.object.memory_mb} MB RAM, ${this.object.root_gb} GB disk`
      },
      {
        name: 'Group',
        value: this.object.flavor_group?.name || 'n/a',
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
            component: FlavorDetailsOverviewComponent,
          },
        ];
      case 'create':
        return [
          {
            tabName: 'Create',
            component: FlavorEditFormComponent,
          },
        ];
      case 'edit':
        return [
          {
            tabName: 'Create',
            component: FlavorEditFormComponent,
          },
        ];
    }
  }

  getCardTags(): string[] {
    const tags: string[] = [];
    if (this.isGlobal()) {
      tags.push('global');
      if (this.object.display_for_clients) {
        tags.push('visible');
      } else {
        tags.push('hidden');
      }
    } else {
      if (this.object.show_in_fleio && this.object.is_public) {
        tags.push('visible');
      } else {
        tags.push('hidden');
      }
    }

    return tags;
  }
}
