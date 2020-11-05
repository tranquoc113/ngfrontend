import { RouterModule, Routes } from '@angular/router';
import { ServerListComponent } from './server-list/server-list.component';
import { ServerListResolver } from '../../../shared/fleio-api/servers/server-list.resolver';
import { AuthGuard } from '../../../shared/auth/auth.guard';
import { FleioObjectsList } from '../../../shared/fleio-api/fleio-objects-list';
import { IBaseFleioObjectModel } from '../../../shared/fleio-api/base-model/base-fleio-object.model';
import { OrderingDirection } from '../../../shared/ui-api/interfaces/route-config/ordering-directions';
import { IRouteConfig } from '../../../shared/ui-api/interfaces/route-config/route-config';
import { ServerCreateComponent } from './server-create/server-create.component';
import { ServerCreateOptionsResolver } from '../../../shared/fleio-api/servers/server-create-options.resolver';
import { ServerEditComponent } from './server-edit/server-edit.component';
import { ServerResolver } from '../../../shared/fleio-api/servers/server.resolver';
import { NgModule } from '@angular/core';

const routes: Routes = [
  {
    path: '',
    component: ServerListComponent,
    resolve: {
      servers: ServerListResolver,
    },
    canActivate: [AuthGuard],
    data: {
      config: {
        feature: 'servers',
        search: {
          show: true,
          placeholder: 'Search servers ...',
        },
        subheader: {
          objectList(data): FleioObjectsList<IBaseFleioObjectModel> {
            return data.servers;
          },
          objectName: 'server',
          objectNamePlural: 'servers',
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
            {
              display: 'Group',
              field: 'group',
            },
          ]
        },
      } as IRouteConfig,
    },
    runGuardsAndResolvers: 'always'
  },
  {
    path: 'create',
    component: ServerCreateComponent,
    resolve: {
      createOptions: ServerCreateOptionsResolver,
    },
    data: {
      config: {
        getBreadCrumbDetail: () => {
          return 'Create server';
        },
      } as IRouteConfig,
    }
  },
  {
    path: ':id/edit',
    component: ServerEditComponent,
    resolve: {
      server: ServerResolver,
      createOptions: ServerCreateOptionsResolver,
    },
    data: {
      config: {
        getBreadCrumbDetail: (data) => {
          return `Edit server ${data.server.name}`;
        },
      } as IRouteConfig,
    }
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ServersRoutingModule {
}
