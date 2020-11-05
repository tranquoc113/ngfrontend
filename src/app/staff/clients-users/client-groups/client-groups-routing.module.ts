import { RouterModule, Routes } from '@angular/router';
import { ClientGroupListComponent } from './client-group-list/client-group-list.component';
import { ClientGroupListResolver } from '@fleio-api/client-user/client-group/client-group-list.resolver';
import { AuthGuard } from '@shared/auth/auth.guard';
import { FleioObjectsList } from '@fleio-api/fleio-objects-list';
import { IBaseFleioObjectModel } from '@fleio-api/base-model/base-fleio-object.model';
import { OrderingDirection } from '@shared/ui-api/interfaces/route-config/ordering-directions';
import { IRouteConfig } from '@shared/ui-api/interfaces/route-config/route-config';
import { ClientGroupCreateComponent } from './client-group-create/client-group-create.component';
import { ClientGroupResolver } from '@fleio-api/client-user/client-group/client-group.resolver';
import { ClientGroupEditComponent } from './client-group-edit/client-group-edit.component';
import { NgModule } from '@angular/core';
import { ClientGroupDetailsComponent } from './client-group-details/client-group-details.component';

const routes: Routes = [
  {
    path: '',
    component: ClientGroupListComponent,
    resolve: {
      clientGroups: ClientGroupListResolver,
    },
    canActivate: [AuthGuard],
    data: {
      config: {
        feature: 'clients&users.clientgroups',
        search: {
          show: true,
          placeholder: 'Search client groups ...',
        },
        subheader: {
          objectList(data): FleioObjectsList<IBaseFleioObjectModel> {
            return data.clientGroups;
          },
          objectName: 'client group',
          objectNamePlural: 'client groups',
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
    component: ClientGroupCreateComponent,
    resolve: {},
    data: {
      config: {
        getBreadCrumbDetail: () => {
          return 'Create client group';
        },
      } as IRouteConfig,
    }
  },
  {
    path: ':id/edit',
    component: ClientGroupEditComponent,
    resolve: {
      clientGroup: ClientGroupResolver,
    },
    data: {
      config: {
        getBreadCrumbDetail: (data) => {
          return `Edit client group ${data.clientGroup.name}`;
        },
      } as IRouteConfig,
    }
  },
  {
    path: ':id',
    component: ClientGroupDetailsComponent,
    resolve: {
      clientGroup: ClientGroupResolver,
    },
    data: {
      config: {
        getBreadCrumbDetail: (data) => {
          return `Client group ${data.clientGroup.name}`;
        },
      } as IRouteConfig,
    }
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClientGroupsRoutingModule {
}
