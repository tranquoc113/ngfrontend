import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IRouteConfig } from '../../../shared/ui-api/interfaces/route-config/route-config';
import { FleioObjectsList } from '../../../shared/fleio-api/fleio-objects-list';
import { IBaseFleioObjectModel } from '../../../shared/fleio-api/base-model/base-fleio-object.model';
import { UserListResolver } from '../../../shared/fleio-api/client-user/user/user-list.resolver';
import { UserListComponent } from './user-list/user-list.component';
import { UserCreateComponent } from './user-create/user-create.component';
import { UserDetailsComponent } from './user-details/user-details.component';
import { UserResolver } from '../../../shared/fleio-api/client-user/user/user.resolver';
import { UserEditComponent } from './user-edit/user-edit.component';
import { UserImpersonateComponent } from './user-impersonate/user-impersonate.component';
import { AuthGuard } from '../../../shared/auth/auth.guard';
import { OrderingDirection } from '../../../shared/ui-api/interfaces/route-config/ordering-directions';
import { FilterTypes } from '../../../shared/ui-api/interfaces/route-config/filter-types';

const routes: Routes = [
  {
    path: '',
    component: UserListComponent,
    resolve: {
      users: UserListResolver
    },
    canActivate: [AuthGuard],
    data: {
      config: {
        feature: 'clients&users.users',
        search: {
          show: true,
          placeholder: 'Search users ...',
        },
        subheader: {
          objectName: 'user',
          objectNamePlural: 'users',
          objectList(data): FleioObjectsList<IBaseFleioObjectModel> {
            return data.users;
          }
        },
        ordering: {
          default: {
            display: 'Sign-up date',
            field: 'date_joined',
            direction: OrderingDirection.Descending,
          },
          options: [
            {
              display: 'Last login',
              field: 'last_login',
            },
            {
              display: 'Sign-up date',
              field: 'date_joined',
            },
            {
              display: 'Username',
              field: 'username',
            },
            {
              display: 'Email',
              field: 'email',
            },
          ]
        },
        filterConfig: {
          availableOptions: [
            {
              display: 'Date joined',
              field: 'date_joined',
              type: FilterTypes.Date
            },
            {
              display: 'Last login',
              field: 'last_login',
              type: FilterTypes.Date
            },
            {
              display: 'Is active',
              field: 'is_active',
              type: FilterTypes.Boolean
            },
            // {
            //   display: 'user group',
            //   field: 'user_groups',
            //   type: FilterTypes.CustomModel,
            //   items: 'usergroups',
            //   itemsDisplayField: 'name'
            // }
          ]
        }
      } as IRouteConfig,
    },
    runGuardsAndResolvers: 'always'
  },
  {
    path: 'create',
    component: UserCreateComponent,
    resolve: {},
    data: {
      config: {
        getBreadCrumbDetail: (data) => {
          return 'Create user';
        },
      } as IRouteConfig,
    }
  },
  {
    path: ':id',
    component: UserDetailsComponent,
    resolve: {
      user: UserResolver,
    },
    data: {
      config: {
        getBreadCrumbDetail: (data) => {
          return data.user.username;
        },
      } as IRouteConfig,
    }
  },
  {
    path: ':id/edit',
    component: UserEditComponent,
    resolve: {
      user: UserResolver,
    },
    data: {
      config: {
        getBreadCrumbDetail: (data) => {
          return `Edit ${data.user.username}`;
        },
      } as IRouteConfig,
    }
  },
  {
    path: ':id/impersonate',
    component: UserImpersonateComponent,
    resolve: {
      user: UserResolver,
    },
    data: {
      config: {
        getBreadCrumbDetail: (data) => {
          return `Impersonating ${data.user.username}`;
        },
      } as IRouteConfig,
    }
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UsersRoutingModule {
}
