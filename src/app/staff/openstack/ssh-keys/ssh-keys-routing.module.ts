import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IRouteConfig } from '@shared/ui-api/interfaces/route-config/route-config';
import { SshKeyListComponent } from './ssh-key-list/ssh-key-list.component';
import { SshKeyCreateComponent } from './ssh-key-create/ssh-key-create.component';
import { SshKeyEditComponent } from './ssh-key-edit/ssh-key-edit.component';
import { PublicKeyListResolver } from '@fleio-api/public-key/public-key-list.resolver';
import { PublicKeyResolver } from '@fleio-api/public-key/public-key.resolver';
import { PublicKeyPermissionsResolver } from '@fleio-api/public-key/public-key-permissions.resolver';
import { AuthGuard } from '@shared/auth/auth.guard';
import { IBaseFleioObjectModel } from '@fleio-api/base-model/base-fleio-object.model';
import { FleioObjectsList } from '@fleio-api/fleio-objects-list';
import { OrderingDirection } from '@shared/ui-api/interfaces/route-config/ordering-directions';
import { FilterTypes } from '@shared/ui-api/interfaces/route-config/filter-types';

const routes: Routes = [
  {
    path: '',
    component: SshKeyListComponent,
    resolve: {
      sshKeys: PublicKeyListResolver,
    },
    canActivate: [AuthGuard],
    data: {
      config: {
        feature: 'openstack.sshkeys',
        search: {
          show: true,
          placeholder: 'Search ssh keys ...',
        },
        subheader: {
          objectList(data): FleioObjectsList<IBaseFleioObjectModel> {
            return data.sshKey;
          },
          objectName: 'ssh key',
          objectNamePlural: 'ssh keys',
        },
        ordering: {
          default: {
            field: 'created_at',
            display: 'Created at',
            direction: OrderingDirection.Descending
          },
          options: [
            {
              display: 'Name',
              field: 'name',
            },
            {
              display: 'Date created',
              field: 'created_at',
            }
          ]
        },
        filterConfig: {
          availableOptions: [
            {
              display: 'Created at',
              field: 'created_at',
              type: FilterTypes.Date
            },
            {
              display: 'User',
              field: 'user',
              type: FilterTypes.CustomModel,
              items: 'users',
              itemsDisplayField: 'username'
            }
          ]
        }
      } as IRouteConfig,
    },
    runGuardsAndResolvers: 'always'
  },
  {
    path: 'create',
    component: SshKeyCreateComponent,
    resolve: {},
    data: {
      config: {
        getBreadCrumbDetail: () => {
          return 'Create ssh key';
        },
      } as IRouteConfig,
    }
  },
  {
    path: ':id',
    component: SshKeyEditComponent,
    resolve: {
      sshKey: PublicKeyResolver,
      permissions: PublicKeyPermissionsResolver,
    },
    data: {
      config: {
        getBreadCrumbDetail: (data) => {
          return data.sshKey.name;
        },
      } as IRouteConfig,
    }
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SshKeysRoutingModule {
}
