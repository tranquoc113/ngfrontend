import { IPermissionsModel } from '@fleio-api/base-model/IPermissionsModel';
import { IIcon } from '@shared/ui/common/interfaces/icon';
import { ITitle } from '@objects-view/interfaces/card-data/card-title';
import { IObjectStatus, StatusType, StatusValue } from '@objects-view/interfaces/object-status';
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
import { IUserModel } from '@fleio-api/client-user/model/user.model';
import { UsersApiService } from '@fleio-api/client-user/user/users-api.service';
import { UserDetailsOverviewComponent } from '@shared/common-tabs/clients-users/users/user-details-overview/user-details-overview.component';
import { UserEditFormComponent } from '@shared/common-tabs/clients-users/users/user-edit-form/user-edit-form.component';
import { UserDetailsClientsComponent } from '@shared/common-tabs/clients-users/users/user-details-clients/user-details-clients.component';
import { AuthService } from '@shared/auth/auth.service';

export class UserUIService extends ObjectUIServiceBase<IUserModel> {
  private readonly router: Router;
  private readonly config: ConfigService;
  private readonly usersApi: UsersApiService;
  private readonly auth: AuthService;

  constructor(
    user: IUserModel, permissions: IPermissionsModel, state: string,
    router: Router, config: ConfigService, usersApi: UsersApiService,
    auth: AuthService,
  ) {
    super(user, permissions, state);
    this.auth = auth;
    this.router = router;
    this.config = config;
    this.usersApi = usersApi;
  }

  getIcon(): IIcon {
    if (this.object && this.object.email) {
      return {
        name: '(gravatar)',
        gravatarEmail: this.object.email,
      };
    }
    return null;
  }

  getStatus(): IObjectStatus {
    if (this.state === 'create') {
      return {type:StatusType.None, value: StatusValue.None};
    }
    return {
      type: StatusType.Defined,
      value: this.object.is_active ? StatusValue.Active : StatusValue.Error
    };
  }

  getTitle(): ITitle {
    switch (this.state) {
      case 'details':
        return {
          text: `${this.object.first_name} ${this.object.last_name}`,
          subText: this.object.username,
        };

      case 'edit':
        return {
          text: `${this.object.first_name} ${this.object.last_name}`,
          subText: this.object.username,
        };

      case 'create':
        return {
          text: 'Create user',
        };

      default:
        return {
          text: `${this.object.first_name} ${this.object.last_name}`,
          subText: this.object.username,
        };
    }
  }

  getActions(): IAction[] {
    const actions: IAction[] = [];

    actions.push(new RouterLinkAction({
        icon: {name: 'edit', class: 'fl-icons'},
        name: 'Edit',
        tooltip: 'Edit',
        routerUrl: this.config.getPanelUrl(`clients-users/users/${this.object.id}/edit`),
        router: this.router,
      }
    ));

    actions.push(new RouterLinkAction({
        icon: {name: 'face'},
        name: 'Impersonate user',
        noPermissions: this.auth.isImpersonating(),
        tooltip: this.auth.isImpersonating() ?
          'You cannot impersonate another user while impersonating' : 'Impersonate user',
        routerUrl: this.config.getPanelUrl(`clients-users/users/${this.object.id}/impersonate`),
        router: this.router,
      }
    ));

    actions.push(new ApiCallAction(
      {
        object: this.object,
        icon: {name: 'delete'},
        name: 'Delete',
        tooltip: 'Delete',
        confirmOptions: {
          confirm: true,
          title: 'Delete user',
          message: `Are you sure you want to delete user ${this.object.username}.` +
            'All data will be lost.',
        },
        successMessage: 'User deleted',
        errorMessage: 'Failed to delete user',
        apiService: this.usersApi,
        callType: CallType.Delete,
        refreshAfterExecute: false,
        redirectAfterExecute: true,
        redirectUrl: this.config.getPanelUrl('clients-users/users'),
      }
    ));

    return actions;
  }

  getDetailsLink(): string {
    return this.config.getPanelUrl(`clients-users/users/${this.object.id}`);
  }

  getCardFields(): IDataField[] {
    const datePipe = new DatePipe(this.config.locale);
    const fields = [
      {
        name: 'Last login',
        value: this.object.last_login ? datePipe.transform(this.object.last_login, 'medium') : 'never',
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
            component: UserDetailsOverviewComponent,
          },
          {
            tabName: 'Clients',
            component: UserDetailsClientsComponent,
          },
        ];
      case 'edit':
      case 'create':
        return [
          {
            tabName: 'Edit',
            component: UserEditFormComponent,
          },
        ];
    }
  }

  getDetailsActions(): IAction[] {
    const actions = [];

    switch (this.state) {
      case 'create':
        actions.push(new RouterLinkAction({
            name: 'Cancel',
            routerUrl: this.config.getPrevUrl(`clients-users/users`),
            router: this.router,
          }
        ));
        actions.push(new CallbackAction({name: 'Create'}));
        break;
      case 'edit':
        actions.push(new RouterLinkAction({
            name: 'Cancel',
            routerUrl: this.config.getPrevUrl(`clients-users/users`),
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

  getCardTags(): string[] {
    const tags: string[] = [];
    return tags;
  }
}
