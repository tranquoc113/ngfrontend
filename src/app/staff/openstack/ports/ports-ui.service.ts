import { ObjectUIServiceBase } from '@objects-view/object-ui-service-base';
import { Router } from '@angular/router';
import { ConfigService } from '@shared/config/config.service';
import { DatePipe } from '@angular/common';
import { IPermissionsModel } from '@fleio-api/base-model/IPermissionsModel';
import { IObjectStatus, StatusType, StatusValue } from '@objects-view/interfaces/object-status';
import { IIcon } from '@shared/ui/common/interfaces/icon';
import { ITitle } from '@objects-view/interfaces/card-data/card-title';
import { IAction } from '@objects-view/interfaces/actions/action';
import { RouterLinkAction } from '@objects-view/actions/router-link-action';
import { CallbackAction } from '@objects-view/actions/callback-action';
import { IDataField } from '@objects-view/interfaces/card-data/data-field';
import { IDetailsTab } from '@objects-view/interfaces/details/details-tab';
import { PortsApiService } from '@fleio-api/openstack/port/ports-api.service';
import { IPortModel } from '@fleio-api/openstack/model/port.model';
import { ApiCallAction, CallType } from '@objects-view/actions/api-call-action';
import { PortCreateFormComponent } from './tabs/port-create-form/port-create-form.component';
import { PortDetailsOverviewComponent } from './tabs/port-details-overview/port-details-overview.component';
import { PortEditFormComponent } from './tabs/port-edit-form/port-edit-form.component';

export class PortUiService extends ObjectUIServiceBase<IPortModel> {
  private readonly router: Router;
  private readonly config: ConfigService;
  private readonly portsApiService: PortsApiService;
  private readonly datePipe: DatePipe;

  constructor(
    iPortModel: IPortModel, permissions: IPermissionsModel, state: string,
    router: Router, config: ConfigService, portsApiService: PortsApiService
  ) {
    super(iPortModel, permissions, state);
    this.router = router;
    this.config = config;
    this.portsApiService = portsApiService;
    this.datePipe = new DatePipe(this.config.locale);
  }

  getIcon(): IIcon {
    return null;
  }

  getStatus(): IObjectStatus {
    switch (this.object.status) {
      case 'ACTIVE':
        return {type: StatusType.Defined, value: StatusValue.Active};
      case 'BUILD':
        return {type: StatusType.Defined, value: StatusValue.Pending};
      case 'DOWN':
        return {type: StatusType.Defined, value: StatusValue.Disabled};
      case 'ERROR':
        return {type: StatusType.Defined, value: StatusValue.Error};
      default:
        return {type: StatusType.None, value: StatusValue.None};
    }
  }

  getTitle(): ITitle {
    switch (this.state) {
      case 'edit':
        return {
          text: `Edit port ${this.object.name || this.object.id.toString()}`,
        };

      case 'create':
        return {
          text: `Create new port`,
        };

      default:
        return {
          text: `${this.object.name || this.object.id.toString()}`,
          subText: this.object.status,
        };
    }
  }

  getActions(): IAction[] {
    const actions: IAction[] = [];

    actions.push(new RouterLinkAction({
        icon: {name: 'edit', class: 'fl-icons'},
        name: 'Edit',
        tooltip: 'Edit port',
        routerUrl: this.config.getPanelUrl(`openstack/ports/${this.object.id}/edit`),
        router: this.router,
      }
    ));

    actions.push(new ApiCallAction(
      {
        object: this.object,
        icon: {name: 'delete'},
        name: 'Delete',
        tooltip: 'Delete port',
        confirmOptions: {
          confirm: true,
          title: 'Delete port',
          message: `Are you sure you want to delete port ${this.object.id}`,
        },
        successMessage: 'Port delete queued',
        errorMessage: 'Failed to delete port, check logs for details',
        apiService: this.portsApiService,
        callType: CallType.Delete,
        refreshAfterExecute: false,
        redirectAfterExecute: true,
        redirectUrl: this.config.getPanelUrl('openstack/ports'),
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
            routerUrl: this.config.getPrevUrl(`openstack/ports`),
            router: this.router,
          }
        ));
        actions.push(new CallbackAction({name: 'Create'}));
        break;
      case 'edit':
        actions.push(new RouterLinkAction({
            name: 'Cancel',
            routerUrl: this.config.getPrevUrl(`openstack/ports`),
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
    return this.config.getPanelUrl(`openstack/ports/${this.object.id}`);
  }

  getCardFields(): IDataField[] {
    const fields = [
      {name: 'Fixed IPs', value: this.getFixedIPs() || 'n/a'},
      {name: 'Device owner', value: this.object.device_owner},
    ] as IDataField[];

    return fields;
  }

  public getFixedIPs() {
    let fixedIps = '';
    for (const ip of this.object.fixed_ips) {
      if (typeof ip !== 'string') {
        if (fixedIps) {
          fixedIps += ', ';
        }
        fixedIps += ip.ip_address;
      }
    }
    return fixedIps;
  }

  getTabs(): IDetailsTab[] {
    switch (this.state) {
      case 'create':
        return [
          {
            tabName: 'Create',
            component: PortCreateFormComponent,
          },
        ];
      case 'details':
        return [
          {
            tabName: 'Overview',
            component: PortDetailsOverviewComponent,
          },
        ];
      case 'edit':
        return [
          {
            tabName: 'Edit',
            component: PortEditFormComponent,
          },
        ];
    }
  }

  getCardTags(): string[] {
    const tags = [];
    return tags;
  }
}
