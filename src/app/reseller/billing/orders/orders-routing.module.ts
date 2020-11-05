import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IRouteConfig } from '@shared/ui-api/interfaces/route-config/route-config';
import { OrderListComponent } from './order-list/order-list.component';
import { OrderDetailsComponent } from './order-details/order-details.component';
import { OrderListResolver } from '@fleio-api/billing/orders/order-list.resolver';
import { OrderResolver } from '@fleio-api/billing/orders/order.resolver';

const routes: Routes = [
  {
    path: '',
    component: OrderListComponent,
    resolve: {
      orders: OrderListResolver,
    },
    data: {
      config: {
        search: {
          show: true,
          placeholder: 'Search orders ...',
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
        getBreadCrumbDetail: () => {
          return '<implement>';
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
