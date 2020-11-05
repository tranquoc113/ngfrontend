import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IRouteConfig } from '../../../shared/ui-api/interfaces/route-config/route-config';
import { FleioObjectsList } from '../../../shared/fleio-api/fleio-objects-list';
import { IBaseFleioObjectModel } from '../../../shared/fleio-api/base-model/base-fleio-object.model';
import { ClientGroupListResolver } from '../../../shared/fleio-api/client-user/client-group/client-group-list.resolver';
import { ClientGroupDetailsComponent } from './client-group-details/client-group-details.component';
import { ClientGroupResolver } from '../../../shared/fleio-api/client-user/client-group/client-group.resolver';
import { ClientGroupListComponent } from './client-group-list/client-group-list.component';
import { ClientGroupCreateComponent } from './client-group-create/client-group-create.component';
import { ClientGroupEditComponent } from './client-group-edit/client-group-edit.component';
import { AuthGuard } from '../../../shared/auth/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: ClientGroupListComponent,
    resolve: {
      clientGroups: ClientGroupListResolver
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
          objectName: 'client group',
          objectNamePlural: 'client groups',
          objectList(data): FleioObjectsList<IBaseFleioObjectModel> {
            return data.clients;
          }
        },
      } as IRouteConfig,
    },
    runGuardsAndResolvers: 'always'
  },
  {
    path: 'create',
    component: ClientGroupCreateComponent,
    resolve: {
      // clientGroup: ClientGroupResolver,
    },
    data: {
      config: {
        getBreadCrumbDetail: (data) => {
          return 'Create new group';
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
          return `Group ${data.clientGroup.name}`;
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
          return `Edit group ${data.clientGroup.name}`;
        },
      } as IRouteConfig,
    }
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClientGroupsRoutingModule { }
