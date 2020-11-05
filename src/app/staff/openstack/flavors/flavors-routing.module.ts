import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IRouteConfig } from '@shared/ui-api/interfaces/route-config/route-config';
import { FlavorListResolver } from '@fleio-api/openstack/flavor/flavor-list.resolver';
import { FlavorResolver } from '@fleio-api/openstack/flavor/flavor.resolver';
import { FlavorPermissionsResolver } from '@fleio-api/openstack/flavor/flavor-permissions.resolver';
import { FlavorCreateOptionsResolver } from '@fleio-api/openstack/flavor/flavor-create-options.resolver';
import { IBaseFleioObjectModel } from '@fleio-api/base-model/base-fleio-object.model';
import { FleioObjectsList } from '@fleio-api/fleio-objects-list';
import { OrderingDirection } from '@shared/ui-api/interfaces/route-config/ordering-directions';
import { AuthGuard } from '@shared/auth/auth.guard';
import { FilterTypes } from '@shared/ui-api/interfaces/route-config/filter-types';
import { FlavorListComponent } from './flavor-list/flavor-list.component';
import { FlavorCreateComponent } from './flavor-create/flavor-create.component';
import { FlavorDetailsComponent } from './flavor-details/flavor-details.component';
import { FlavorEditComponent } from './flavor-edit/flavor-edit.component';
import { ShowToClientGroupsComponent } from './show-to-client-groups/show-to-client-groups.component';

const routes: Routes = [
  {
    path: '',
    component: FlavorListComponent,
    resolve: {
      flavors: FlavorListResolver,
    },
    canActivate: [AuthGuard],
    data: {
      config: {
        feature: 'openstack.flavors',
        search: {
          show: true,
          placeholder: 'Search flavors ...',
        },
        subheader: {
          objectNamePlural: 'flavors',
          objectName: 'flavor',
          objectList(data): FleioObjectsList<IBaseFleioObjectModel> {
            return data.flavors;
          }
        },
        ordering: {
          default: {
            field: 'name',
            display: 'Name',
            direction: OrderingDirection.Ascending,
          },
          options: [
            {
              field: 'name',
              display: 'Name',
            },
            {
              field: 'region',
              display: 'Region',
            },
            {
              field: 'vcpus',
              display: 'vCPUs',
            },
            {
              field: 'memory_mb',
              display: 'Memory MB',
            },
            {
              field: 'root_gb',
              display: 'Root',
            },
          ]
        },
        filterConfig: {
          availableOptions: [
            {
              field: 'region',
              display: 'Region',
              type: FilterTypes.CustomModel,
              items: 'regions',
              itemsDisplayField: 'id'
            },
            {
              display: 'Memory mb',
              field: 'memory_mb',
              type: FilterTypes.Decimal
            },
            {
              display: 'Root gb',
              field: 'root_gb',
              type: FilterTypes.Decimal
            },
            {
              display: 'vCPUs',
              field: 'vcpus',
              type: FilterTypes.Decimal
            },
            {
              display: 'Is public',
              field: 'is_public',
              type: FilterTypes.Boolean
            },
            {
              display: 'Flavor group',
              field: 'flavor_group',
              type: FilterTypes.CustomModel,
              items: 'flavorgroups',
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
    component: FlavorCreateComponent,
    resolve: {
      createOptions: FlavorCreateOptionsResolver,
    },
    data: {
      config: {
        getBreadCrumbDetail: () => {
          return 'Create flavor';
        },
      } as IRouteConfig,
    }
  },
  {
    path: ':id',
    component: FlavorDetailsComponent,
    resolve: {
      flavor: FlavorResolver,
      permissions: FlavorPermissionsResolver,
    },
    data: {
      config: {
        getBreadCrumbDetail: (data) => {
          return data.flavor.name;
        },
      } as IRouteConfig,
    }
  },
  {
    path: ':id/show-to-client-groups',
    component: ShowToClientGroupsComponent,
    resolve: {
      flavor: FlavorResolver,
    },
    data: {
      config: {
        getBreadCrumbDetail: (data) => {
          return `Show flavor ${data.flavor.name} to client groups`;
        },
      } as IRouteConfig,
    }
  },
  {
    path: ':id/edit',
    component: FlavorEditComponent,
    resolve: {
      flavor: FlavorResolver,
      createOptions: FlavorCreateOptionsResolver,
    },
    data: {
      config: {
        getBreadCrumbDetail: (data) => {
          return data.flavor.name;
        },
      } as IRouteConfig,
    }
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FlavorsRoutingModule {
}
