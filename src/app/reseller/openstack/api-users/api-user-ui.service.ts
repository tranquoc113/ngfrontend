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
import { CallbackAction } from '@objects-view/actions/callback-action';
import { ApiUsersApiService } from '@fleio-api/openstack/api-user/api-users-api.service';
import { IApiUserModel } from '@fleio-api/openstack/model/api-user.model';
import { map } from 'rxjs/operators';
import { IActionResult } from '@objects-view/interfaces/actions/action-result';
import { MatDialog } from '@angular/material/dialog';
import { ApiUserCreateFormComponent } from '@openstack-api-users-tabs/api-user-create-form/api-user-edit-form.component';
import { ApiUserEditFormComponent } from '@openstack-api-users-tabs/api-user-edit-form/api-user-edit-form.component';
import { ApiUserDetailsOverviewComponent } from '@openstack-api-users-tabs/api-user-details-overview/api-user-details-overview.component';
import { ApiUserDownloadOpenrcComponent } from '@shared/common-dialogs/openstack/api-users/api-user-download-openrc/api-user-download-openrc.component';

export class ApiUserUiService extends ObjectUIServiceBase<IApiUserModel> {
  private readonly router: Router;
  private readonly config: ConfigService;
  private readonly apiUsersApi: ApiUsersApiService;
  private readonly matDialog: MatDialog;

  constructor(
    user: IApiUserModel, permissions: IPermissionsModel, state: string,
    router: Router, config: ConfigService, apiUsersApi: ApiUsersApiService, matDialog: MatDialog,
  ) {
    super(user, permissions, state);
    this.matDialog = matDialog;
    this.router = router;
    this.config = config;
    this.apiUsersApi = apiUsersApi;
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
          text: `User ${this.object.name}`,
        };

      case 'edit':
        return {
          text: `Edit ${this.object.name}`,
        };

      case 'create':
        return {
          text: 'Create api user',
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
        tooltip: 'Edit',
        routerUrl: this.config.getPanelUrl(`openstack/api-users/${this.object.id}/edit`),
        router: this.router,
      }
    ));

    actions.push(new CallbackAction(
      {
        object: this.object,
        icon: {name: 'arrow_downward'},
        tooltip: 'Get OpenRC file',
        name: 'Get OpenRC file',
        callback: () => {
          return this.matDialog.open(
            ApiUserDownloadOpenrcComponent, {
              data: {apiUser: this.object}
            }).afterClosed().pipe(map(result => {
            if (result === false) {
              return;
            }
            return {message: result} as IActionResult;
          }));
        }
      }
    ));

    actions.push(new ApiCallAction(
      {
        object: this.object,
        icon: {name: 'delete'},
        tooltip: 'Delete',
        name: 'Delete',
        confirmOptions: {
          confirm: true,
          title: 'Delete API user',
          message: `Are you sure you want to delete API user ${this.object.name}?`
        },
        successMessage: 'API user deleted',
        errorMessage: 'Failed to delete API user',
        apiService: this.apiUsersApi,
        callType: CallType.Delete,
        refreshAfterExecute: false,
        redirectAfterExecute: true,
        redirectUrl: this.config.getPanelUrl('openstack/api-users'),
      }
    ));

    return actions;
  }

  getCardTags(): string[] {
    return [];
  }

  getDetailsLink(): string {
    return this.config.getPanelUrl(`openstack/api-users/${this.object.id}`);
  }

  getCardFields(): IDataField[] {
    return [
      {
        name: 'Id',
        value: this.object.id as string
      },
      {
        name: 'Project',
        value: this.object.project_name || this.object.default_project_id
      }
    ];
  }

  getTabs(): IDetailsTab[] {
    switch (this.state) {
      case 'details':
        return [
          {
            tabName: 'Overview',
            component: ApiUserDetailsOverviewComponent,
          },
        ];
      case 'edit':
        return [
          {
            tabName: 'Edit',
            component: ApiUserEditFormComponent,
          },
        ];
      case 'create':
        return [
          {
            tabName: 'Create',
            component: ApiUserCreateFormComponent,
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
            routerUrl: this.config.getPrevUrl(`openstack/api-users`),
            router: this.router,
          }
        ));
        actions.push(new CallbackAction({name: 'Create'}));
        break;
      case 'edit':
        actions.push(new RouterLinkAction({
            name: 'Cancel',
            routerUrl: this.config.getPrevUrl(`openstack/api-users`),
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
}
