import { RouterModule, Routes } from '@angular/router';
import { RouterListComponent } from './router-list/router-list.component';
import { RouterListResolver } from '@fleio-api/openstack/routers/router-list.resolver';
import { AuthGuard } from '@shared/auth/auth.guard';
import { FleioObjectsList } from '@fleio-api/fleio-objects-list';
import { IBaseFleioObjectModel } from '@fleio-api/base-model/base-fleio-object.model';
import { FilterTypes } from '@shared/ui-api/interfaces/route-config/filter-types';
import { IRouteConfig } from '@shared/ui-api/interfaces/route-config/route-config';
import { RouterCreateComponent } from './router-create/router-create.component';
import { RouterCreateOptionsResolver } from '@fleio-api/openstack/routers/router-create-options.resolver';
import { RouterDetailsComponent } from './router-details/router-details.component';
import { RouterResolver } from '@fleio-api/openstack/routers/router.resolver';
import { RouterPermissionsResolver } from '@fleio-api/openstack/routers/router-permissions.resolver';
import { RouterEditComponent } from './router-edit/router-edit.component';
import { NgModule } from '@angular/core';
import { RouterAddInterfaceComponent } from './router-add-interface/router-add-interface.component';
import { OrderingDirection } from '@shared/ui-api/interfaces/route-config/ordering-directions';
import { RouterAddInterfaceCreateOptionsResolver } from '@fleio-api/openstack/routers/router-add-interface-create-options.resolver';

const routes: Routes = [
  {
    path: '',
    component: RouterListComponent,
    resolve: {
      routers: RouterListResolver,
    },
    canActivate: [AuthGuard],
    data: {
      config: {
        feature: 'openstack.routers',
        search: {
          show: true,
          placeholder: 'Search routers ...',
        },
        subheader: {
          objectNamePlural: 'routers',
          objectName: 'router',
          objectList(data): FleioObjectsList<IBaseFleioObjectModel> {
            return data.routers;
          }
        },
        ordering: {
          default: {
            display: 'Name',
            field: 'name',
            direction: OrderingDirection.Ascending,
          },
          options: [
            {
              field: 'name',
              display: 'Name',
            },
            {
              field: 'admin_state_up',
              display: 'Admin state',
            },
            {
              field: 'region',
              display: 'Region',
            },
          ]
        },
        filterConfig: {
          availableOptions: [
            {
              display: 'Status',
              field: 'status',
              type: FilterTypes.Choices,
            },
            {
              display: 'Admin state up',
              field: 'admin_state_up',
              type: FilterTypes.Boolean
            },
            {
              field: 'region',
              display: 'Region',
              type: FilterTypes.CustomModel,
              items: 'regions',
              itemsDisplayField: 'id'
            },
            {
              display: 'Distributed',
              field: 'distributed',
              type: FilterTypes.Boolean
            },
            {
              display: 'Enable snat',
              field: 'enable_snat',
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
    component: RouterCreateComponent,
    resolve: {
      createOptions: RouterCreateOptionsResolver,
    },
    data: {
      config: {
        getBreadCrumbDetail: () => {
          return 'Create router';
        },
      } as IRouteConfig,
    }
  },
  {
    path: ':id',
    component: RouterDetailsComponent,
    resolve: {
      router: RouterResolver,
      permissions: RouterPermissionsResolver,
    },
    data: {
      config: {
        getBreadCrumbDetail: (data) => {
          return data.router.name;
        },
      } as IRouteConfig,
    },
    runGuardsAndResolvers: 'always',
  },
  {
    path: ':id/edit',
    component: RouterEditComponent,
    resolve: {
      router: RouterResolver,
      createOptions: RouterCreateOptionsResolver,
    },
    data: {
      config: {
        getBreadCrumbDetail: (data) => {
          return `Edit router ${data.router.name}`;
        },
      } as IRouteConfig,
    }
  },
  {
    path: ':id/add-interface',
    component: RouterAddInterfaceComponent,
    resolve: {
      router: RouterResolver,
      createOptions: RouterAddInterfaceCreateOptionsResolver,
    },
    data: {
      config: {
        getBreadCrumbDetail: (data) => {
          return `Add interface to ${data.router.name}`;
        },
      } as IRouteConfig,
    }
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RoutersRoutingModule {
}
