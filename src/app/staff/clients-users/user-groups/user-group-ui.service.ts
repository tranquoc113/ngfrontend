import { ObjectUIServiceBase } from '@objects-view/object-ui-service-base';
import { IUserGroupModel } from '@fleio-api/client-user/model/user-group.model';
import { Router } from '@angular/router';
import { ConfigService } from '@shared/config/config.service';
import { UserGroupsApiService } from '@fleio-api/client-user/user-group/user-groups-api.service';
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
import { UserGroupEditFormComponent } from './tabs/user-group-edit-form/user-group-edit-form.component';
import { UserGroupDetailsOverviewComponent } from './tabs/user-group-details-overview/user-group-details-overview.component';

export class UserGroupUiService extends ObjectUIServiceBase<IUserGroupModel> {
  private readonly router: Router;
  private readonly config: ConfigService;
  private readonly userGroupsApiService: UserGroupsApiService;
  private readonly datePipe: DatePipe;

  constructor(
    userGroup: IUserGroupModel, permissions: IPermissionsModel, state: string,
    router: Router, config: ConfigService, userGroupsApiService: UserGroupsApiService
  ) {
    super(userGroup, permissions, state);
    this.router = router;
    this.config = config;
    this.userGroupsApiService = userGroupsApiService;
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
          text: `Edit user group ${this.object.name}`,
        };

      case 'create':
        return {
          text: `Create new user group`,
        };

      case 'details':
        return {
          text: `${this.object.name}`,
          subText: `Created at: ${this.datePipe.transform(this.object.created_at)}`,
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
        tooltip: 'Edit user group',
        routerUrl: this.config.getPanelUrl(`clients-users/user-groups/${this.object.id}/edit`),
        router: this.router,
      }
    ));

    const deleteAction = new ApiCallAction(
      {
        object: this.object,
        icon: {name: 'delete'},
        tooltip: 'Delete user group',
        name: 'Delete',
        confirmOptions: {
          confirm: true,
          title: 'Delete user group',
          message: `Are you sure you want to delete user group ${this.object.name}`,
        },
        successMessage: 'User group deleted',
        errorMessage: 'Failed to delete user group, check logs for details',
        apiService: this.userGroupsApiService,
        callType: CallType.Delete,
        refreshAfterExecute: false,
        redirectAfterExecute: true,
        redirectUrl: 'clients-users/user-groups',
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
            routerUrl: this.config.getPrevUrl(`clients-users/user-groups`),
            router: this.router,
          }
        ));
        actions.push(new CallbackAction({name: 'Create'}));
        break;
      case 'edit':
        actions.push(new RouterLinkAction({
            name: 'Cancel',
            routerUrl: this.config.getPrevUrl(`clients-users/user-groups`),
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
    return this.config.getPanelUrl(`clients-users/user-groups/${this.object.id}`);
  }

  getCardFields(): IDataField[] {
    const fields = [
      {value: `${this.object.users_count} users in this group`},
      {name: 'Permissions', value: this.object.permissions ? 'custom' : 'default'},
      {name: 'Created at', value: this.datePipe.transform(this.object.created_at)},
    ];

    return fields;
  }

  getTabs(): IDetailsTab[] {
    switch (this.state) {
      case 'create':
        return [
          {
            tabName: 'Create',
            component: UserGroupEditFormComponent,
          },
        ];
      case 'edit':
        return [
          {
            tabName: 'Edit',
            component: UserGroupEditFormComponent,
          },
        ];
      case 'details':
        return [
          {
            tabName: 'Overview',
            component: UserGroupDetailsOverviewComponent,
          },
        ];
    }
  }

  getCardTags(): string[] {
    const tags = [];
    return tags;
  }
}
