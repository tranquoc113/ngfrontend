import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IRouteConfig } from '@shared/ui-api/interfaces/route-config/route-config';
import { IBaseFleioObjectModel } from '@fleio-api/base-model/base-fleio-object.model';
import { FleioObjectsList } from '@fleio-api/fleio-objects-list';
import { OrderingDirection } from '@shared/ui-api/interfaces/route-config/ordering-directions';
import { AuthGuard } from '@shared/auth/auth.guard';
import { FilterTypes } from '@shared/ui-api/interfaces/route-config/filter-types';
import { SubnetPoolListComponent } from './subnet-pool-list/subnet-pool-list.component';
import { SubnetPoolListResolver } from '@fleio-api/openstack/subnet-pools/subnet-pool-list.resolver';
import { SubnetPoolCreateComponent } from './subnet-pool-create/subnet-pool-create.component';
import { SubnetPoolCreateOptionsResolver } from '@fleio-api/openstack/subnet-pools/subnet-pool-create-options.resolver';
import { SubnetPoolDetailsComponent } from './subnet-pool-details/subnet-pool-details.component';
import { SubnetPoolResolver } from '@fleio-api/openstack/subnet-pools/subnet-pool.resolver';
import { SubnetPoolPermissionsResolver } from '@fleio-api/openstack/subnet-pools/subnet-pool-permissions.resolver';
import { SubnetPoolEditComponent } from './subnet-pool-edit/subnet-pool-edit.component';

const routes: Routes = [
  {
    path: '',
    component: SubnetPoolListComponent,
    resolve: {
      subnetPools: SubnetPoolListResolver,
    },
    canActivate: [AuthGuard],
    data: {
      config: {
        feature: 'openstack.subnetpools',
        search: {
          show: true,
          placeholder: 'Search subnet pools ...',
        },
        subheader: {
          objectList(data): FleioObjectsList<IBaseFleioObjectModel> {
            return data.subnetPools;
          },
          objectName: 'subnet pool',
          objectNamePlural: 'subnet pools'
        },
        ordering: {
          default: {
            display: 'Created at',
            field: 'created_at',
            direction: OrderingDirection.Descending,
          },
          options: [
            {display: 'Name', field: 'name'},
            {display: 'Created at', field: 'created_at'},
            {display: 'Region', field: 'region'},
            {display: 'Prefixes', field: 'prefixes'},
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
              display: 'Updated at',
              field: 'updated_at',
              type: FilterTypes.Date,
            },
            {
              display: 'Is default',
              field: 'is_default',
              type: FilterTypes.Boolean,
            },
            {
              display: 'Shared',
              field: 'shared',
              type: FilterTypes.Boolean,
            },
            {
              display: 'Min prefix len',
              field: 'min_prefix_len',
              type: FilterTypes.Decimal,
            },
            {
              display: 'Max prefix len',
              field: 'max_prefix_len',
              type: FilterTypes.Decimal,
            },
          ]
        }
      } as IRouteConfig,
    },
    runGuardsAndResolvers: 'always'
  },
  {
    path: 'create',
    component: SubnetPoolCreateComponent,
    resolve: {
      createOptions: SubnetPoolCreateOptionsResolver,
    },
    data: {
      config: {
        getBreadCrumbDetail: () => {
          return 'Create subnet pool';
        },
      } as IRouteConfig,
    }
  },
  {
    path: ':id',
    component: SubnetPoolDetailsComponent,
    resolve: {
      subnetPool: SubnetPoolResolver,
      permissions: SubnetPoolPermissionsResolver,
    },
    data: {
      config: {
        getBreadCrumbDetail: (data) => {
          return data.subnetPool.name;
        },
      } as IRouteConfig,
    }
  },
  {
    path: ':id/edit',
    component: SubnetPoolEditComponent,
    resolve: {
      subnetPool: SubnetPoolResolver,
      createOptions: SubnetPoolCreateOptionsResolver,
    },
    data: {
      config: {
        getBreadCrumbDetail: (data) => {
          return data.subnetPool.name;
        },
      } as IRouteConfig,
    },
    runGuardsAndResolvers: 'always'
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SubnetPoolsRoutingModule {
}
