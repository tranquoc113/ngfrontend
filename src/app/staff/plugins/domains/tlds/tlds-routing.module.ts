import { RouterModule, Routes } from '@angular/router';
import { TldListComponent } from './tld-list/tld-list.component';
import { TLDListResolver } from '../../../../shared/fleio-api/plugins/domains/tld-list.resolver';
import { AuthGuard } from '../../../../shared/auth/auth.guard';
import { FleioObjectsList } from '../../../../shared/fleio-api/fleio-objects-list';
import { IBaseFleioObjectModel } from '../../../../shared/fleio-api/base-model/base-fleio-object.model';
import { OrderingDirection } from '../../../../shared/ui-api/interfaces/route-config/ordering-directions';
import { FilterTypes } from '../../../../shared/ui-api/interfaces/route-config/filter-types';
import { IRouteConfig } from '../../../../shared/ui-api/interfaces/route-config/route-config';
import { TldCreateComponent } from './tld-create/tld-create.component';
import { TLDResolver } from '../../../../shared/fleio-api/plugins/domains/tld.resolver';
import { TldDetailsComponent } from './tld-details/tld-details.component';
import { NgModule } from '@angular/core';
import { TLDPricesResolver } from '../../../../shared/fleio-api/plugins/domains/tld-prices.resolver';

const routes: Routes = [
  {
    path: '',
    component: TldListComponent,
    resolve: {
      tlds: TLDListResolver,
    },
    canActivate: [AuthGuard],
    data: {
      config: {
        feature: 'plugins.domains',
        search: {
          show: true,
          placeholder: 'Search TLDs ...',
        },
        subheader: {
          objectList(data): FleioObjectsList<IBaseFleioObjectModel> {
            return data.tlds;
          },
          objectName: 'tld',
          objectNamePlural: 'tlds',
        },
        ordering: {
          default: {
            display: 'Created at',
            field: 'created_at',
            direction: OrderingDirection.Descending,
          },
          options: [
            {
              display: 'Created at',
              field: 'created_at',
            },
            {
              display: 'Name',
              field: 'name',
            },
          ]
        },
        filterConfig: {
          availableOptions: [
            {
              field: 'created_at',
              display: 'Created at',
              type: FilterTypes.Date,
            },
            {
              field: 'premium_domains_available',
              display: 'Premium domains available',
              type: FilterTypes.Boolean,
            },
            {
              field: 'requires_epp_for_transfer',
              display: 'Requires epp for transfer',
              type: FilterTypes.Boolean,
            },
            {
              field: 'default_registrar',
              display: 'Default registrar',
              type: FilterTypes.CustomModel,
              items: 'domainRegistrars',
              itemsDisplayField: 'name',
            },
          ],
        }
      } as IRouteConfig,
    },
    runGuardsAndResolvers: 'always'
  },
  {
    path: 'create',
    component: TldCreateComponent,
    resolve: {
    },
    data: {
      config: {
        getBreadCrumbDetail: () => {
          return 'Create TLD';
        },
      } as IRouteConfig,
    }
  },
  {
    path: ':id',
    component: TldDetailsComponent,
    resolve: {
      tld: TLDResolver,
      prices: TLDPricesResolver,
    },
    data: {
      config: {
        getBreadCrumbDetail: (data) => {
          return data.tld.name;
        },
      } as IRouteConfig,
    },
    runGuardsAndResolvers: 'always',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TldRoutingModule {
}
