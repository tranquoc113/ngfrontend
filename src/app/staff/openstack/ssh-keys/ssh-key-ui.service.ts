import { ObjectUIServiceBase } from '@objects-view/object-ui-service-base';
import { Router } from '@angular/router';
import { ConfigService } from '@shared/config/config.service';
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
import { SshKeyEditFormComponent } from '@shared/common-tabs/openstack/ssh-keys/ssh-key-edit-form/ssh-key-edit-form.component';
import { IPublicKeyModel } from '@fleio-api/public-key/model/public-key.model';
import { PublicKeysApiService } from '@fleio-api/public-key/public-key-api.service';

export class SshKeyUiService extends ObjectUIServiceBase<IPublicKeyModel> {
  private readonly router: Router;
  private readonly config: ConfigService;
  private readonly publicKeysApiService: PublicKeysApiService;
  private readonly datePipe: DatePipe;

  constructor(
    publicKeyModel: IPublicKeyModel, permissions: IPermissionsModel, state: string,
    router: Router, config: ConfigService, publicKeysApiService: PublicKeysApiService
  ) {
    super(publicKeyModel, permissions, state);
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
          text: `Edit ssh key ${this.object.name}`,
        };

      case 'create':
        return {
          text: `Create new ssh key`,
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
        tooltip: 'Edit ssh key',
        routerUrl: this.config.getPanelUrl(`openstack/ssh-keys/${this.object.id}`),
        router: this.router,
      }
    ));

    const deleteAction = new ApiCallAction(
      {
        object: this.object,
        icon: {name: 'delete'},
        tooltip: 'Delete ssh key',
        name: 'Delete',
        confirmOptions: {
          confirm: true,
          title: 'Delete SSH key',
          message: `Are you sure you want to delete SSH key ${this.object.name}`,
        },
        successMessage: 'SSH key deleted',
        errorMessage: 'Failed to delete SSH key, check logs for details',
        apiService: this.publicKeysApiService,
        callType: CallType.Delete,
        refreshAfterExecute: false,
        redirectAfterExecute: true,
        redirectUrl: '/openstack/ssh-keys',
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
            routerUrl: this.config.getPrevUrl(`openstack/ssh-keys`),
            router: this.router,
          }
        ));
        actions.push(new CallbackAction({name: 'Generate new key'}));
        actions.push(new CallbackAction({name: 'Save key'}));
        break;
      case 'edit':
        actions.push(new RouterLinkAction({
            name: 'Cancel',
            routerUrl: this.config.getPrevUrl(`openstack/ssh_keys`),
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
      {name: 'Created at', value: this.datePipe.transform(this.object.created_at)},
      {name: 'Fingerprint', value: this.object.fingerprint},
      {name: 'Owner', value: this.object.user.username},
    ] as IDataField[];

    return fields;
  }

  getTabs(): IDetailsTab[] {
    switch (this.state) {
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
            tabName: 'Edit',
            component: SshKeyEditFormComponent,
          },
        ];
    }
  }

  getCardTags(): string[] {
    const tags = [];
    return tags;
  }
}
