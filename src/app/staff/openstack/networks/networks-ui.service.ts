import { ObjectUIServiceBase } from '@objects-view/object-ui-service-base';
import { Router } from '@angular/router';
import { ConfigService } from '@shared/config/config.service';
import { DatePipe } from '@angular/common';
import { IPermissionsModel } from '@fleio-api/base-model/IPermissionsModel';
import { IIcon } from '@shared/ui/common/interfaces/icon';
import { IObjectStatus } from '@objects-view/interfaces/object-status';
import { ITitle } from '@objects-view/interfaces/card-data/card-title';
import { IAction } from '@objects-view/interfaces/actions/action';
import { RouterLinkAction } from '@objects-view/actions/router-link-action';
import { ApiCallAction, CallType } from '@objects-view/actions/api-call-action';
import { CallbackAction } from '@objects-view/actions/callback-action';
import { IDataField } from '@objects-view/interfaces/card-data/data-field';
import { IDetailsTab } from '@objects-view/interfaces/details/details-tab';
import { INetworkModel } from '@fleio-api/openstack/model/network.model';
import { NetworksApiService } from '@fleio-api/openstack/network/networks-api.service';
import { NetworkEditFormComponent } from './tabs/network-edit-form/network-edit-form.component';
import { NetworkDetailsOverviewComponent } from './tabs/network-details-overview/network-details-overview.component';
import { NetworkEditSubnetFormComponent } from './tabs/network-edit-subnet-form/network-edit-subnet-form.component';
import { ISubnetModel } from '@fleio-api/openstack/model/subnet.model';
import { NetworkAutoCreateFormComponent } from './tabs/network-auto-create-form/network-auto-create-form.component';
import { NetworkConfigAutoCreateFormComponent } from './tabs/network-config-auto-create-form/network-config-auto-create-form.component';

export class NetworkUiService extends ObjectUIServiceBase<INetworkModel> {
  private readonly router: Router;
  private readonly config: ConfigService;
  private readonly networksApiService: NetworksApiService;
  private readonly datePipe: DatePipe;

  constructor(
    networkModel: INetworkModel, permissions: IPermissionsModel, state: string,
    router: Router, config: ConfigService, networksApiService: NetworksApiService
  ) {
    super(networkModel, permissions, state);
    this.router = router;
    this.config = config;
    this.networksApiService = networksApiService;
    this.datePipe = new DatePipe(this.config.locale);
  }

  getIcon(): IIcon {
    return null;
  }

  getStatus(): IObjectStatus {
    return null;
  }

  getTitle(additionalObjects?: { subnet: ISubnetModel }): ITitle {
    switch (this.state) {
      case 'edit':
        return {
          text: `Edit network ${this.object.name}`,
          subText: this.object.status,
        };

      case 'create':
        return {
          text: `Create new network`,
        };

      case 'auto-create':
        return {
          text: `Get me a network`,
        };

      case 'config-auto-create':
        return {
          text: `Config auto create options`,
        };

      case 'add-subnet':
        return {
          text: `Add a new subnet to network ${this.object.name}`,
        };

      case 'edit-subnet':
        return {
          text: `Edit subnet ${additionalObjects.subnet.name} of network ${this.object.name}`,
        };

      default:
        return {
          text: `${this.object.name}`,
          subText: this.object.status,
        };
    }
  }

  getActions(): IAction[] {
    const actions: IAction[] = [];

    actions.push(new RouterLinkAction({
        icon: {name: 'edit', class: 'fl-icons'},
        name: 'Edit',
        tooltip: 'Edit network',
        routerUrl: this.config.getPanelUrl(`openstack/networks/${this.object.id}/edit`),
        router: this.router,
        noPermissions: !this.permissions['networks.update'],
      }
    ));

    actions.push(new RouterLinkAction({
        icon: {name: 'playlist_add'},
        name: 'Add subnet',
        tooltip: 'Add subnet',
        routerUrl: this.config.getPanelUrl(`openstack/networks/${this.object.id}/add-subnet`),
        router: this.router,
      }
    ));

    const deleteAction = new ApiCallAction(
      {
        object: this.object,
        icon: {name: 'delete'},
        tooltip: 'Delete network',
        name: 'Delete',
        confirmOptions: {
          confirm: true,
          title: 'Delete network',
          message: `Are you sure you want to delete network ${this.object.name}`,
        },
        successMessage: 'Network delete queued',
        errorMessage: 'Failed to delete network, check logs for details',
        apiService: this.networksApiService,
        callType: CallType.Delete,
        refreshAfterExecute: false,
        redirectAfterExecute: true,
        redirectUrl: 'openstack/networks',
        noPermissions: !this.permissions['networks.destroy'],
      }
    );

    actions.push(deleteAction);

    return actions;
  }

  getDetailsActions(): IAction[] {
    const actions = [];

    switch (this.state) {
      case 'config-auto-create':
        actions.push(new RouterLinkAction({
            name: 'Cancel',
            routerUrl: this.config.getPrevUrl(`openstack/networks`),
            router: this.router,
          }
        ));
        actions.push(new CallbackAction({name: 'Apply & recheck configuration'}));
        break;
      case 'auto-create':
      case 'create':
        actions.push(new RouterLinkAction({
            name: 'Cancel',
            routerUrl: this.config.getPrevUrl(`openstack/networks`),
            router: this.router,
          }
        ));
        actions.push(new CallbackAction({name: 'Create'}));
        break;
      case 'add-subnet':
        actions.push(new RouterLinkAction({
            name: 'Cancel',
            routerUrl: this.config.getPrevUrl(`openstack/networks`),
            router: this.router,
          }
        ));
        actions.push(new CallbackAction({name: 'Add subnet'}));
        break;
      case 'edit-subnet':
        actions.push(new RouterLinkAction({
            name: 'Cancel',
            routerUrl: this.config.getPrevUrl(`openstack/networks`),
            router: this.router,
          }
        ));
        actions.push(new CallbackAction({name: 'Save subnet'}));
        break;
      case 'edit':
        actions.push(new RouterLinkAction({
            name: 'Cancel',
            routerUrl: this.config.getPrevUrl(`openstack/networks`),
            router: this.router,
          }
        ));
        actions.push(new CallbackAction({name: 'Save'}));
        break;
      default:
        break;
    }

    return actions;
  }

  getDetailsLink(): string {
    return this.config.getPanelUrl(`openstack/networks/${this.object.id}`);
  }

  getCardFields(): IDataField[] {
    const fields = [
      {name: 'Created at', value: this.datePipe.transform(this.object.created_at)},
      {name: 'Region', value: this.object.region},
    ];

    return fields;
  }

  getTabs(): IDetailsTab[] {
    switch (this.state) {
      case 'config-auto-create':
        return [
          {
            tabName: 'Create',
            component: NetworkConfigAutoCreateFormComponent,
          },
        ];
      case 'auto-create':
        return [
          {
            tabName: 'Create',
            component: NetworkAutoCreateFormComponent,
          },
        ];
      case 'create':
        return [
          {
            tabName: 'Create',
            component: NetworkEditFormComponent,
          },
        ];
      case 'details':
        return [
          {
            tabName: 'Create',
            component: NetworkDetailsOverviewComponent,
          },
        ];
      case 'add-subnet':
        return [
          {
            tabName: 'Add interface',
            component: NetworkEditSubnetFormComponent,
          },
        ];
      case 'edit':
        return [
          {
            tabName: 'Edit',
            component: NetworkEditFormComponent,
          },
        ];
      case 'edit-subnet':
        return [
          {
            tabName: 'Edit interface',
            component: NetworkEditSubnetFormComponent,
          },
        ];
    }
  }

  getCardTags(): string[] {
    const tags = [];
    return tags;
  }

  getObjectDetailsRefreshInterval(): number {
    return 5000;
  }
}
