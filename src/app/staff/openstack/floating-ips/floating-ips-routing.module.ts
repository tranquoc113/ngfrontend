import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '@shared/auth/auth.guard';
import { FleioObjectsList } from '@fleio-api/fleio-objects-list';
import { IBaseFleioObjectModel } from '@fleio-api/base-model/base-fleio-object.model';
import { OrderingDirection } from '@shared/ui-api/interfaces/route-config/ordering-directions';
import { IRouteConfig } from '@shared/ui-api/interfaces/route-config/route-config';
import { NgModule } from '@angular/core';
import { FilterTypes } from '@shared/ui-api/interfaces/route-config/filter-types';
import { FloatingIpListComponent } from './floating-ip-list/floating-ip-list.component';
import { FloatingIpListResolver } from '@fleio-api/openstack/floating-ips/floating-ip-list.resolver';
import { FloatingIpCreateComponent } from './floating-ip-create/floating-ip-create.component';
import { FloatingIpDetailsComponent } from './floating-ip-details/floating-ip-details.component';
import { FloatingIpResolver } from '@fleio-api/openstack/floating-ips/floating-ip.resolver';

const routes: Routes = [
  {
    path: '',
    component: FloatingIpListComponent,
    resolve: {
      floatingIps: FloatingIpListResolver,
    },
    canActivate: [AuthGuard],
    data: {
      config: {
        feature: 'openstack.floatingips',
        search: {
          show: true,
          placeholder: 'Search floating ips ...',
        },
        subheader: {
          objectList(data): FleioObjectsList<IBaseFleioObjectModel> {
            return data.floatingIps;
          },
          objectName: 'floating ip',
          objectNamePlural: 'floating ips',
        },
        ordering: {
          default: {
            display: 'IP address',
            field: 'floating_ip_address',
            direction: OrderingDirection.Ascending,
          },
          options: [
            {
              display: 'IP address',
              field: 'floating_ip_address',
            },
            {
              display: 'Status',
              field: 'status',
            },
            {
              display: 'Network',
              field: 'floating_network',
            },
          ]
        },
        filterConfig: {
          availableOptions:[
            {
              display: 'Created at',
              field: 'created_at',
              type: FilterTypes.Date,
            },
            {
              display: 'Updated at',
              field: 'updated_at',
              type: FilterTypes.Date,
            },
            {
              display: 'Client',
              field: 'project__service__client',
              type: FilterTypes.CustomModel,
              items: 'clients',
              itemsDisplayField: 'name'
            },
            {
              display: 'Status',
              field: 'status',
              type: FilterTypes.Choices
            },
          ]
        }
      } as IRouteConfig,
    },
    runGuardsAndResolvers: 'always'
  },
  {
    path: 'create',
    component: FloatingIpCreateComponent,
    resolve: {
    },
    data: {
      config: {
        getBreadCrumbDetail: () => {
          return 'Create floating ip';
        },
      } as IRouteConfig,
    }
  },
  {
    path: ':id',
    component: FloatingIpDetailsComponent,
    resolve: {
      floatingIp: FloatingIpResolver,
    },
    data: {
      config: {
        getBreadCrumbDetail: (data) => {
          return `Floating ip ${data.floatingIp.floating_ip_address || data.floatingIp.id}`;
        },
      } as IRouteConfig,
    }
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FloatingIpsRoutingModule {
}
