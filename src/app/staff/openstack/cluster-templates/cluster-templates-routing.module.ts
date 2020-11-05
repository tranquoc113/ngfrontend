import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '@shared/auth/auth.guard';
import { FleioObjectsList } from '@fleio-api/fleio-objects-list';
import { IBaseFleioObjectModel } from '@fleio-api/base-model/base-fleio-object.model';
import { OrderingDirection } from '@shared/ui-api/interfaces/route-config/ordering-directions';
import { IRouteConfig } from '@shared/ui-api/interfaces/route-config/route-config';
import { NgModule } from '@angular/core';
import { FilterTypes } from '@shared/ui-api/interfaces/route-config/filter-types';
import { ClusterTemplateListComponent } from './cluster-template-list/cluster-template-list.component';
import { ClusterTemplateListResolver } from '@fleio-api/openstack/cluster-template/cluster-template-list.resolver';
import { ClusterTemplateCreateComponent } from './cluster-template-create/cluster-template-create.component';
import { ClusterTemplateCreateOptionsResolver } from '@fleio-api/openstack/cluster-template/cluster-template-create-options.resolver';
import { ClusterTemplateDetailsComponent } from './cluster-template-details/cluster-template-details.component';
import { ClusterTemplateResolver } from '@fleio-api/openstack/cluster-template/cluster-template.resolver';

const routes: Routes = [
  {
    path: '',
    component: ClusterTemplateListComponent,
    resolve: {
      clusterTemplates: ClusterTemplateListResolver,
    },
    canActivate: [AuthGuard],
    data: {
      config: {
        feature: 'openstack.coe.cluster_templates',
        search: {
          show: true,
          placeholder: 'Search cluster templates ...',
        },
        subheader: {
          objectName: 'cluster template',
          objectNamePlural: 'cluster templates',
          objectList(data): FleioObjectsList<IBaseFleioObjectModel> {
            return data.clusterTemplates;
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
              display: 'Client',
              field: 'project__service__client',
              type: FilterTypes.CustomModel,
              items: 'clients',
              itemsDisplayField: 'name'
            },
            {
              display: 'Is public',
              field: 'public',
              type: FilterTypes.Boolean,
            },
            {
              display: 'Floating ip enabled',
              field: 'floating_ip_enabled',
              type: FilterTypes.Boolean,
            },
            {
              display: 'Region',
              field: 'region',
              type: FilterTypes.CustomModel,
              items: 'regions',
              itemsDisplayField: 'id'
            },
          ]
        }
      } as IRouteConfig,
    },
    runGuardsAndResolvers: 'always'
  },
  {
    path: 'create',
    component: ClusterTemplateCreateComponent,
    resolve: {
      createOptions: ClusterTemplateCreateOptionsResolver
    },
    data: {
      config: {
        getBreadCrumbDetail: () => {
          return 'Create cluster template';
        },
      } as IRouteConfig,
    }
  },
  {
    path: ':id',
    component: ClusterTemplateDetailsComponent,
    resolve: {
      clusterTemplate: ClusterTemplateResolver,
    },
    data: {
      config: {
        getBreadCrumbDetail: (data) => {
          return `Cluster template ${data.clusterTemplate.name}`;
        },
      } as IRouteConfig,
    }
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClusterTemplatesRoutingModule {
}
