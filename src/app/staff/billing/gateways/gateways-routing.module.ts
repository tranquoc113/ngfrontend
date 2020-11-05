import { RouterModule, Routes } from '@angular/router';
import { GatewayListComponent } from './gateway-list/gateway-list.component';
import { GatewayListResolver } from '@fleio-api/billing/gateways/gateway-list.resolver';
import { AuthGuard } from '@shared/auth/auth.guard';
import { FleioObjectsList } from '@fleio-api/fleio-objects-list';
import { IBaseFleioObjectModel } from '@fleio-api/base-model/base-fleio-object.model';
import { OrderingDirection } from '@shared/ui-api/interfaces/route-config/ordering-directions';
import { IRouteConfig } from '@shared/ui-api/interfaces/route-config/route-config';
import { GatewayEditComponent } from './gateway-edit/gateway-edit.component';
import { GatewayResolver } from '@fleio-api/billing/gateways/gateway.resolver';
import { NgModule } from '@angular/core';

const routes: Routes = [
  {
    path: '',
    component: GatewayListComponent,
    resolve: {
      gateways: GatewayListResolver,
    },
    canActivate: [AuthGuard],
    data: {
      config: {
        feature: 'billing.gateways',
        search: {
          show: true,
          placeholder: 'Search gateways ...',
        },
        subheader: {
          objectList(data): FleioObjectsList<IBaseFleioObjectModel> {
            return data.gateways;
          },
          objectName: 'gateway',
          objectNamePlural: 'gateways',
        },
        ordering: {
          default: {
            display: 'Id',
            field: 'id',
            direction: OrderingDirection.Descending,
          },
          options: [
            {
              display: 'Id',
              field: 'id',
            },
            {
              display: 'Display name',
              field: 'display_name',
            },
            {
              display: 'Enabled',
              field: 'enabled',
            },
            {
              display: 'Visible to user',
              field: 'visible_to_user',
            },
            {
              display: 'Fixed fee',
              field: 'fixed_fee',
            },
            {
              display: 'Percent fee',
              field: 'percent_fee',
            },
          ]
        },
      } as IRouteConfig,
    },
    runGuardsAndResolvers: 'always'
  },
  {
    path: ':id',
    component: GatewayEditComponent,
    resolve: {
      gateway: GatewayResolver,
    },
    data: {
      config: {
        getBreadCrumbDetail: (data) => {
          return `Edit gateway ${data.gateway.display_name}`;
        },
      } as IRouteConfig,
    }
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GatewaysRoutingModule {
}
