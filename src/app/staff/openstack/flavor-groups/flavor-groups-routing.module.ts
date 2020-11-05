import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '@shared/auth/auth.guard';
import { FleioObjectsList } from '@fleio-api/fleio-objects-list';
import { IBaseFleioObjectModel } from '@fleio-api/base-model/base-fleio-object.model';
import { FilterTypes } from '@shared/ui-api/interfaces/route-config/filter-types';
import { IRouteConfig } from '@shared/ui-api/interfaces/route-config/route-config';
import { NgModule } from '@angular/core';
import { OrderingDirection } from '@shared/ui-api/interfaces/route-config/ordering-directions';
import { FlavorGroupListComponent } from './flavor-group-list/flavor-group-list.component';
import { FlavorGroupListResolver } from '@fleio-api/openstack/flavor-group/flavor-group-list.resolver';
import { FlavorGroupCreateComponent } from './flavor-group-create/flavor-group-create.component';
import { FlavorGroupDetailsComponent } from './flavor-group-details/flavor-group-details.component';
import { FlavorGroupResolver } from '@fleio-api/openstack/flavor-group/flavor-group.resolver';
import { FlavorGroupEditComponent } from './flavor-group-edit/flavor-group-edit.component';

const routes: Routes = [
  {
    path: '',
    component: FlavorGroupListComponent,
    resolve: {
      flavorGroups: FlavorGroupListResolver,
    },
    canActivate: [AuthGuard],
    data: {
      config: {
        feature: 'openstack.flavor-groups',
        search: {
          show: true,
          placeholder: 'Search flavor groups ...',
        },
        subheader: {
          objectNamePlural: 'flavor groups',
          objectName: 'flavor group',
          objectList(data): FleioObjectsList<IBaseFleioObjectModel> {
            return data.flavorGroups;
          }
        },
        ordering: {
          default: {
            display: 'Created at',
            field: 'created_at',
            direction: OrderingDirection.Descending,
          },
          options: [
            {
              display: 'Id',
              field: 'id',
            },
            {
              display: 'Name',
              field: 'name',
            },
            {
              display: 'Created at',
              field: 'created_at',
            },
            {
              display: 'Priority',
              field: 'priority',
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
          ]
        }
      } as IRouteConfig,
    },
    runGuardsAndResolvers: 'always',
  },
  {
    path: 'create',
    component: FlavorGroupCreateComponent,
    resolve: {},
    data: {
      config: {
        getBreadCrumbDetail: () => {
          return 'Create flavor group';
        },
      } as IRouteConfig,
    }
  },
  {
    path: ':id',
    component: FlavorGroupDetailsComponent,
    resolve: {
      flavorGroup: FlavorGroupResolver,
    },
    data: {
      config: {
        getBreadCrumbDetail: (data) => {
          return data.flavorGroup.name;
        },
      } as IRouteConfig,
    },
    runGuardsAndResolvers: 'always',
  },
  {
    path: ':id/edit',
    component: FlavorGroupEditComponent,
    resolve: {
      flavorGroup: FlavorGroupResolver,
    },
    data: {
      config: {
        getBreadCrumbDetail: (data) => {
          return `Edit flavor group ${data.flavorGroup.name}`;
        },
      } as IRouteConfig,
    }
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FlavorGroupsRoutingModule {
}
