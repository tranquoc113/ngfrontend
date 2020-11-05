import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IRouteConfig } from '@shared/ui-api/interfaces/route-config/route-config';
import { FleioObjectsList } from '@fleio-api/fleio-objects-list';
import { IBaseFleioObjectModel } from '@fleio-api/base-model/base-fleio-object.model';
import { OrderingDirection } from '@shared/ui-api/interfaces/route-config/ordering-directions';
import { AuthGuard } from '@shared/auth/auth.guard';
import { FilterTypes } from '@shared/ui-api/interfaces/route-config/filter-types';
import { VolumeBackupListComponent } from './volume-backup-list/volume-backup-list.component';
import { VolumeBackupDetailsComponent } from './volume-backup-details/volume-backup-details.component';
import { VolumeBackupResolver } from '@fleio-api/openstack/volume/volume-backup.resolver';
import { VolumeBackupListResolver } from '@fleio-api/openstack/volume/volume-backup-list.resolver';
import { VolumeBackupPermissionsResolver } from '@fleio-api/openstack/volume/volume-backup-permissions.resolver';

const routes: Routes = [
  {
    path: '',
    component: VolumeBackupListComponent,
    resolve: {
      volumeBackups: VolumeBackupListResolver,
    },
    canActivate: [AuthGuard],
    data: {
      config: {
        feature: 'openstack.volumes.backups',
        search: {
          show: true,
          placeholder: 'Search volume backups ...',
        },
        subheader: {
          objectNamePlural: 'volume backups',
          objectName: 'volume backup',
          objectList(data): FleioObjectsList<IBaseFleioObjectModel> {
            return data.volumeBackups;
          }
        },
        ordering: {
          default: {
            display: 'Date created',
            field: 'created_at',
            direction: OrderingDirection.Descending,
          },
          options: [
            {display: 'Name', field: 'name'},
            {display: 'Status', field: 'status'},
            {display: 'Size', field: 'size'},
            {display: 'Date created', field: 'created_at'},
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
              display: 'Updated at',
              field: 'updated_at',
              type: FilterTypes.Date
            },
            {
              display: 'Status',
              field: 'status',
              type: FilterTypes.Choices
            },
            {
              display: 'Size',
              field: 'size',
              type: FilterTypes.Decimal
            },
            {
              field: 'region',
              display: 'Region',
              type: FilterTypes.CustomModel,
              items: 'regions',
              itemsDisplayField: 'id'
            },
          ]
        }
      } as IRouteConfig,
    },
    runGuardsAndResolvers: 'always',
  },
  {
    path: ':id',
    component: VolumeBackupDetailsComponent,
    resolve: {
      volumeBackup: VolumeBackupResolver,
      permissions: VolumeBackupPermissionsResolver,
    },
    data: {
      config: {
        getBreadCrumbDetail: (data) => {
          return data.volumeBackup.name;
        },
      } as IRouteConfig,
    },
    runGuardsAndResolvers: 'always',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VolumeBackupsRoutingModule {
}
