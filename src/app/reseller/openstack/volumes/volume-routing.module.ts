import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IRouteConfig } from '@shared/ui-api/interfaces/route-config/route-config';
import { VolumeListComponent } from './volume-list/volume-list.component';
import { VolumeCreateComponent } from './volume-create/volume-create.component';
import { VolumeDetailsComponent } from './volume-details/volume-details.component';
import { VolumeResolver } from '@fleio-api/openstack/volume/volume.resolver';
import { VolumePermissionsResolver } from '@fleio-api/openstack/volume/volume-permissions.resolver';
import { VolumeListResolver } from '@fleio-api/openstack/volume/volume-list.resolver';
import { VolumeCreateOptionsResolver } from '@fleio-api/openstack/volume/volume-create-options.resolver';
import { FleioObjectsList } from '@fleio-api/fleio-objects-list';
import { IBaseFleioObjectModel } from '@fleio-api/base-model/base-fleio-object.model';
import { OrderingDirection } from '@shared/ui-api/interfaces/route-config/ordering-directions';
import { AuthGuard } from '@shared/auth/auth.guard';
import { FilterTypes } from '@shared/ui-api/interfaces/route-config/filter-types';

const routes: Routes = [
  {
    path: '',
    component: VolumeListComponent,
    resolve: {
      volumes: VolumeListResolver,
    },
    canActivate: [AuthGuard],
    data: {
      config: {
        feature: 'openstack.volumes',
        search: {
          show: true,
          placeholder: 'Search volumes ...',
        },
        subheader: {
          objectNamePlural: 'volumes',
          objectName: 'volume',
          objectList(data): FleioObjectsList<IBaseFleioObjectModel> {
            return data.volumes;
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
              display: 'Region',
              field: 'region',
              type: FilterTypes.CustomModel,
              items: 'regions',
              itemsDisplayField: 'id'
            }
          ]
        }
      } as IRouteConfig,
    },
    runGuardsAndResolvers: 'always'
  },
  {
    path: 'create',
    component: VolumeCreateComponent,
    resolve: {
      createOptions: VolumeCreateOptionsResolver,
    },
    data: {
      config: {
        getBreadCrumbDetail: () => {
          return 'Create volume';
        },
      } as IRouteConfig,
    }
  },
  {
    path: ':id',
    component: VolumeDetailsComponent,
    resolve: {
      volume: VolumeResolver,
      permissions: VolumePermissionsResolver,
    },
    data: {
      config: {
        getBreadCrumbDetail: (data) => {
          return data.volume.name;
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
export class VolumesRoutingModule {
}
