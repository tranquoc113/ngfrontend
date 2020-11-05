import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IRouteConfig } from '../../../../shared/ui-api/interfaces/route-config/route-config';
import { PricingRuleCreateComponent } from './pricing-rule-create/pricing-rule-create.component';
import {
  PricingRuleCreateOptionsResolver
} from '../../../../shared/fleio-api/openstack/pricing-rule/pricing-rule-create-options.resolver';
import { PricingPlanResolver } from '../../../../shared/fleio-api/openstack/pricing-plan/pricing-plan.resolver';
import { PricingRuleEditComponent } from './pricing-rule-edit/pricing-rule-edit.component';
import { PricingRuleResolver } from '../../../../shared/fleio-api/openstack/pricing-rule/pricing-rule.resolver';
import { AuthGuard } from '../../../../shared/auth/auth.guard';

const routes: Routes = [
  {
    path: 'create/:id',
    component: PricingRuleCreateComponent,
    resolve: {
      pricingPlan: PricingPlanResolver,
      createOptions: PricingRuleCreateOptionsResolver,
    },
    canActivate: [AuthGuard],
    data: {
      config: {
        feature: 'openstack.plans',
        getBreadCrumbDetail: () => {
          return 'Create new pricing rule';
        },
      } as IRouteConfig,
    },
  },
  {
    path: ':id/edit',
    component: PricingRuleEditComponent,
    resolve: {
      pricingRule: PricingRuleResolver,
      createOptions: PricingRuleCreateOptionsResolver,
    },
    data: {
      config: {
        getBreadCrumbDetail: (data) => {
          return `Edit pricing rule ${data.pricingRule.display_name}`;
        },
      } as IRouteConfig,
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PricingRulesRoutingModule { }
