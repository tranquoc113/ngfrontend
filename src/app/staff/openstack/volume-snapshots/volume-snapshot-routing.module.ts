import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IRouteConfig } from '@shared/ui-api/interfaces/route-config/route-config';
import { FleioObjectsList } from '@fleio-api/fleio-objects-list';
import { IBaseFleioObjectModel } from '@fleio-api/base-model/base-fleio-object.model';
import { OrderingDirection } from '@shared/ui-api/interfaces/route-config/ordering-directions';
import { AuthGuard } from '@shared/auth/auth.guard';
import { FilterTypes } from '@shared/ui-api/interfaces/route-config/filter-types';
import { VolumeSnapshotListResolver } from '@fleio-api/openstack/volume/volume-snapshot-list.resolver';
import { VolumeSnapshotListComponent } from './volume-snapshot-list/volume-snapshot-list.component';
import { VolumeSnapshotDetailsComponent } from './volume-snapshot-details/volume-snapshot-details.component';
import { VolumeSnapshotResolver } from '@fleio-api/openstack/volume/volume-snapshot.resolver';
import { VolumeSnapshotPermissionsResolver } from '@fleio-api/openstack/volume/volume-snapshot-permissions.resolver';

const routes: Routes = [
  {
    path: '',
    component: VolumeSnapshotListComponent,
    resolve: {
      volumeSnapshots: VolumeSnapshotListResolver,
    },
    canActivate: [AuthGuard],
    data: {
      config: {
        feature: 'openstack.volumes.snapshots',
        search: {
          show: true,
          placeholder: 'Search volume snapshots ...',
        },
        subheader: {
          objectNamePlural: 'volume snapshots',
          objectName: 'volume snapshot',
          objectList(data): FleioObjectsList<IBaseFleioObjectModel> {
            return data.volumeSnapshots;
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
              display: 'Related volume',
              field: 'volume',
              type: FilterTypes.CustomModel,
              items: 'volumes',
              itemsDisplayField: 'name'
            },
            {
              display: 'Size',
              field: 'size',
              type: FilterTypes.Decimal
            },
          ]
        }
      } as IRouteConfig,
    },
    runGuardsAndResolvers: 'always',
  },
  {
    path: ':id',
    component: VolumeSnapshotDetailsComponent,
    resolve: {
      volumeSnapshot: VolumeSnapshotResolver,
      permissions: VolumeSnapshotPermissionsResolver,
    },
    data: {
      config: {
        getBreadCrumbDetail: (data) => {
          return data.volumeSnapshot.name;
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
export class VolumeSnapshotsRoutingModule {
}
