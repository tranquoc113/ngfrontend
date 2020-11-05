import { ObjectUIServiceBase } from '../../../../shared/ui/objects-view/object-ui-service-base';
import { Router } from '@angular/router';
import { ConfigService } from '../../../../shared/config/config.service';
import { IPermissionsModel } from '../../../../shared/fleio-api/base-model/IPermissionsModel';
import { IIcon } from '../../../../shared/ui/common/interfaces/icon';
import { IObjectStatus } from '../../../../shared/ui/objects-view/interfaces/object-status';
import { ITitle } from '../../../../shared/ui/objects-view/interfaces/card-data/card-title';
import { IAction } from '../../../../shared/ui/objects-view/interfaces/actions/action';
import { RouterLinkAction } from '../../../../shared/ui/objects-view/actions/router-link-action';
import { IDataField } from '../../../../shared/ui/objects-view/interfaces/card-data/data-field';
import { IDetailsTab } from '../../../../shared/ui/objects-view/interfaces/details/details-tab';
import { CallbackAction } from '../../../../shared/ui/objects-view/actions/callback-action';
import { MatDialog } from '@angular/material/dialog';
import { PricingRuleEditFormComponent } from '../../../../shared/common-tabs/settings/openstack/pricing-rules/pricing-rule-edit-form/pricing-rule-edit-form.component';
import { IPricingRuleModel } from '../../../../shared/fleio-api/openstack/model/pricing-rule.model';
import { PricingRulesApiService } from '../../../../shared/fleio-api/openstack/pricing-rule/pricing-rules-api.service';

export class PricingRuleUIService extends ObjectUIServiceBase<IPricingRuleModel> {
  private readonly router: Router;
  private readonly config: ConfigService;
  private readonly matDialog: MatDialog;


  constructor(
    pricingRule: IPricingRuleModel, permissions: IPermissionsModel, state: string,
    router: Router, config: ConfigService, pricingRulesApiService: PricingRulesApiService, matDialog: MatDialog,
  ) {
    super(pricingRule, permissions, state);
    this.matDialog = matDialog;
    this.router = router;
    this.config = config;
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
          text: `Pricing rule ${this.object.display_name}`,
        };

      case 'edit':
        return {
          text: `Edit ${this.object.display_name}`,
        };

      case 'create':
        return {
          text: 'Create pricing rule',
        };

      default:
        return {
          text: `${this.object.display_name}`,
        };
    }
  }

  getActions(): IAction[] {
    const actions: IAction[] = [];

    actions.push(new RouterLinkAction({
        icon: {name: 'edit', class: 'fl-icons'},
        name: 'Edit',
        routerUrl: this.config.getPanelUrl(`settings/pricing-rules/${this.object.id}/edit`),
        router: this.router,
      }
    ));

    return actions;
  }

  getDetailsLink(): string {
    return this.config.getPanelUrl(`settings/openstack-plans/${this.object.id}`);
  }

  getCardFields(): IDataField[] {
    const fields = [
      {
        name: 'Name',
        value: `${this.object.display_name}`
      },
    ];

    return fields;
  }

  getCardTags(): string[] {
    return [];
  }

  getTabs(): IDetailsTab[] {
    switch (this.state) {
      case 'details':
      case 'edit':
      case 'create':
        return [
          {
            tabName: 'Edit',
            component: PricingRuleEditFormComponent,
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
            routerUrl: this.config.getPrevUrl(`settings/openstack-plans`),
            router: this.router,
          }
        ));
        actions.push(new CallbackAction({ name: 'Create' }));
        break;
      case 'edit':
        actions.push(new RouterLinkAction({
            name: 'Cancel',
            routerUrl: this.config.getPrevUrl(`settings/openstack-plans`),
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
}
