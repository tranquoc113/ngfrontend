import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IRouteConfig } from '@shared/ui-api/interfaces/route-config/route-config';
import { ImageCreateComponent } from './image-create/image-create.component';
import { ImageEditComponent } from './image-edit/image-edit.component';
import { ImageDetailsComponent } from './image-details/image-details.component';
import { ImageListComponent } from './image-list/image-list.component';
import { ImageListResolver } from '@fleio-api/openstack/image/image-list.resolver';
import { ImageResolver } from '@fleio-api/openstack/image/image.resolver';
import { ImagePermissionsResolver } from '@fleio-api/openstack/image/image-permissions.resolver';
import { ImageCreateOptionsResolver } from '@fleio-api/openstack/image/image-create-options.resolver';
import { IBaseFleioObjectModel } from '@fleio-api/base-model/base-fleio-object.model';
import { FleioObjectsList } from '@fleio-api/fleio-objects-list';
import { OrderingDirection } from '@shared/ui-api/interfaces/route-config/ordering-directions';
import { AuthGuard } from '@shared/auth/auth.guard';
import { FilterTypes } from '@shared/ui-api/interfaces/route-config/filter-types';

const routes: Routes = [
  {
    path: '',
    component: ImageListComponent,
    resolve: {
      images: ImageListResolver,
    },
    canActivate: [AuthGuard],
    data: {
      config: {
        feature: 'openstack.images',
        search: {
          show: true,
          placeholder: 'Search images ...',
        },
        subheader: {
          objectList(data): FleioObjectsList<IBaseFleioObjectModel> {
            return data.images;
          },
          objectName: 'image',
          objectNamePlural: 'images'
        },
        ordering: {
          default: {
            display: 'Created at',
            field: 'created_at',
            direction: OrderingDirection.Descending,
          },
          options: [
            {display: 'Name', field: 'name'},
            {display: 'Status', field: 'status'},
            {display: 'Type', field: 'type'},
            {display: 'Created at', field: 'created_at'},
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
              display: 'Clients',
              field: 'project__service__client',
              type: FilterTypes.CustomModel,
              items: 'clients',
              itemsDisplayField: 'name'
            },
            {
              display: 'Updated at',
              field: 'updated_at',
              type: FilterTypes.Date
            },
            {
              display: 'Region',
              field: 'region',
              type: FilterTypes.CustomModel,
              items: 'regions',
              itemsDisplayField: 'id'
            },
            {
              display: 'Status',
              field: 'status',
              type: FilterTypes.Choices
            },
            {
              display: 'Hypervisor type',
              field: 'hypervisor_type',
              type: FilterTypes.Choices
            },
            {
              display: 'Visibility',
              field: 'visibility',
              type: FilterTypes.Choices,
            },
            {
              display: 'Protected',
              field: 'protected',
              type: FilterTypes.Boolean
            },
            {
              display: 'Min disk',
              field: 'min_disk',
              type: FilterTypes.Decimal
            },
            {
              display: 'Min ram',
              field: 'min_ram',
              type: FilterTypes.Decimal
            }
          ]
        }
      } as IRouteConfig,
    },
    runGuardsAndResolvers: 'always'
  },
  {
    path: 'create',
    component: ImageCreateComponent,
    resolve: {
      createOptions: ImageCreateOptionsResolver,
    },
    data: {
      config: {
        getBreadCrumbDetail: () => {
          return 'Create image';
        },
      } as IRouteConfig,
    }
  },
  {
    path: ':id',
    component: ImageDetailsComponent,
    resolve: {
      image: ImageResolver,
      permissions: ImagePermissionsResolver,
    },
    data: {
      config: {
        getBreadCrumbDetail: (data) => {
          return data.image.name || data.image.id;
        },
      } as IRouteConfig,
    }
  },
  {
    path: ':id/edit',
    component: ImageEditComponent,
    resolve: {
      image: ImageResolver,
      createOptions: ImageCreateOptionsResolver,
    },
    data: {
      config: {
        getBreadCrumbDetail: (data) => {
          return data.image.name || data.image.id;
        },
      } as IRouteConfig,
    }
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ImagesRoutingModule {
}
