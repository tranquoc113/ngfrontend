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
import { IZoneModel } from '@fleio-api/openstack/zone/model/zone.model';
import { ZonesApiService } from '@fleio-api/openstack/zone/zones-api.service';
import { ZoneDetailsOverviewComponent } from './tabs/zone-details-overview/zone-details-overview.component';
import { ZoneEditFormComponent } from './tabs/zone-edit-form/zone-edit-form.component';
import { CallbackAction } from '@objects-view/actions/callback-action';

export class ZoneUiService extends ObjectUIServiceBase<IZoneModel> {
  private readonly router: Router;
  private readonly config: ConfigService;
  private readonly zonesApiService: ZonesApiService;
  private readonly datePipe: DatePipe;


  constructor(
    zone: IZoneModel, permissions: IPermissionsModel, state: string,
    router: Router, config: ConfigService, zonesApiService: ZonesApiService
  ) {
    super(zone, permissions, state);
    this.router = router;
    this.config = config;
    this.zonesApiService = zonesApiService;
    this.datePipe = new DatePipe(this.config.locale);
  }

  getIcon(): IIcon {
    return null;
  }

  getStatus(): IObjectStatus {
    return null;
  }

  getTitle(): ITitle {
    switch (this.state) {
      case 'edit':
        return {
          text: `Edit ${this.object.name}`,
          subText: this.object.status.toLocaleUpperCase(),
        };

      case 'create':
        return {
          text: `Create new zone`,
        };

      case 'details':
      default:
        return {
          text: `${this.object.name}`,
          subText: this.object.status.toLocaleUpperCase(),
        };
    }
  }

  getActions(): IAction[] {
    const actions: IAction[] = [];

    actions.push(new RouterLinkAction({
        icon: {name: 'edit', class: 'fl-icons'},
        name: 'Edit',
        tooltip: 'Edit zone',
        routerUrl: this.config.getPanelUrl(`openstack/zones/${this.object.id}/edit`),
        router: this.router,
        noPermissions: !this.permissions['dns.update'],
      }
    ));

    actions.push(new ApiCallAction(
      {
        object: this.object,
        icon: {name: 'delete'},
        name: 'Delete',
        tooltip: 'Delete zone',
        confirmOptions: {
          confirm: true,
          title: 'Delete zone',
          message: `Are you sure you want to delete zone ${this.object.name}`,
        },
        successMessage: 'Zone deleted',
        errorMessage: 'Failed to delete zone, check logs for details',
        apiService: this.zonesApiService,
        callType: CallType.Delete,
        refreshAfterExecute: false,
        redirectAfterExecute: true,
        redirectUrl: this.config.getPanelUrl('openstack/zones'),
        noPermissions: !this.permissions['dns.destroy'],
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
            routerUrl: this.config.getPrevUrl(`openstack/zones`),
            router: this.router,
          }
        ));
        actions.push(new CallbackAction({name: 'Create'}));
        break;
      case 'edit':
        actions.push(new RouterLinkAction({
            name: 'Cancel',
            routerUrl: this.config.getPrevUrl(`openstack/zones`),
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
    return this.config.getPanelUrl(`openstack/zones/${this.object.id}`);
  }

  getCardFields(): IDataField[] {
    const fields = [
      {
        name: 'Created at',
        value: this.datePipe.transform(this.object.created_at),
      },
      {
        name: 'Email',
        value: this.object.email,
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
            component: ZoneDetailsOverviewComponent,
          },
        ];
      case 'create':
        return [
          {
            tabName: 'Create',
            component: ZoneEditFormComponent,
          },
        ];
      case 'edit':
        return [
          {
            tabName: 'Edit zone',
            component: ZoneEditFormComponent,
          },
        ];
    }
  }

  getCardTags(): string[] {
    return [];
  }
}
