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
import { IConfigOptionModel } from '@fleio-api/billing/model/config-option.model';
import { ConfigurableOptionsApiService } from '@fleio-api/billing/configurable-options/configurable-option-api.service';
import { ConfigOptionDetailsOverviewComponent } from './tabs/config-option-details-overview/config-option-details-overview.component';
import { ConfigOptionEditFormComponent } from './tabs/config-option-edit-form/config-option-edit-form.component';

export class ConfigOptionUiService extends ObjectUIServiceBase<IConfigOptionModel> {
  private readonly router: Router;
  private readonly config: ConfigService;
  private readonly configurableOptionsApiService: ConfigurableOptionsApiService;
  private readonly datePipe: DatePipe;


  constructor(
    configOption: IConfigOptionModel, permissions: IPermissionsModel, state: string,
    router: Router, config: ConfigService, configurableOptionsApiService: ConfigurableOptionsApiService
  ) {
    super(configOption, permissions, state);
    this.router = router;
    this.config = config;
    this.configurableOptionsApiService = configurableOptionsApiService;
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
          text: `Configurable option ${this.object.name}`,
          subText: ``,
        };

      case 'edit':
        return {
          text: `Edit ${this.object.name}`,
        };

      case 'create':
        return {
          text: `Create new configurable option`,
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
        routerUrl: this.config.getPanelUrl(`billing/config-options/${this.object.id}/edit`),
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
          title: 'Delete configurable option',
          message: `Are you sure you want to delete configurable option ${this.object.name}`,
        },
        successMessage: 'Configurable option deleted',
        errorMessage: 'Failed to delete configurable option',
        apiService: this.configurableOptionsApiService,
        callType: CallType.Delete,
        refreshAfterExecute: false,
        redirectAfterExecute: true,
        redirectUrl: this.config.getPanelUrl('billing/config-options'),
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
            routerUrl: this.config.getPrevUrl(`billing/config-options`),
            router: this.router,
          }
        ));
        actions.push(new CallbackAction({name: 'Create'}));
        break;
      case 'edit':
        actions.push(new RouterLinkAction({
            name: 'Cancel',
            routerUrl: this.config.getPrevUrl(`billing/config-options`),
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
    return this.config.getPanelUrl(`billing/config-options/${this.object.id}`);
  }

  getCardFields(): IDataField[] {
    const fields = [
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
            component: ConfigOptionDetailsOverviewComponent,
          },
        ];
      case 'create':
        return [
          {
            tabName: 'Create',
            component: ConfigOptionEditFormComponent,
          },
        ];
      case 'edit':
        return [
          {
            tabName: 'Create',
            component: ConfigOptionEditFormComponent,
          },
        ];
    }
  }
}
