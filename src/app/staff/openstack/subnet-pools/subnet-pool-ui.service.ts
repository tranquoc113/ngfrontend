import { IPermissionsModel } from '@fleio-api/base-model/IPermissionsModel';
import { IIcon } from '@shared/ui/common/interfaces/icon';
import { ITitle } from '@objects-view/interfaces/card-data/card-title';
import { IObjectStatus } from '@objects-view/interfaces/object-status';
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
import { ISubnetPoolModel } from '@fleio-api/openstack/subnet-pools/model/subnet-pool.model';
import { SubnetPoolsApiService } from '@fleio-api/openstack/subnet-pools/subnet-pools-api.service';
import { SubnetPoolDetailsOverviewComponent } from './tabs/subnet-pool-details-overview/subnet-pool-details-overview.component';
import { SubnetPoolEditFormComponent } from './tabs/subnet-pool-edit-form/subnet-pool-edit-form.component';

export class SubnetPoolUiService extends ObjectUIServiceBase<ISubnetPoolModel> {
  private readonly router: Router;
  private readonly config: ConfigService;
  private readonly subnetPoolsApiService: SubnetPoolsApiService;
  private readonly datePipe: DatePipe;


  constructor(
    subnetPoolModel: ISubnetPoolModel, permissions: IPermissionsModel, state: string,
    router: Router, config: ConfigService, subnetPoolsApiService: SubnetPoolsApiService
  ) {
    super(subnetPoolModel, permissions, state);
    this.router = router;
    this.config = config;
    this.subnetPoolsApiService = subnetPoolsApiService;
    this.datePipe = new DatePipe(this.config.locale);
  }

  getIcon(): IIcon {
    return null;
  }

  getStatus(): IObjectStatus {
    return null
  }

  getTitle(): ITitle {
    const shared = this.object.shared? 'SHARED' : 'NOT SHARED';
    const subText = this.object.is_default? `${shared} - DEFAULT`: shared;
    switch (this.state) {
      case 'edit':
        return {
          text: `Edit subnet pool ${this.object.name}`,
          subText,
        };

      case 'create':
        return {
          text: `Create new subnet pool`,
        };

      case 'details':
      default:
        return {
          text: this.object.name,
          subText,
        };
    }
  }

  getActions(): IAction[] {
    const actions: IAction[] = [];

    actions.push(new RouterLinkAction({
        icon: {name: 'edit', class: 'fl-icons'},
        name: 'Edit subnet pool',
        tooltip: 'Edit subnet pool',
        routerUrl: this.config.getPanelUrl(`openstack/subnet-pools/${this.object.id}/edit`),
        router: this.router,
        noPermissions: !this.permissions['subnetpools.update'],
      }
    ));

    actions.push(new ApiCallAction(
      {
        object: this.object,
        icon: {name: 'delete'},
        name: 'Delete subnet pool',
        tooltip: 'Delete subnet pool',
        confirmOptions: {
          confirm: true,
          title: 'Delete subnet pool',
          message: `Are you sure you want to delete subnet pool ${this.object.name}`,
        },
        successMessage: 'Subnet pool delete queued',
        errorMessage: 'Failed to delete subnet pool, check logs for details',
        apiService: this.subnetPoolsApiService,
        callType: CallType.Delete,
        refreshAfterExecute: false,
        redirectAfterExecute: true,
        redirectUrl: this.config.getPanelUrl('openstack/subnet-pools'),
        noPermissions: !this.permissions['subnetpools.destroy'],
      }
    ));

    return actions;
  }

  getDetailsActions(): IAction[] {
    const actions = [];

    switch (this.state) {
      case 'create':
        actions.push(new RouterLinkAction({
            name: 'Cancel',
            routerUrl: this.config.getPrevUrl(`openstack/subnet-pools`),
            router: this.router,
          }
        ));
        actions.push(new CallbackAction({name: 'Create'}));
        break;
      case 'edit':
        actions.push(new RouterLinkAction({
            name: 'Cancel',
            routerUrl: this.config.getPrevUrl(`openstack/subnet-pools`),
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
    return this.config.getPanelUrl(`openstack/subnet-pools/${this.object.id}`);
  }

  getCardFields(): IDataField[] {
    const fields = [
      {
        name: 'Created at',
        value: this.datePipe.transform(this.object.created_at),
      },
      {
        name: 'Region',
        value: this.object.region,
      },
      {
        value: this.object.prefixes.join(', '),
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
            component: SubnetPoolDetailsOverviewComponent,
          },
        ];
      case 'create':
        return [
          {
            tabName: 'Create',
            component: SubnetPoolEditFormComponent,
          },
        ];
      case 'edit':
        return [
          {
            tabName: 'Edit',
            component: SubnetPoolEditFormComponent,
          },
        ];
    }
  }

  getCardTags(): string[] {
    return null;
  }
}
