import { IPermissionsModel } from '@fleio-api/base-model/IPermissionsModel';
import { IIcon } from '@shared/ui/common/interfaces/icon';
import { ITitle } from '@objects-view/interfaces/card-data/card-title';
import { IObjectStatus, StatusType, StatusValue } from '@objects-view/interfaces/object-status';
import { ObjectUIServiceBase } from '@objects-view/object-ui-service-base';
import { IAction } from '@objects-view/interfaces/actions/action';
import { Router } from '@angular/router';
import { ConfigService } from '@shared/config/config.service';
import { IDataField } from '@objects-view/interfaces/card-data/data-field';
import { IDetailsTab } from '@objects-view/interfaces/details/details-tab';
import { MatDialog } from '@angular/material/dialog';
import { NotificationService } from '@shared/ui-api/notification.service';
import { ITaxRuleModel } from '@fleio-api/billing/model/tax-rule.model';
import { TaxRulesApiService } from '@fleio-api/billing/tax-rules/tax-rules-api.service';
import { TaxRuleEditFormComponent } from './tabs/tax-rule-edit-form/tax-rule-edit-form.component';
import { RouterLinkAction } from '@objects-view/actions/router-link-action';
import { CallbackAction } from '@objects-view/actions/callback-action';
import { ApiCallAction, CallType } from '@objects-view/actions/api-call-action';

export class TaxRuleUIService extends ObjectUIServiceBase<ITaxRuleModel> {
  private readonly router: Router;
  private readonly config: ConfigService;
  private readonly taxRulesApiService: TaxRulesApiService;
  private readonly matDialog: MatDialog;
  private readonly notificationService: NotificationService;

  constructor(
    object: ITaxRuleModel, permissions: IPermissionsModel, state: string,
    router: Router, config: ConfigService, taxRulesApiService: TaxRulesApiService, matDialog: MatDialog,
    notificationService: NotificationService
  ) {
    super(object, permissions, state);
    this.matDialog = matDialog;
    this.router = router;
    this.config = config;
    this.taxRulesApiService = taxRulesApiService;
    this.notificationService = notificationService;
  }

  getIcon(): IIcon {
    return null;
  }

  getStatus(): IObjectStatus {
    return {type: StatusType.None, value: StatusValue.None};
  }

  getTitle(): ITitle {
    switch (this.state) {
      case 'edit':
        return {
          text: `Edit ${this.object.name}`
        }
      case 'create':
        return {
          text: 'Create tax rule'
        }
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
      routerUrl: this.config.getPanelUrl(`billing/tax-rules/${this.object.id}/edit`),
      router: this.router,
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
          title: 'Delete tax rule',
          message: `Are you sure you want to delete tax rule ${this.object.name}`,
        },
        successMessage: 'Tax rule deleted',
        errorMessage: 'Failed to delete tax rule, check logs for details',
        apiService: this.taxRulesApiService,
        callType: CallType.Delete,
        refreshAfterExecute: true,
        redirectAfterExecute: false,
        redirectUrl: this.config.getPanelUrl('billing/tax-rules'),
      }
    ));
    return actions;
  }

  getDetailsLink(): string {
    return null;
  }

  getCardFields(): IDataField[] {
    return [];
  }

  getTabs(): IDetailsTab[] {
    switch (this.state) {
      case 'create':
        return [
          {
            tabName: 'Create',
            component: TaxRuleEditFormComponent
          }
        ]
      case 'edit':
        return [
          {
            tabName: 'Edit',
            component: TaxRuleEditFormComponent
          }
        ]
      default:
        return [];
    }
  }

  getCardTags(): string[] {
    return [];
  }

  getDetailsActions(): IAction[] {
    const actions: IAction[] = [];
    switch (this.state) {
      case 'create':
        actions.push(new RouterLinkAction({
            name: 'Cancel',
            routerUrl: this.config.getPrevUrl(`billing/tax-rules`),
            router: this.router,
          }
        ));
        actions.push(new CallbackAction({name: 'Create tax rule'}));
        break;
      case 'edit':
        actions.push(new RouterLinkAction({
            name: 'Cancel',
            routerUrl: this.config.getPrevUrl(`billing/tax-rules`),
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
