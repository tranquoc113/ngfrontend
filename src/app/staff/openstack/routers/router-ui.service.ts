import { ObjectUIServiceBase } from '@objects-view/object-ui-service-base';
import { IRouterModel } from '@fleio-api/openstack/model/router.model';
import { Router } from '@angular/router';
import { ConfigService } from '@shared/config/config.service';
import { RoutersApiService } from '@fleio-api/openstack/routers/routers-api.service';
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
import { RouterEditFormComponent } from './tabs/router-edit-form/router-edit-form.component';
import { RouterDetailsOverviewComponent } from './tabs/router-details-overview/router-details-overview.component';
import { RouterAddInterfaceFormComponent } from './tabs/router-add-interface-form/router-add-interface-form.component';

export class RouterUiService extends ObjectUIServiceBase<IRouterModel> {
  private readonly router: Router;
  private readonly config: ConfigService;
  private readonly routersApiService: RoutersApiService;
  private readonly datePipe: DatePipe;

  constructor(
    routerModel: IRouterModel, permissions: IPermissionsModel, state: string,
    router: Router, config: ConfigService, routersApiService: RoutersApiService
  ) {
    super(routerModel, permissions, state);
    this.router = router;
    this.config = config;
    this.routersApiService = routersApiService;
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
          text: `Edit router ${this.object.name}`,
          subText: this.object.status,
        };

      case 'create':
        return {
          text: `Create new router`,
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
        tooltip: 'Edit router',
        routerUrl: this.config.getPanelUrl(`openstack/routers/${this.object.id}/edit`),
        router: this.router,
      }
    ));

    actions.push(new RouterLinkAction({
        icon: {name: 'playlist_add'},
        name: 'Add interface',
        tooltip: 'Add interface',
        routerUrl: this.config.getPanelUrl(`openstack/routers/${this.object.id}/add-interface`),
        router: this.router,
      }
    ));

    const deleteAction = new ApiCallAction(
      {
        object: this.object,
        icon: {name: 'delete'},
        tooltip: 'Delete router',
        name: 'Delete',
        confirmOptions: {
          confirm: true,
          title: 'Delete router',
          message: `Are you sure you want to delete router ${this.object.name}`,
        },
        successMessage: 'Router delete queued',
        errorMessage: 'Failed to delete router, check logs for details',
        apiService: this.routersApiService,
        callType: CallType.Delete,
        refreshAfterExecute: false,
        redirectAfterExecute: true,
        redirectUrl: 'openstack/routers',
      }
    );

    actions.push(deleteAction);

    return actions;
  }

  getDetailsActions(): IAction[] {
    const actions = [];

    switch (this.state) {
      case 'create':
        actions.push(new RouterLinkAction({
            name: 'Cancel',
            routerUrl: this.config.getPrevUrl(`openstack/routers`),
            router: this.router,
          }
        ));
        actions.push(new CallbackAction({name: 'Create'}));
        break;
      case 'add-interface':
        actions.push(new RouterLinkAction({
            name: 'Cancel',
            routerUrl: this.config.getPrevUrl(`openstack/routers`),
            router: this.router,
          }
        ));
        actions.push(new CallbackAction({name: 'Add interface'}));
        break;
      case 'edit':
        actions.push(new RouterLinkAction({
            name: 'Cancel',
            routerUrl: this.config.getPrevUrl(`openstack/routers`),
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
    return this.config.getPanelUrl(`openstack/routers/${this.object.id}`);
  }

  getCardFields(): IDataField[] {
    let externalIps = '';
    for (const externalIp of this.object.external_fixed_ips) {
      if (externalIps.length > 0) {
        externalIps += ', ';
      }
      externalIps += externalIp.ip_address;
    }

    const fields = [
      {name: 'Gateway', value: `${this.object.network_name}(${externalIps})`},
      {name: 'Region', value: this.object.region},
      {name: 'Description', value: this.object.description || 'n/a'},
    ];

    return fields;
  }

  getTabs(): IDetailsTab[] {
    switch (this.state) {
      case 'create':
        return [
          {
            tabName: 'Create',
            component: RouterEditFormComponent,
          },
        ];
      case 'details':
        return [
          {
            tabName: 'Create',
            component: RouterDetailsOverviewComponent,
          },
        ];
      case 'add-interface':
        return [
          {
            tabName: 'Add interface',
            component: RouterAddInterfaceFormComponent,
          },
        ];
      case 'edit':
        return [
          {
            tabName: 'Edit',
            component: RouterEditFormComponent,
          },
        ];
    }
  }

  getCardTags(): string[] {
    const tags = [];
    return tags;
  }
}
