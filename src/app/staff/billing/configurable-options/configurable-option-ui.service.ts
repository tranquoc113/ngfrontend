import { ObjectUIServiceBase } from '@objects-view/object-ui-service-base';
import { IConfigOptionModel } from '@fleio-api/billing/model/config-option.model';
import { Router } from '@angular/router';
import { ConfigService } from '@shared/config/config.service';
import { ConfigurableOptionsApiService } from '@fleio-api/billing/configurable-options/configurable-option-api.service';
import { DatePipe } from '@angular/common';
import { IPermissionsModel } from '@fleio-api/base-model/IPermissionsModel';
import { ITitle } from '@objects-view/interfaces/card-data/card-title';
import { IAction } from '@objects-view/interfaces/actions/action';
import { RouterLinkAction } from '@objects-view/actions/router-link-action';
import { ApiCallAction, CallType } from '@objects-view/actions/api-call-action';
import { CallbackAction } from '@objects-view/actions/callback-action';
import { IDataField } from '@objects-view/interfaces/card-data/data-field';
import { IDetailsTab } from '@objects-view/interfaces/details/details-tab';
import { ConfigurableOptionEditFormComponent } from './tabs/configurable-option-edit-form/configurable-option-edit-form.component';
import { IIcon } from '@shared/ui/common/interfaces/icon';
import { IObjectStatus } from '@objects-view/interfaces/object-status';

export class ConfigurableOptionUiService extends ObjectUIServiceBase<IConfigOptionModel> {
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
      case 'edit':
        return {
          text: `Edit configurable option ${this.object.name}`,
          subText: this.object.description,
        };

      case 'create':
        return {
          text: `Create new configurable option`,
        };

      default:
        return {
          text: `${this.object.name}`,
          subText: this.object.description,
        };
    }
  }

  getActions(): IAction[] {
    const actions: IAction[] = [];

    const deleteAction = new ApiCallAction(
      {
        object: this.object,
        icon: {name: 'delete'},
        tooltip: 'Delete configurable option',
        name: 'Delete',
        confirmOptions: {
          confirm: true,
          title: 'Delete configurable option',
          message: `Are you sure you want to delete configurable option ${this.object.name}`,
        },
        successMessage: 'Configurable option deleted',
        errorMessage: 'Failed to delete configurable option, please check logs for details',
        apiService: this.configurableOptionsApiService,
        callType: CallType.Delete,
        refreshAfterExecute: false,
        redirectAfterExecute: true,
        redirectUrl: '/billing/configurable-options',
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
            routerUrl: this.config.getPrevUrl(`billing/configurable-options`),
            router: this.router,
          }
        ));
        actions.push(new CallbackAction({name: 'Create and continue'}));
        break;
      case 'edit':
        actions.push(new RouterLinkAction({
            name: 'Back',
            routerUrl: this.config.getPrevUrl(`billing/configurable-options`),
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
    return this.config.getPanelUrl(`billing/configurable-options/${this.object.id}`);
  }

  getCardFields(): IDataField[] {
    const fields = [
      {name: 'Created at', value: this.datePipe.transform(this.object.created_at, 'medium')},
    ];

    return fields;
  }

  getTabs(): IDetailsTab[] {
    switch (this.state) {
      case 'create':
        return [
          {
            tabName: 'Create',
            component: ConfigurableOptionEditFormComponent,
          },
        ];
      case 'edit':
        return [
          {
            tabName: 'Edit',
            component: ConfigurableOptionEditFormComponent,
          },
        ];
    }
  }

  getCardTags(): string[] {
    const tags = [];
    return tags;
  }
}
