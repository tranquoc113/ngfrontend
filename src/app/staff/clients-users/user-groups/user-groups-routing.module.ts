import { RouterModule, Routes } from '@angular/router';
import { UserGroupListComponent } from './user-group-list/user-group-list.component';
import { UserGroupListResolver } from '@fleio-api/client-user/user-group/user-group-list.resolver';
import { AuthGuard } from '@shared/auth/auth.guard';
import { FleioObjectsList } from '@fleio-api/fleio-objects-list';
import { IBaseFleioObjectModel } from '@fleio-api/base-model/base-fleio-object.model';
import { OrderingDirection } from '@shared/ui-api/interfaces/route-config/ordering-directions';
import { IRouteConfig } from '@shared/ui-api/interfaces/route-config/route-config';
import { UserGroupCreateComponent } from './user-group-create/user-group-create.component';
import { UserGroupResolver } from '@fleio-api/client-user/user-group/user-group.resolver';
import { UserGroupEditComponent } from './user-group-edit/user-group-edit.component';
import { NgModule } from '@angular/core';
import { UserGroupDetailsComponent } from './user-group-details/user-group-details.component';

const routes: Routes = [
  {
    path: '',
    component: UserGroupListComponent,
    resolve: {
      userGroups: UserGroupListResolver,
    },
    canActivate: [AuthGuard],
    data: {
      config: {
        feature: 'clients&users.usergroups',
        search: {
          show: true,
          placeholder: 'Search user groups ...',
        },
        subheader: {
          objectList(data): FleioObjectsList<IBaseFleioObjectModel> {
            return data.userGroups;
          },
          objectName: 'user group',
          objectNamePlural: 'user groups',
        },
        ordering: {
          default: {
            display: 'Name',
            field: 'name',
            direction: OrderingDirection.Ascending,
          },
          options: [
            {
              display: 'Name',
              field: 'name',
            },
          ]
        },
      } as IRouteConfig,
    },
    runGuardsAndResolvers: 'always'
  },
  {
    path: 'create',
    component: UserGroupCreateComponent,
    resolve: {},
    data: {
      config: {
        getBreadCrumbDetail: () => {
          return 'Create user group';
        },
      } as IRouteConfig,
    }
  },
  {
    path: ':id/edit',
    component: UserGroupEditComponent,
    resolve: {
      userGroup: UserGroupResolver,
    },
    data: {
      config: {
        getBreadCrumbDetail: (data) => {
          return `Edit user group ${data.userGroup.name}`;
        },
      } as IRouteConfig,
    }
  },
  {
    path: ':id',
    component: UserGroupDetailsComponent,
    resolve: {
      userGroup: UserGroupResolver,
    },
    data: {
      config: {
        getBreadCrumbDetail: (data) => {
          return `User group ${data.userGroup.name}`;
        },
      } as IRouteConfig,
    }
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserGroupsRoutingModule {
}
