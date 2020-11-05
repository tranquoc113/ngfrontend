import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '@shared/auth/auth.guard';
import { FleioObjectsList } from '@fleio-api/fleio-objects-list';
import { IBaseFleioObjectModel } from '@fleio-api/base-model/base-fleio-object.model';
import { OrderingDirection } from '@shared/ui-api/interfaces/route-config/ordering-directions';
import { IRouteConfig } from '@shared/ui-api/interfaces/route-config/route-config';
import { NgModule } from '@angular/core';
import { FilterTypes } from '@shared/ui-api/interfaces/route-config/filter-types';
import { ClusterListComponent } from './cluster-list/cluster-list.component';
import { ClusterListResolver } from '@fleio-api/openstack/cluster/cluster-list.resolver';
import { ClusterCreateComponent } from './cluster-create/cluster-create.component';
import { ClusterDetailsComponent } from './cluster-details/cluster-details.component';
import { ClusterResolver } from '@fleio-api/openstack/cluster/cluster.resolver';
import { ClusterResizeComponent } from './cluster-resize/cluster-resize.component';
import { ClusterCreateOptionsResolver } from '@fleio-api/openstack/cluster/cluster-create-options.resolver';
import { ClusterUpgradeComponent } from './cluster-upgrade/cluster-upgrade.component';

const routes: Routes = [
  {
    path: '',
    component: ClusterListComponent,
    resolve: {
      clusters: ClusterListResolver,
    },
    canActivate: [AuthGuard],
    data: {
      config: {
        feature: 'openstack.coe.clusters',
        search: {
          show: true,
          placeholder: 'Search clusters ...',
        },
        subheader: {
          objectName: 'cluster',
          objectNamePlural: 'clusters',
          objectList(data): FleioObjectsList<IBaseFleioObjectModel> {
            return data.clusters;
          },
        },
        ordering: {
          default: {
            display: 'Created at',
            field: 'created_at',
            direction: OrderingDirection.Descending,
          },
          options: [
            {
              display: 'Name',
              field: 'name',
            },
            {
              display: 'Status',
              field: 'status',
            },
            {
              display: 'Created at',
              field: 'created_at',
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
              display: 'Region',
              field: 'region',
              type: FilterTypes.CustomModel,
              items: 'regions',
              itemsDisplayField: 'id'
            },
            {
              display: 'Status',
              field: 'status',
              type: FilterTypes.Choices,
            },
            {
              display: 'Cluster template',
              field: 'cluster_template',
              type: FilterTypes.CustomModel,
              items: 'clustertemplates',
              itemsDisplayField: 'name'
            },
          ]
        }
      } as IRouteConfig,
    },
    runGuardsAndResolvers: 'always'
  },
  {
    path: 'create',
    component: ClusterCreateComponent,
    resolve: {
      createOptions: ClusterCreateOptionsResolver
    },
    data: {
      config: {
        getBreadCrumbDetail: () => {
          return 'Create cluster';
        },
      } as IRouteConfig,
    }
  },
  {
    path: ':id/resize',
    component: ClusterResizeComponent,
    resolve: {
      cluster: ClusterResolver,
    },
    data: {
      config: {
        getBreadCrumbDetail: (data) => {
          let identifier: string;
          if (data.cluster.name) {
            identifier = data.cluster.name;
          } else {
            identifier = data.cluster.id;
          }
          return `Resize cluster ${identifier}`;
        },
      } as IRouteConfig,
    }
  },
  {
    path: ':id/upgrade',
    component: ClusterUpgradeComponent,
    resolve: {
      cluster: ClusterResolver,
    },
    data: {
      config: {
        getBreadCrumbDetail: (data) => {
          let identifier: string;
          if (data.cluster.name) {
            identifier = data.cluster.name;
          } else {
            identifier = data.cluster.id;
          }
          return `Upgrade cluster ${identifier}`;
        },
      } as IRouteConfig,
    }
  },
  {
    path: ':id',
    component: ClusterDetailsComponent,
    resolve: {
      cluster: ClusterResolver,
    },
    data: {
      config: {
        getBreadCrumbDetail: (data) => {
          let identifier: string;
          if (data.cluster.name) {
            identifier = data.cluster.name;
          } else {
            identifier = data.cluster.id;
          }
          return `Cluster ${identifier}`;
        },
      } as IRouteConfig,
    }
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClustersRoutingModule {
}
