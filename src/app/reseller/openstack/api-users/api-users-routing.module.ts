import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IRouteConfig } from '@shared/ui-api/interfaces/route-config/route-config';
import { ApiUserListComponent } from './api-user-list/api-user-list.component';
import { ApiUserCreateComponent } from './api-user-create/api-user-create.component';
import { ApiUserDetailsComponent } from './api-user-details/api-user-details.component';
import { ApiUserEditComponent } from './api-user-edit/api-user-edit.component';
import { FleioObjectsList } from '@fleio-api/fleio-objects-list';
import { IBaseFleioObjectModel } from '@fleio-api/base-model/base-fleio-object.model';
import { ApiUserListResolver } from '@fleio-api/openstack/api-user/api-user-list.resolver';
import { ApiUserCreateOptionsResolver } from '@fleio-api/openstack/api-user/api-user-create-options.resolver';
import { ApiUserResolver } from '@fleio-api/openstack/api-user/api-user.resolver';
import { AuthGuard } from '@shared/auth/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: ApiUserListComponent,
    resolve: {
      apiUsers: ApiUserListResolver
    },
    canActivate: [AuthGuard],
    data: {
      config: {
        feature: 'openstack.apiusers',
        search: {
          show: false,
          placeholder: 'Search api users ...',
        },
        subheader: {
          objectName: 'api user',
          objectNamePlural: 'api users',
          objectList(data): FleioObjectsList<IBaseFleioObjectModel> {
            return data.apiUsers;
          }
        },
      } as IRouteConfig,
    },
    runGuardsAndResolvers: 'always'
  },
  {
    path: 'create',
    component: ApiUserCreateComponent,
    resolve: {
      createOptions: ApiUserCreateOptionsResolver
    },
    data: {
      config: {
        getBreadCrumbDetail: () => {
          return 'Create api user';
        },
      } as IRouteConfig,
    }
  },
  {
    path: ':id',
    component: ApiUserDetailsComponent,
    resolve: {
      apiUser: ApiUserResolver,
    },
    data: {
      config: {
        getBreadCrumbDetail: (data) => {
          return `${data.apiUser.name}`;
        },
      } as IRouteConfig,
    }
  },
  {
    path: ':id/edit',
    component: ApiUserEditComponent,
    resolve: {
      apiUser: ApiUserResolver,
    },
    data: {
      config: {
        getBreadCrumbDetail: (data) => {
          return `Edit ${data.apiUser.name}`;
        },
      } as IRouteConfig,
    }
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ApiUsersRoutingModule {
}
