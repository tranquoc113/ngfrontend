import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IRouteConfig } from '@shared/ui-api/interfaces/route-config/route-config';
import { ServiceListComponent } from './service-list/service-list.component';
import { ServiceDetailsComponent } from './service-details/service-details.component';
import { ServiceEditComponent } from './service-edit/service-edit.component';
import { ServiceListResolver } from '@fleio-api/billing/services/service-list.resolver';
import { ServiceResolver } from '@fleio-api/billing/services/service.resolver';
import { FleioObjectsList } from '@fleio-api/fleio-objects-list';
import { IBaseFleioObjectModel } from '@fleio-api/base-model/base-fleio-object.model';
import { OrderingDirection } from '@shared/ui-api/interfaces/route-config/ordering-directions';
import { AuthGuard } from '@shared/auth/auth.guard';
import { FilterTypes } from '@shared/ui-api/interfaces/route-config/filter-types';

const routes: Routes = [
  {
    path: '',
    component: ServiceListComponent,
    resolve: {
      services: ServiceListResolver,
    },
    canActivate: [AuthGuard],
    data: {
      config: {
        feature: 'billing.services',
        search: {
          show: true,
          placeholder: 'Search services ...',
        },
        subheader: {
          objectNamePlural: 'services',
          objectName: 'service',
          objectList(data): FleioObjectsList<IBaseFleioObjectModel> {
            return data.services;
          }
        },
        ordering: {
          default: {
            field: 'created_at',
            display: 'Created at',
            direction: OrderingDirection.Descending,
          },
          options: [
            {display: 'Name', field: 'name'},
            {display: 'Client', field: 'client'},
            {display: 'Created at', field: 'created_at'},
            {display: 'Paid until', field: 'paid_until'},
            {display: 'Status', field: 'status'},
          ]
        },
        filterConfig: {
          availableOptions: [
            {
              display: 'Created at',
              field: 'created_at',
              type: FilterTypes.Date
            },
            {
              display: 'Updated at',
              field: 'updated_at',
              type: FilterTypes.Date
            },
            {
              display: 'Activated at',
              field: 'activated_at',
              type: FilterTypes.Date
            },
            {
              display: 'Suspended at',
              field: 'suspended_at',
              type: FilterTypes.Date
            },
            {
              display: 'Terminated at',
              field: 'terminated_at',
              type: FilterTypes.Date
            },
            {
              display: 'Status',
              field: 'status',
              type: FilterTypes.Choices
            },
            {
              display: 'Paid until',
              field: 'paid_until',
              type: FilterTypes.Date
            },
            {
              display: 'Client',
              field: 'client',
              type: FilterTypes.CustomModel,
              items: 'clients',
              itemsDisplayField: 'name'
            }
          ]
        }
      } as IRouteConfig,
    },
    runGuardsAndResolvers: 'always',
  },
  {
    path: ':id',
    component: ServiceDetailsComponent,
    resolve: {
      service: ServiceResolver,
      // permissions: ServicePermissionsResolver,
    },
    data: {
      config: {
        getBreadCrumbDetail: (data) => {
          return data.service.display_name || data.service.id;
        },
      } as IRouteConfig,
    },
    runGuardsAndResolvers: 'always',
  },
  {
    path: ':id/edit',
    component: ServiceEditComponent,
    resolve: {
      service: ServiceResolver,
    },
    data: {
      config: {
        getBreadCrumbDetail: (data) => {
          return data.service.display_name || data.service.id;
        },
      } as IRouteConfig,
    }
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ServicesRoutingModule {
}
