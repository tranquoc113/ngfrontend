import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IRouteConfig } from '@shared/ui-api/interfaces/route-config/route-config';
import { OrderListComponent } from './order-list/order-list.component';
import { OrderDetailsComponent } from './order-details/order-details.component';
import { OrderListResolver } from '@fleio-api/billing/orders/order-list.resolver';
import { OrderResolver } from '@fleio-api/billing/orders/order.resolver';
import { AuthGuard } from '@shared/auth/auth.guard';
import { OrderingDirection } from '@shared/ui-api/interfaces/route-config/ordering-directions';
import { FilterTypes } from '@shared/ui-api/interfaces/route-config/filter-types';
import { FleioObjectsList } from '@fleio-api/fleio-objects-list';
import { IBaseFleioObjectModel } from '@fleio-api/base-model/base-fleio-object.model';

const routes: Routes = [
  {
    path: '',
    component: OrderListComponent,
    resolve: {
      orders: OrderListResolver,
    },
    canActivate: [AuthGuard],
    data: {
      config: {
        feature: 'billing.orders',
        search: {
          show: true,
          placeholder: 'Search orders ...',
        },
        ordering: {
          default: {
            field: 'order_date',
            display: 'Order date',
            direction: OrderingDirection.Descending
          },
          options: [
            {
              field: 'id',
              display: 'Id'
            },
            {
              field: 'client',
              display: 'Client'
            },
            {
              field: 'user',
              display: 'User'
            },
            {
              field: 'order_date',
              display: 'Order date',
            },
            {
              field: 'status',
              display: 'Status',
            }
          ],
        },
        filterConfig: {
          availableOptions: [
            {
              display: 'Client',
              field: 'client',
              items: 'clients',
              type: FilterTypes.CustomModel,
              itemsDisplayField: 'name',
            },
            {
              display: 'User',
              field: 'user',
              items: 'users',
              type: FilterTypes.CustomModel,
              itemsDisplayField: 'full_name',
            },
            {
              display: 'Order date',
              field: 'order_date',
              type: FilterTypes.Date,
            },
            {
              display: 'Status',
              field: 'status',
              type: FilterTypes.Choices
            },
          ]
        },
        subheader: {
          objectName: 'order',
          objectNamePlural: 'orders',
          objectList(data): FleioObjectsList<IBaseFleioObjectModel> {
            return data.orders;
          }
        },
      } as IRouteConfig,
    },
    runGuardsAndResolvers: 'always'
  },
  {
    path: ':id',
    component: OrderDetailsComponent,
    resolve: {
      order: OrderResolver,
    },
    data: {
      config: {
        getBreadCrumbDetail: (data) => {
          return `Order ${data.order.id}`;
        },
      } as IRouteConfig,
    }
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OrdersRoutingModule {
}
