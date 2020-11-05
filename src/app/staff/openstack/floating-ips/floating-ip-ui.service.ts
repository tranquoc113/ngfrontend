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
import { ApiCallAction, CallType } from '@objects-view/actions/api-call-action';
import { IFloatingIpModel } from '@fleio-api/openstack/floating-ips/model/floating-ip.model';
import { FloatingIpsApiService } from '@fleio-api/openstack/floating-ips/floating-ips-api.service';
import { FloatingIpEditFormComponent } from './tabs/floating-ip-edit-form/floating-ip-edit-form.component';
import { FloatingIpDetailsOverviewComponent } from './tabs/floating-ip-details-overview/floating-ip-details-overview.component';

export class FloatingIpUiService extends ObjectUIServiceBase<IFloatingIpModel> {
  private readonly router: Router;
  private readonly config: ConfigService;
  private readonly floatingIpsApiService: FloatingIpsApiService;
  private readonly datePipe: DatePipe;

  constructor(
    floatingIpModel: IFloatingIpModel, permissions: IPermissionsModel, state: string,
    router: Router, config: ConfigService, floatingIpsApiService: FloatingIpsApiService
  ) {
    super(floatingIpModel, permissions, state);
    this.router = router;
    this.config = config;
    this.floatingIpsApiService = floatingIpsApiService;
    this.datePipe = new DatePipe(this.config.locale);
  }

  getIcon(): IIcon {
    return null;
  }

  getStatus(): IObjectStatus {
    switch (this.object.status) {
      case 'ACTIVE':
        return {type: StatusType.Defined, value: StatusValue.Active};
      case 'DOWN':
        return {type: StatusType.Defined, value: StatusValue.Disabled};
      default:
        return {type: StatusType.None, value: StatusValue.None};
    }
  }

  getTitle(): ITitle {
    switch (this.state) {
      case 'create':
        return {
          text: `Create new floating ip`,
        };

      default:
        return {
          text: `${this.object.floating_ip_address || this.object.id.toString()}`,
          subText: this.object.status,
        };
    }
  }

  getActions(): IAction[] {
    const actions: IAction[] = [];

    actions.push(new ApiCallAction(
      {
        object: this.object,
        icon: {name: 'delete'},
        name: 'Delete',
        tooltip: 'Delete floating ip',
        confirmOptions: {
          confirm: true,
          title: 'Delete floating IP',
          message: `Are you sure you want to delete floating IP ${this.object.floating_ip_address || this.object.id}`,
        },
        successMessage: 'Floating IP delete queued',
        errorMessage: 'Failed to delete floating IP, check logs for details',
        apiService: this.floatingIpsApiService,
        callType: CallType.Delete,
        refreshAfterExecute: false,
        redirectAfterExecute: true,
        redirectUrl: this.config.getPanelUrl('openstack/floating-ips'),
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
            routerUrl: this.config.getPrevUrl(`openstack/floating-ips`),
            router: this.router,
          }
        ));
        actions.push(new CallbackAction({
          name: 'Create',
        }));
        break;
      default:
        break;
    }

    return actions;
  }

  getDetailsLink(): string {
    return this.config.getPanelUrl(`openstack/floating-ips/${this.object.id}`);
  }

  getCardFields(): IDataField[] {
    const fields = [
      {name: 'Region', value: this.object.floating_network.region},
      {name: 'Network', value: this.object.floating_network.name},
    ] as IDataField[];

    return fields;
  }

  getTabs(): IDetailsTab[] {
    switch (this.state) {
      case 'create':
        return [
          {
            tabName: 'Create',
            component: FloatingIpEditFormComponent,
          },
        ];
      case 'details':
        return [
          {
            tabName: 'Overview',
            component: FloatingIpDetailsOverviewComponent,
          },
        ];
    }
  }

  getCardTags(): string[] {
    const tags = [];
    return tags;
  }
}
