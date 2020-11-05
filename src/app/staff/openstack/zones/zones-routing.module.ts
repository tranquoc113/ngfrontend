import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IRouteConfig } from '@shared/ui-api/interfaces/route-config/route-config';
import { IBaseFleioObjectModel } from '@fleio-api/base-model/base-fleio-object.model';
import { FleioObjectsList } from '@fleio-api/fleio-objects-list';
import { OrderingDirection } from '@shared/ui-api/interfaces/route-config/ordering-directions';
import { AuthGuard } from '@shared/auth/auth.guard';
import { FilterTypes } from '@shared/ui-api/interfaces/route-config/filter-types';
import { ZoneListResolver } from '@fleio-api/openstack/zone/zone-list.resolver';
import { ZoneListComponent } from './zone-list/zone-list.component';
import { ZoneCreateComponent } from './zone-create/zone-create.component';
import { ZoneCreateOptionsResolver } from '@fleio-api/openstack/zone/zone-create-options.resolver';
import { ZoneDetailsComponent } from './zone-details/zone-details.component';
import { ZoneResolver } from '@fleio-api/openstack/zone/zone.resolver';
import { ZoneEditComponent } from './zone-edit/zone-edit.component';
import { ZoneRecordListResolver } from '@fleio-api/openstack/zone/zone-record-list.resolver';
import { ZonePermissionsResolver } from '@fleio-api/openstack/zone/zone-permissions.resolver';

const routes: Routes = [
  {
    path: '',
    component: ZoneListComponent,
    resolve: {
      zones: ZoneListResolver,
    },
    canActivate: [AuthGuard],
    data: {
      config: {
        feature: 'openstack.dns.zones',
        search: {
          show: true,
          placeholder: 'Search zones ...',
        },
        subheader: {
          objectList(data): FleioObjectsList<IBaseFleioObjectModel> {
            return data.zones;
          },
          objectName: 'zone',
          objectNamePlural: 'zones'
        },
        ordering: {
          default: {
            display: 'Created at',
            field: 'created_at',
            direction: OrderingDirection.Descending,
          },
          options: [
            {display: 'Name', field: 'name'},
            {display: 'Serial number', field: 'serial'},
            {display: 'Status', field: 'status'},
            {display: 'Created at', field: 'created_at'},
            {display: 'Updated at', field: 'updated_at'},
          ]
        },
        filterConfig: {
          availableOptions: [
            {
              display: 'Clients',
              field: 'client',
              type: FilterTypes.CustomModel,
              items: 'clients',
              itemsDisplayField: 'name'
            },
          ]
        }
      } as IRouteConfig,
    },
    runGuardsAndResolvers: 'always'
  },
  {
    path: 'create',
    component: ZoneCreateComponent,
    resolve: {
      createOptions: ZoneCreateOptionsResolver,
    },
    data: {
      config: {
        getBreadCrumbDetail: () => {
          return 'Create zone';
        },
      } as IRouteConfig,
    }
  },
  {
    path: ':id',
    component: ZoneDetailsComponent,
    resolve: {
      zone: ZoneResolver,
      records: ZoneRecordListResolver,
      permissions: ZonePermissionsResolver,
    },
    data: {
      config: {
        getBreadCrumbDetail: (data) => {
          return data.zone.name;
        },
      } as IRouteConfig,
    }
  },
  {
    path: ':id/edit',
    component: ZoneEditComponent,
    resolve: {
      zone: ZoneResolver,
      createOptions: ZoneCreateOptionsResolver,
    },
    data: {
      config: {
        getBreadCrumbDetail: (data) => {
          return data.zone.name;
        },
      } as IRouteConfig,
    },
    runGuardsAndResolvers: 'always'
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ZonesRoutingModule {
}
