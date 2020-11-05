import { IPricingPlanModel } from '../../../../shared/fleio-api/openstack/model/pricing-plan.model';
import { PricingPlansApiService } from '../../../../shared/fleio-api/openstack/pricing-plan/pricing-plans-api.service';
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
import {
  PricingPlanDetailsOverviewComponent
} from '../../../../shared/common-tabs/settings/openstack/openstack-plans/pricing-plan-details-overview/pricing-plan-details-overview.component';
import {
  PricingPlanEditFormComponent
} from '../../../../shared/common-tabs/settings/openstack/openstack-plans/pricing-plan-edit-form/pricing-plan-edit-form.component';
import { CallbackAction } from '../../../../shared/ui/objects-view/actions/callback-action';
import { map } from 'rxjs/operators';
import { PricingPlanDeleteComponent } from '../../../../shared/common-dialogs/settings/openstack/openstack-plans/pricing-plan-delete/pricing-plan-delete.component';
import { IActionResult } from '../../../../shared/ui/objects-view/interfaces/actions/action-result';
import { MatDialog } from '@angular/material/dialog';

export class PricingPlanUIService extends ObjectUIServiceBase<IPricingPlanModel> {
  private readonly router: Router;
  private readonly config: ConfigService;
  private readonly pricingPlansApiService: PricingPlansApiService;
  private readonly matDialog: MatDialog;


  constructor(
    pricingPlan: IPricingPlanModel, permissions: IPermissionsModel, state: string,
    router: Router, config: ConfigService, pricingPlansApiService: PricingPlansApiService, matDialog: MatDialog,
  ) {
    super(pricingPlan, permissions, state);
    this.matDialog = matDialog;
    this.router = router;
    this.config = config;
    this.pricingPlansApiService = pricingPlansApiService;
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
          text: `Openstack plan ${this.object.name}`,
        };

      case 'edit':
        return {
          text: `Edit ${this.object.name}`,
        };

      case 'create':
        return {
          text: 'Create pricing plan',
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
        routerUrl: this.config.getPanelUrl(`settings/openstack-plans/${this.object.id}/edit`),
        router: this.router,
      }
    ));

    actions.push(new RouterLinkAction({
        icon: {name: 'add'},
        name: 'Add new pricing rule',
        tooltip: 'Add new pricing rule',
        routerUrl: this.config.getPanelUrl(`settings/pricing-rules/create/${this.object.id}`),
        router: this.router,
      }
    ));

    actions.push(new CallbackAction(
      {
        object: this.object,
        icon: {name: 'delete'},
        tooltip: 'Delete',
        name: 'Delete',
        callback: action => {
          return this.matDialog.open(
            PricingPlanDeleteComponent, {
              data: {
                planToDelete: this.object,
                isReseller: false,
                isStaff: true,
              }
          }).afterClosed().pipe(map(result => {
            if (result === false) {
              return ;
            }
            this.router.navigateByUrl(
              this.config.getPanelUrl('settings/openstack-plans')
            ).catch();
            return {message: result} as IActionResult;
          }));
        }
      }
    ));

    return actions;
  }

  getDetailsLink(): string {
    return this.config.getPanelUrl(`settings/openstack-plans/${this.object.id}`);
  }

  getCardFields(): IDataField[] {
    return [
      {
        name: 'Services count',
        value: `${this.object.services_count}`
      },
      {
        name: 'Pricing rules count',
        value: `${this.object.pricing_rules.length}`
      },
      {
        name: 'Currency',
        value: `${this.object.currency}`
      },
    ];
  }

  getCardTags(): string[] {
    const tags = [];
    if (this.object.is_default) {
      tags.push('default');
    }
    if (this.object.reseller_resources) {
      if (this.object.reseller_client && this.object.reseller_client.name) {
        tags.push(this.object.reseller_client.name);
      } else {
        tags.push('reseller\'s');
      }
    }
    return tags;
  }

  getTabs(): IDetailsTab[] {
    switch (this.state) {
      case 'details':
        return [
          {
            tabName: 'Overview',
            component: PricingPlanDetailsOverviewComponent,
          },
        ];
      case 'edit':
      case 'create':
        return [
          {
            tabName: 'Edit',
            component: PricingPlanEditFormComponent,
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
      case 'details':
        actions.push(new RouterLinkAction({
            name: 'Back',
            routerUrl: this.config.getPrevUrl(`settings/openstack-plans`),
            router: this.router,
          }
        ));
        actions.push(new RouterLinkAction({
            name: 'Create new pricing rule',
            routerUrl: this.config.getPanelUrl(`settings/pricing-rules/create/${this.object.id}`),
            router: this.router,
          }
        ));
        break;
      default:
        break;
    }

    return actions;
  }
}
