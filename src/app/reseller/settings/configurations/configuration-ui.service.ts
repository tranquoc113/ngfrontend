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
import { IConfigurationModel } from '@fleio-api/configurations/model/configuration.model';
import { ConfigurationsApiService } from '@fleio-api/configurations/configurations-api.service';
import {
  ConfigurationDetailsBillingFormComponent
} from '@shared/common-tabs/settings/configurations/configuration-details-billing-form/configuration-details-billing-form.component';
import {
  ConfigurationEditFormComponent
} from '@shared/common-tabs/settings/configurations/configuration-edit-form/configuration-edit-form.component';

export class ConfigurationUiService extends ObjectUIServiceBase<IConfigurationModel> {
  private readonly router: Router;
  private readonly config: ConfigService;
  private readonly configurationsApiService: ConfigurationsApiService;
  private readonly datePipe: DatePipe;


  constructor(
    configuration: IConfigurationModel, permissions: IPermissionsModel, state: string,
    router: Router, config: ConfigService, configurationsApiService: ConfigurationsApiService
  ) {
    super(configuration, permissions, state);
    this.router = router;
    this.config = config;
    this.configurationsApiService = configurationsApiService;
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
          text: `Configuration ${this.object.name}`,
          subText: `${this.object.client_count} clients on this configuration`,
        };

      case 'edit':
        return {
          text: `Edit ${this.object.name}`,
        };

      case 'create':
        return {
          text: `Create new configuration`,
        };

      default:
        return {
          text: `${this.object.name}`,
          subText: `${this.object.client_count} clients on this configuration`,
        };
    }
  }

  getActions(): IAction[] {
    const actions: IAction[] = [];

    actions.push(new RouterLinkAction({
        icon: {name: 'edit', class: 'fl-icons'},
        name: 'Edit',
        tooltip: 'Edit configuration',
        routerUrl: this.config.getPanelUrl(`settings/configurations/${this.object.id}/edit`),
        router: this.router,
      }
    ));

    const deleteAction = new ApiCallAction(
      {
        object: this.object,
        icon: {name: 'delete'},
        tooltip: 'Delete configuration',
        name: 'Delete',
        confirmOptions: {
          confirm: true,
          title: 'Delete configuration',
          message: `Are you sure you want to delete configuration ${this.object.name}`,
        },
        successMessage: 'Configuration deleted',
        errorMessage: 'Failed to delete configuration',
        apiService: this.configurationsApiService,
        callType: CallType.Delete,
        refreshAfterExecute: false,
        redirectAfterExecute: true,
        redirectUrl: this.config.getPanelUrl('settings/configurations'),
      }
    );

    if (this.object.is_default) {
      deleteAction.disabled = true;
      deleteAction.tooltip = 'Default configuration cannot be deleted';
    }

    actions.push(deleteAction);

    return actions;
  }

  getDetailsActions(): IAction[] {
    const actions = [];

    switch (this.state) {
      case 'create':
        actions.push(new RouterLinkAction({
            name: 'Cancel',
            routerUrl: this.config.getPrevUrl(`settings/configurations`),
            router: this.router,
          }
        ));
        actions.push(new CallbackAction({name: 'Create'}));
        break;
      case 'edit':
        actions.push(new RouterLinkAction({
            name: 'Cancel',
            routerUrl: this.config.getPrevUrl(`settings/configurations`),
            router: this.router,
          }
        ));
        actions.push(new CallbackAction({name: 'Save'}));
        break;
      case 'details':
        actions.push(new RouterLinkAction({
            name: 'Back',
            routerUrl: this.config.getPrevUrl(`settings/configurations`),
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
    return this.config.getPanelUrl(`settings/configurations/${this.object.id}`);
  }

  getCardFields(): IDataField[] {
    const fields = [
      {
        value: this.object.description ? this.object.description : 'No description',
      },
    ];

    return fields;
  }

  getTabs(): IDetailsTab[] {
    switch (this.state) {
      case 'details':
        return [
          {
            tabName: 'Billing',
            component: ConfigurationDetailsBillingFormComponent,
          },
        ];
      case 'create':
        return [
          {
            tabName: 'Create',
            component: ConfigurationEditFormComponent,
          },
        ];
      case 'edit':
        return [
          {
            tabName: 'Create',
            component: ConfigurationEditFormComponent,
          },
        ];
    }
  }

  getCardTags(): string[] {
    const tags = [];
    if (this.object.is_default) {
      tags.push('default');
    }

    return tags;
  }
}
