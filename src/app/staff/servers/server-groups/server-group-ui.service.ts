import { IServerGroupModel } from '@fleio-api/servers/model/server-group.model';
import { ObjectUIServiceBase } from '@objects-view/object-ui-service-base';
import { Router } from '@angular/router';
import { ConfigService } from '@shared/config/config.service';
import { ServerGroupsApiService } from '@fleio-api/servers/server-groups-api.service';
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
import { ServerUiService } from '../servers/server-ui.service';
import { IDetailsTab } from '@objects-view/interfaces/details/details-tab';
import { ServerGroupEditFormComponent } from './tabs/server-group-edit-form/server-group-edit-form.component';

export class ServerGroupUiService extends ObjectUIServiceBase<IServerGroupModel> {
  private readonly router: Router;
  private readonly config: ConfigService;
  private readonly serverGroupsApiService: ServerGroupsApiService;
  private readonly datePipe: DatePipe;

  constructor(
    serverGroup: IServerGroupModel, permissions: IPermissionsModel, state: string,
    router: Router, config: ConfigService, serverGroupsApiService: ServerGroupsApiService
  ) {
    super(serverGroup, permissions, state);
    this.router = router;
    this.config = config;
    this.serverGroupsApiService = serverGroupsApiService;
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
          text: `Edit server group ${this.object.name}`,
        };

      case 'create':
        return {
          text: `Create new server group`,
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
        tooltip: 'Edit server group',
        routerUrl: this.config.getPanelUrl(`servers/server-groups/${this.object.id}/edit`),
        router: this.router,
      }
    ));

    const deleteAction = new ApiCallAction(
      {
        object: this.object,
        icon: {name: 'delete'},
        tooltip: 'Delete server group',
        name: 'Delete',
        confirmOptions: {
          confirm: true,
          title: 'Delete server group',
          message: `Are you sure you want to delete server group ${this.object.name}`,
        },
        successMessage: 'Server group deleted',
        errorMessage: 'Failed to delete server group, check logs for details',
        apiService: this.serverGroupsApiService,
        callType: CallType.Delete,
        refreshAfterExecute: false,
        redirectAfterExecute: true,
        redirectUrl: '/servers/server-groups',
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
            routerUrl: this.config.getPrevUrl(`servers/server-groups`),
            router: this.router,
          }
        ));
        actions.push(new CallbackAction({name: 'Create'}));
        break;
      case 'edit':
        actions.push(new RouterLinkAction({
            name: 'Cancel',
            routerUrl: this.config.getPrevUrl(`servers/server-groups`),
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
    return this.config.getPanelUrl(`servers/server-groups/${this.object.id}/edit`);
  }

  getCardFields(): IDataField[] {
    const fields = [
      {name: 'Placement', value: ServerUiService.getPlacementDisplay(this.object)},
    ];

    return fields;
  }

  getTabs(): IDetailsTab[] {
    switch (this.state) {
      case 'create':
        return [
          {
            tabName: 'Create',
            component: ServerGroupEditFormComponent,
          },
        ];
      case 'edit':
        return [
          {
            tabName: 'Edit',
            component: ServerGroupEditFormComponent,
          },
        ];
    }
  }

  getCardTags(): string[] {
    const tags = [];
    return tags;
  }
}
