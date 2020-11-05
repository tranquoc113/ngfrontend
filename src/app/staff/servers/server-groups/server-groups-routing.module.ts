import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../../../shared/auth/auth.guard';
import { FleioObjectsList } from '../../../shared/fleio-api/fleio-objects-list';
import { IBaseFleioObjectModel } from '../../../shared/fleio-api/base-model/base-fleio-object.model';
import { OrderingDirection } from '../../../shared/ui-api/interfaces/route-config/ordering-directions';
import { IRouteConfig } from '../../../shared/ui-api/interfaces/route-config/route-config';
import { NgModule } from '@angular/core';
import { ServerGroupListComponent } from './server-group-list/server-group-list.component';
import { ServerGroupListResolver } from '../../../shared/fleio-api/servers/server-group-list.resolver';
import { ServerGroupCreateComponent } from './server-group-create/server-group-create.component';
import { ServerGroupEditComponent } from './server-group-edit/server-group-edit.component';
import { ServerGroupResolver } from '../../../shared/fleio-api/servers/server-group.resolver';

const routes: Routes = [
  {
    path: '',
    component: ServerGroupListComponent,
    resolve: {
      serverGroups: ServerGroupListResolver,
    },
    canActivate: [AuthGuard],
    data: {
      config: {
        feature: 'servers',
        search: {
          show: true,
          placeholder: 'Search server groups ...',
        },
        subheader: {
          objectList(data): FleioObjectsList<IBaseFleioObjectModel> {
            return data.serverGroups;
          },
          objectName: 'server group',
          objectNamePlural: 'server groups',
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
    component: ServerGroupCreateComponent,
    resolve: {
    },
    data: {
      config: {
        getBreadCrumbDetail: () => {
          return 'Create server group';
        },
      } as IRouteConfig,
    }
  },
  {
    path: ':id/edit',
    component: ServerGroupEditComponent,
    resolve: {
      serverGroup: ServerGroupResolver,
    },
    data: {
      config: {
        getBreadCrumbDetail: (data) => {
          return `Edit server group ${data.serverGroup.name}`;
        },
      } as IRouteConfig,
    }
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ServerGroupsRoutingModule {
}
