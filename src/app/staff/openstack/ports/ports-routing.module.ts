import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '@shared/auth/auth.guard';
import { FleioObjectsList } from '@fleio-api/fleio-objects-list';
import { IBaseFleioObjectModel } from '@fleio-api/base-model/base-fleio-object.model';
import { OrderingDirection } from '@shared/ui-api/interfaces/route-config/ordering-directions';
import { IRouteConfig } from '@shared/ui-api/interfaces/route-config/route-config';
import { NgModule } from '@angular/core';
import { FilterTypes } from '@shared/ui-api/interfaces/route-config/filter-types';
import { PortListComponent } from './port-list/port-list.component';
import { PortListResolver } from '@fleio-api/openstack/port/port-list.resolver';
import { PortCreateComponent } from './port-create/port-create.component';
import { PortDetailsComponent } from './port-details/port-details.component';
import { PortResolver } from '@fleio-api/openstack/port/port.resolver';
import { PortEditComponent } from './port-edit/port-edit.component';
import { PortCreateOptionsResolver } from '@fleio-api/openstack/port/port-create-options.resolver';

const routes: Routes = [
  {
    path: '',
    component: PortListComponent,
    resolve: {
      ports: PortListResolver,
    },
    canActivate: [AuthGuard],
    data: {
      config: {
        feature: 'openstack.ports',
        search: {
          show: true,
          placeholder: 'Search ports ...',
        },
        subheader: {
          objectList(data): FleioObjectsList<IBaseFleioObjectModel> {
            return data.ports;
          },
          objectName: 'port',
          objectNamePlural: 'ports',
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
              display: 'Network',
              field: 'network',
            },
            {
              display: 'Created at',
              field: 'created_at',
            },
            {
              display: 'Status',
              field: 'status',
            },
          ]
        },
        filterConfig: {
          availableOptions:[
            {
              display: 'Created at',
              field: 'created_at',
              type: FilterTypes.Date,
            },
            {
              display: 'Client',
              field: 'client',
              type: FilterTypes.CustomModel
            },
            {
              field: 'network',
              display: 'Network',
              type: FilterTypes.CustomModel,
              items: 'networks',
              itemsDisplayField: 'name',
            },
            {
              display: 'Status',
              field: 'status',
              type: FilterTypes.Choices
            },
            {
              display: 'Admin state up',
              field: 'admin_state_up',
              type: FilterTypes.Boolean,
            },
            {
              display: 'Port security update',
              field: 'port_security_enabled',
              type: FilterTypes.Boolean,
            },
          ]
        }
      } as IRouteConfig,
    },
    runGuardsAndResolvers: 'always'
  },
  {
    path: 'create',
    component: PortCreateComponent,
    resolve: {
      createOptions: PortCreateOptionsResolver,
    },
    data: {
      config: {
        getBreadCrumbDetail: () => {
          return 'Create port';
        },
      } as IRouteConfig,
    }
  },
  {
    path: ':id',
    component: PortDetailsComponent,
    resolve: {
      port: PortResolver,
    },
    data: {
      config: {
        getBreadCrumbDetail: (data) => {
          return `Port ${data.port.name || data.port.id}`;
        },
      } as IRouteConfig,
    }
  },
  {
    path: ':id/edit',
    component: PortEditComponent,
    resolve: {
      port: PortResolver,
      createOptions: PortCreateOptionsResolver,
    },
    data: {
      config: {
        getBreadCrumbDetail: (data) => {
          return `Edit port ${data.port.name || data.port.id}`;
        },
      } as IRouteConfig,
    }
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PortsRoutingModule {
}
