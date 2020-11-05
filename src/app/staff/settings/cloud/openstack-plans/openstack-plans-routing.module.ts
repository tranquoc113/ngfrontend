import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IRouteConfig } from '../../../../shared/ui-api/interfaces/route-config/route-config';
import { OpenstackPlanListComponent } from './openstack-plan-list/openstack-plan-list.component';
import { OpenstackPlanDetailsComponent } from './openstack-plan-details/openstack-plan-details.component';
import { OpenstackPlanEditComponent } from './openstack-plan-edit/openstack-plan-edit.component';
import { OpenstackPlanCreateComponent } from './openstack-plan-create/openstack-plan-create.component';
import { PricingPlanListResolver } from '../../../../shared/fleio-api/openstack/pricing-plan/pricing-plan-list.resolver';
import { PricingPlanResolver } from '../../../../shared/fleio-api/openstack/pricing-plan/pricing-plan.resolver';
import { PricingPlanCreateOptionsResolver } from '../../../../shared/fleio-api/openstack/pricing-plan/pricing-plan-create-options.resolver';
import { FleioObjectsList } from '../../../../shared/fleio-api/fleio-objects-list';
import { IBaseFleioObjectModel } from '../../../../shared/fleio-api/base-model/base-fleio-object.model';
import { OrderingDirection } from '../../../../shared/ui-api/interfaces/route-config/ordering-directions';
import { AuthGuard } from '../../../../shared/auth/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: OpenstackPlanListComponent,
    resolve: {
      pricingPlans: PricingPlanListResolver,
      createOptions: PricingPlanCreateOptionsResolver,
    },
    canActivate: [AuthGuard],
    data: {
      config: {
        feature: 'openstack.plans',
        search: {
          show: true,
          placeholder: 'Search plans ...',
        },
        ordering: {
          default: {
            field: 'name',
            display: 'Name',
            direction: OrderingDirection.Ascending
          },
          options: [
            {
              field: 'name',
              display: 'Name'
            },
            {
              field: 'currency',
              display: 'Currency'
            },
          ],
        },
        subheader: {
          objectName: 'openstack plan',
          objectNamePlural: 'openstack plans',
          objectList(data): FleioObjectsList<IBaseFleioObjectModel> {
            return data.pricingPlans;
          }
        },
        getBreadCrumbDetail: () => {
          return 'Openstack plans';
        },
      } as IRouteConfig,
    },
    runGuardsAndResolvers: 'always'
  },
  {
    path: 'create',
    component: OpenstackPlanCreateComponent,
    resolve: {
      createOptions: PricingPlanCreateOptionsResolver,
    },
    data: {
      config: {
        getBreadCrumbDetail: () => {
          return 'Create new pricing plan';
        },
      } as IRouteConfig,
    },
  },
  {
    path: ':id',
    component: OpenstackPlanDetailsComponent,
    resolve: {
      pricingPlan: PricingPlanResolver
    },
    data: {
      config: {
        getBreadCrumbDetail: (data) => {
          return `Pricing plan ${data.pricingPlan.name}`;
        },
      } as IRouteConfig,
    },
    runGuardsAndResolvers: 'always'
  },
  {
    path: ':id/edit',
    component: OpenstackPlanEditComponent,
    resolve: {
      pricingPlan: PricingPlanResolver,
      createOptions: PricingPlanCreateOptionsResolver,
    },
    data: {
      config: {
        getBreadCrumbDetail: (data) => {
          return `Edit pricing plan ${data.pricingPlan.name}`;
        },
      } as IRouteConfig,
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OpenstackPlansRoutingModule { }
