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
import { ClientGroupsApiService } from '@fleio-api/client-user/client-group/client-groups-api.service';
import { IClientGroupModel } from '@fleio-api/client-user/model/client-group.model';
import { ClientGroupDetailsOverviewComponent } from './tabs/client-group-details-overview/client-group-details-overview.component';
import { CallbackAction } from '@objects-view/actions/callback-action';
import { ClientGroupEditFormComponent } from './tabs/client-group-edit-form/client-group-edit-form.component';

export class ClientGroupUIService extends ObjectUIServiceBase<IClientGroupModel> {
  private readonly router: Router;
  private readonly config: ConfigService;
  private readonly clientGroupsApi: ClientGroupsApiService;
  private readonly datePipe: DatePipe;


  constructor(
    clientGroup: IClientGroupModel, permissions: IPermissionsModel, state: string,
    router: Router, config: ConfigService, clientGroupsApi: ClientGroupsApiService
  ) {
    super(clientGroup, permissions, state);
    this.router = router;
    this.config = config;
    this.clientGroupsApi = clientGroupsApi;
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
      case 'details':
        return {
          text: `Group ${this.object.name}`,
          subText: `Created at: ${this.datePipe.transform(this.object.created_at)}`,
        };

      case 'edit':
        return {
          text: `Edit ${this.object.name}`,
        };

      case 'create':
        return {
          text: `Create new group`,
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
        routerUrl: this.config.getPanelUrl(`clients-users/client-groups/${this.object.id}/edit`),
        router: this.router,
      }
    ));

    actions.push(new ApiCallAction(
      {
        object: this.object,
        icon: {name: 'delete'},
        name: 'Delete',
        confirmOptions: {
          confirm: true,
          title: 'Delete client group',
          message: `Are you sure you want to delete client group ${this.object.name}?`,
        },
        successMessage: 'Client group deleted',
        errorMessage: 'Failed to delete client group',
        apiService: this.clientGroupsApi,
        callType: CallType.Delete,
        refreshAfterExecute: false,
        redirectAfterExecute: true,
        redirectUrl: this.config.getPanelUrl('clients-users/client-groups'),
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
            routerUrl: this.config.getPrevUrl(`clients-users/client-groups`),
            router: this.router,
          }
        ));
        actions.push(new CallbackAction({ name: 'Create' }));
        break;
      case 'edit':
        actions.push(new RouterLinkAction({
            name: 'Cancel',
            routerUrl: this.config.getPrevUrl(`clients-users/client-groups`),
            router: this.router,
          }
        ));
        actions.push(new CallbackAction({ name: 'Save' }));
        break;
      default:
        break;
    }

    return actions;
  }

  getDetailsLink(): string {
    return this.config.getPanelUrl(`clients-users/client-groups/${this.object.id}`);
  }

  getCardFields(): IDataField[] {
    const fields = [
      {
        name: 'Created at',
        value: `${this.datePipe.transform(this.object.created_at)}`
      },
      {
        name: 'Clients count',
        value: `${this.datePipe.transform(this.object.client_count)}`
      },
      {
        name: 'Description',
        value: this.object.description
      }
    ];

    return fields;
  }

  getTabs(): IDetailsTab[] {
    switch (this.state) {
      case 'details':
        return [
          {
            tabName: 'Overview',
            component: ClientGroupDetailsOverviewComponent,
          },
        ];
      case 'create':
        return [
          {
            tabName: 'Create',
            component: ClientGroupEditFormComponent,
          },
        ];
      case 'edit':
        return [
          {
            tabName: 'Create',
            component: ClientGroupEditFormComponent,
          },
        ];
    }
  }
}
