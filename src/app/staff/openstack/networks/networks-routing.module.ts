import { RouterModule, Routes } from '@angular/router';
import { NetworkListComponent } from './network-list/network-list.component';
import { NetworkListResolver } from '@fleio-api/openstack/network/network-list.resolver';
import { AuthGuard } from '@shared/auth/auth.guard';
import { FleioObjectsList } from '@fleio-api/fleio-objects-list';
import { IBaseFleioObjectModel } from '@fleio-api/base-model/base-fleio-object.model';
import { OrderingDirection } from '@shared/ui-api/interfaces/route-config/ordering-directions';
import { FilterTypes } from '@shared/ui-api/interfaces/route-config/filter-types';
import { IRouteConfig } from '@shared/ui-api/interfaces/route-config/route-config';
import { NetworkCreateComponent } from './network-create/network-create.component';
import { NetworkCreateOptionsResolver } from '@fleio-api/openstack/network/network-create-options.resolver';
import { NetworkDetailsComponent } from './network-details/network-details.component';
import { NetworkResolver } from '@fleio-api/openstack/network/network.resolver';
import { NetworkPermissionsResolver } from '@fleio-api/openstack/network/network-permissions.resolver';
import { NetworkEditComponent } from './network-edit/network-edit.component';
import { NetworkAddSubnetComponent } from './network-add-subnet/network-add-subnet.component';
import { NgModule } from '@angular/core';
import { NetworkEditSubnetComponent } from './network-edit-subnet/network-edit-subnet.component';
import { NetworkSubnetResolver } from '@fleio-api/openstack/subnets/network-subnet.resolver';
import { NetworkAutoCreateComponent } from './network-auto-create/network-auto-create.component';
import { NetworkConfigAutoCreateComponent } from './network-config-auto-create/network-config-auto-create.component';
import { NetworkSubnetCreateOptionsResolver } from '@fleio-api/openstack/subnets/network-subnet-create-options.resolver';
import { RegionListResolver } from '@fleio-api/openstack/region/region-list.resolver';

const routes: Routes = [
  {
    path: '',
    component: NetworkListComponent,
    resolve: {
      networks: NetworkListResolver,
    },
    canActivate: [AuthGuard],
    data: {
      config: {
        feature: 'openstack.networks',
        search: {
          show: true,
          placeholder: 'Search networks ...',
        },
        subheader: {
          objectNamePlural: 'networks',
          objectName: 'network',
          objectList(data): FleioObjectsList<IBaseFleioObjectModel> {
            return data.networks;
          }
        },
        ordering: {
          default: {
            display: 'Created at',
            field: 'created_at',
            direction: OrderingDirection.Ascending,
          },
          options: [
            {
              display: 'Name',
              field: 'name',
            },
            {
              display: 'Created at',
              field: 'created_at',
            },
            {
              display: 'Region',
              field: 'region',
            },
          ]
        },
        filterConfig: {
          availableOptions: [
            {
              display: 'Created at',
              field: 'created_at',
              type: FilterTypes.Date,
            },
            {
              field: 'region',
              display: 'Region',
              type: FilterTypes.CustomModel,
              items: 'regions',
              itemsDisplayField: 'id'
            },
            {
              display: 'Is default',
              field: 'is_default',
              type: FilterTypes.Boolean
            },
            {
              display: 'Shared',
              field: 'shared',
              type: FilterTypes.Boolean
            },
          ]
        }
      } as IRouteConfig,
    },
    runGuardsAndResolvers: 'always',
  },
  {
    path: 'create',
    component: NetworkCreateComponent,
    resolve: {
      createOptions: NetworkCreateOptionsResolver,
    },
    data: {
      config: {
        getBreadCrumbDetail: () => {
          return 'Create network';
        },
      } as IRouteConfig,
    }
  },
  {
    path: 'auto-create',
    component: NetworkAutoCreateComponent,
    resolve: {
      createOptions: NetworkCreateOptionsResolver,
    },
    canActivate: [AuthGuard],
    data: {
      config: {
        feature: 'openstack.networks.auto_create_network',
        getBreadCrumbDetail: () => {
          return 'Get me a network';
        },
      } as IRouteConfig,
    }
  },
  {
    path: 'config-auto-create',
    component: NetworkConfigAutoCreateComponent,
    resolve: {
      regions: RegionListResolver,
    },
    canActivate: [AuthGuard],
    data: {
      config: {
        feature: 'openstack.networks.auto_create_network',
        getBreadCrumbDetail: () => {
          return 'Config auto create options';
        },
      } as IRouteConfig,
    }
  },
  {
    path: ':id',
    component: NetworkDetailsComponent,
    resolve: {
      network: NetworkResolver,
      permissions: NetworkPermissionsResolver,
    },
    data: {
      config: {
        getBreadCrumbDetail: (data) => {
          return data.network.name;
        },
      } as IRouteConfig,
    },
    runGuardsAndResolvers: 'always',
  },
  {
    path: ':id/edit',
    component: NetworkEditComponent,
    resolve: {
      network: NetworkResolver,
      createOptions: NetworkCreateOptionsResolver,
    },
    data: {
      config: {
        getBreadCrumbDetail: (data) => {
          return `Edit network ${data.network.name}`;
        },
      } as IRouteConfig,
    }
  },
  {
    path: ':id/add-subnet',
    component: NetworkAddSubnetComponent,
    resolve: {
      network: NetworkResolver,
      subnetCreateOptions: NetworkSubnetCreateOptionsResolver,
    },
    data: {
      config: {
        getBreadCrumbDetail: (data) => {
          return `Add subnet to ${data.network.name}`;
        },
      } as IRouteConfig,
    }
  },
  {
    path: ':id/edit-subnet/:subnetId',
    component: NetworkEditSubnetComponent,
    resolve: {
      network: NetworkResolver,
      subnet: NetworkSubnetResolver,
      subnetCreateOptions: NetworkSubnetCreateOptionsResolver,
    },
    data: {
      config: {
        getBreadCrumbDetail: (data) => {
          return `Edit subnet ${data.subnet.name} of ${data.network.name}`;
        },
      } as IRouteConfig,
    }
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NetworksRoutingModule {
}
