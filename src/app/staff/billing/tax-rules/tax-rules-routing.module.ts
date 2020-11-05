import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '@shared/auth/auth.guard';
import { TaxRulesListComponent } from './tax-rules-list/tax-rules-list.component';
import { TaxRulesListResolver } from '@fleio-api/billing/tax-rules/tax-rules-list.resolver';
import { FleioObjectsList } from '@fleio-api/fleio-objects-list';
import { IBaseFleioObjectModel } from '@fleio-api/base-model/base-fleio-object.model';
import { OrderingDirection } from '@shared/ui-api/interfaces/route-config/ordering-directions';
import { FilterTypes } from '@shared/ui-api/interfaces/route-config/filter-types';
import { IRouteConfig } from '@shared/ui-api/interfaces/route-config/route-config';
import { TaxRuleCreateComponent } from './tax-rule-create/tax-rule-create.component';
import { TaxRuleCreateOptionsResolver } from '@fleio-api/billing/tax-rules/tax-rule-create-options.resolver';
import { TaxRuleResolver } from '@fleio-api/billing/tax-rules/tax-rule.resolver';
import { TaxRuleEditComponent } from './tax-rule-edit/tax-rule-edit.component';

const routes: Routes = [
  {
    path: '',
    component: TaxRulesListComponent,
    resolve: {
      taxRules: TaxRulesListResolver,
    },
    canActivate: [AuthGuard],
    data: {
      config: {
        feature: 'billing.taxrules',
        search: {
          show: true,
          placeholder: 'Search tax rules ...',
        },
        subheader: {
          objectNamePlural: 'tax rules',
          objectName: 'tax rule',
          objectList(data): FleioObjectsList<IBaseFleioObjectModel> {
            return data.journalEntries;
          }
        },
        ordering: {
          default: {
            field: 'country',
            display: 'Country',
            direction: OrderingDirection.Ascending,
          },
          options: [
            {display: 'Country', field: 'country'},
            {display: 'State', field: 'state'},
            {display: 'Level', field: 'level'},
            {display: 'Rate', field: 'rate'},
            {display: 'Name', field: 'name'},
          ]
        },
        filterConfig: {
          availableOptions: [
            {
              display: 'Start date',
              field: 'start_date',
              type: FilterTypes.Date,
            },
            {
              display: 'End date',
              field: 'end_date',
              type: FilterTypes.Date,
            },
            {
              display: 'Rate',
              field: 'rate',
              type: FilterTypes.Decimal
            },
            {
              display: 'Level',
              field: 'level',
              type: FilterTypes.Choices,
            },
          ]
        }
      } as IRouteConfig,
    },
    runGuardsAndResolvers: 'always'
  },
  {
    path: 'create',
    component: TaxRuleCreateComponent,
    resolve: {
      createOptions: TaxRuleCreateOptionsResolver,
    },
    data: {
      config: {
        getBreadCrumbDetail: (data) => {
          return 'Create new tax rule';
        },
      } as IRouteConfig,
    }
  },
  {
    path: ':id/edit',
    component: TaxRuleEditComponent,
    resolve: {
      taxRule: TaxRuleResolver,
      createOptions: TaxRuleCreateOptionsResolver,
    },
    data: {
      config: {
        getBreadCrumbDetail: (data) => {
          return 'Edit tax rule';
        },
      } as IRouteConfig,
    }
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TaxRulesRoutingModule {
}
