import { ObjectUIServiceBase } from '@objects-view/object-ui-service-base';
import { IServerModel } from '@fleio-api/servers/model/server.model';
import { Router } from '@angular/router';
import { ConfigService } from '@shared/config/config.service';
import { ServersApiService } from '@fleio-api/servers/servers-api.service';
import { DatePipe } from '@angular/common';
import { IPermissionsModel } from '@fleio-api/base-model/IPermissionsModel';
import { IIcon } from '@shared/ui/common/interfaces/icon';
import { IObjectStatus, StatusType, StatusValue } from '@objects-view/interfaces/object-status';
import { ITitle } from '@objects-view/interfaces/card-data/card-title';
import { IAction } from '@objects-view/interfaces/actions/action';
import { RouterLinkAction } from '@objects-view/actions/router-link-action';
import { ApiCallAction, CallType } from '@objects-view/actions/api-call-action';
import { CallbackAction } from '@objects-view/actions/callback-action';
import { IDataField } from '@objects-view/interfaces/card-data/data-field';
import { IServerGroupModel } from '@fleio-api/servers/model/server-group.model';
import { IDetailsTab } from '@objects-view/interfaces/details/details-tab';
import { ServerEditFormComponent } from './tabs/server-edit-form/server-edit-form.component';

export class ServerUiService extends ObjectUIServiceBase<IServerModel> {
  private readonly router: Router;
  private readonly config: ConfigService;
  private readonly serversApiService: ServersApiService;
  private readonly datePipe: DatePipe;

  static getPlacementDisplay(group: IServerGroupModel): string {
    if (group.placement === 1) {
      return 'In order';
    }
    if (group.placement === 2) {
      return 'Least full';
    }

    return 'n/a'
  }

  constructor(
    server: IServerModel, permissions: IPermissionsModel, state: string,
    router: Router, config: ConfigService, serversApiService: ServersApiService
  ) {
    super(server, permissions, state);
    this.router = router;
    this.config = config;
    this.serversApiService = serversApiService;
    this.datePipe = new DatePipe(this.config.locale);
  }

  getIcon(): IIcon {
    return null;
  }

  getStatus(): IObjectStatus {
    if (this.object.status) {
      switch (this.object.status) {
        case 'enabled':
          return {type: StatusType.Defined, value: StatusValue.Enabled};
        case 'disabled':
          return {type: StatusType.Defined, value: StatusValue.Disabled};
        default:
          return null;
      }
    }

    return null;
  }

  getTitle(): ITitle {
    switch (this.state) {
      case 'edit':
        return {
          text: `Edit server ${this.object.name}`,
        };

      case 'create':
        return {
          text: `Create new server`,
        };

      default:
        return {
          text: `${this.object.name}`,
        };
    }
  }

  getActions(): IAction[] {
    const actions: IAction[] = [];

    actions.push(new RouterLinkAction({
        icon: {name: 'edit', class: 'fl-icons'},
        name: 'Edit',
        tooltip: 'Edit server',
        routerUrl: this.config.getPanelUrl(`servers/servers/${this.object.id}/edit`),
        router: this.router,
      }
    ));

    const deleteAction = new ApiCallAction(
      {
        object: this.object,
        icon: {name: 'delete'},
        tooltip: 'Delete server',
        name: 'Delete',
        confirmOptions: {
          confirm: true,
          title: 'Delete server',
          message: `Are you sure you want to delete server ${this.object.name}`,
        },
        successMessage: 'Server deleted',
        errorMessage: 'Failed to delete server, check logs for details',
        apiService: this.serversApiService,
        callType: CallType.Delete,
        refreshAfterExecute: false,
        redirectAfterExecute: true,
        redirectUrl: '/servers/servers',
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
            routerUrl: this.config.getPrevUrl(`servers/servers`),
            router: this.router,
          }
        ));
        actions.push(new CallbackAction({name: 'Create'}));
        break;
      case 'edit':
        actions.push(new RouterLinkAction({
            name: 'Cancel',
            routerUrl: this.config.getPrevUrl(`servers/servers`),
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
    return this.config.getPanelUrl(`servers/servers/${this.object.id}/edit`);
  }

  getCardFields(): IDataField[] {
    const fields = [
      {name: 'Placement', value: ServerUiService.getPlacementDisplay(this.object.group as IServerGroupModel)},
    ];

    return fields;
  }

  getTabs(): IDetailsTab[] {
    switch (this.state) {
      case 'create':
        return [
          {
            tabName: 'Create',
            component: ServerEditFormComponent,
          },
        ];
      case 'edit':
        return [
          {
            tabName: 'Edit',
            component: ServerEditFormComponent,
          },
        ];
    }
  }

  getCardTags(): string[] {
    const tags = [];
    return tags;
  }
}
