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
import { CallbackAction } from '@objects-view/actions/callback-action';
import { IPublicKeyModel } from '@fleio-api/public-key/model/public-key.model';
import { PublicKeysApiService } from '@fleio-api/public-key/public-key-api.service';
import { SshKeyDetailsOverviewComponent } from '@shared/common-tabs/openstack/ssh-keys/ssh-key-details-overview/ssh-key-details-overview.component';
import { SshKeyEditFormComponent } from '@shared/common-tabs/openstack/ssh-keys/ssh-key-edit-form/ssh-key-edit-form.component';

export class SshKeyUiService extends ObjectUIServiceBase<IPublicKeyModel> {
  private readonly router: Router;
  private readonly config: ConfigService;
  private readonly publicKeysApiService: PublicKeysApiService;
  private readonly datePipe: DatePipe;


  constructor(
    publicKey: IPublicKeyModel, permissions: IPermissionsModel, state: string,
    router: Router, config: ConfigService, publicKeysApiService: PublicKeysApiService
  ) {
    super(publicKey, permissions, state);
    this.router = router;
    this.config = config;
    this.publicKeysApiService = publicKeysApiService;
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
        };

      case 'create':
        return {
          text: `Create new ssh key`,
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
        tooltip: 'Edit',
        routerUrl: this.config.getPanelUrl(`openstack/ssh-keys/${this.object.id}/edit`),
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
          title: 'Delete ssh key',
          message: `Are you sure you want to delete ssh key ${this.object.name}`,
        },
        successMessage: 'SSH key deleted',
        errorMessage: 'Failed to delete ssh key',
        apiService: this.publicKeysApiService,
        callType: CallType.Delete,
        refreshAfterExecute: false,
        redirectAfterExecute: true,
        redirectUrl: this.config.getPanelUrl('openstack/ssh-keys'),
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
            routerUrl: this.config.getPrevUrl(`openstack/ssh-keys`),
            router: this.router,
          }
        ));
        actions.push(new CallbackAction({name: 'Generate new key'}));
        actions.push(new CallbackAction({name: 'Save'}));
        break;
      case 'edit':
        actions.push(new RouterLinkAction({
            name: 'Cancel',
            routerUrl: this.config.getPrevUrl(`openstack/ssh-keys`),
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
    return this.config.getPanelUrl(`openstack/ssh-keys/${this.object.id}`);
  }

  getCardFields(): IDataField[] {
    const fields = [
      {
        name: 'Created on',
        value: this.datePipe.transform(this.object.created_at)
      },
      {
        name: 'Fingerprint',
        value: this.object.fingerprint
      },
      {
        name: 'Owner',
        value: this.object.user.username,
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
            component: SshKeyDetailsOverviewComponent,
          },
        ];
      case 'create':
        return [
          {
            tabName: 'Create',
            component: SshKeyEditFormComponent,
          },
        ];
      case 'edit':
        return [
          {
            tabName: 'Create',
            component: SshKeyEditFormComponent,
          },
        ];
    }
  }

  getCardTags(): string[] {
    return [];
  }
}
