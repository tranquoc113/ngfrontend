import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IRouteConfig } from '../../../shared/ui-api/interfaces/route-config/route-config';
import { FleioObjectsList } from '../../../shared/fleio-api/fleio-objects-list';
import { IBaseFleioObjectModel } from '../../../shared/fleio-api/base-model/base-fleio-object.model';
import { ClientListComponent } from './client-list/client-list.component';
import { ClientListResolver } from '../../../shared/fleio-api/client-user/client/client-list.resolver';
import { ClientDetailsComponent } from './client-details/client-details.component';
import { ClientResolver } from '../../../shared/fleio-api/client-user/client/client.resolver';
import { ClientCreateComponent } from './client-create/client-create.component';
import { ClientEditComponent } from './client-edit/client-edit.component';
import { ClientCreateOptionsResolver } from '../../../shared/fleio-api/client-user/client/client-create-options.resolver';
import { FilterTypes } from '../../../shared/ui-api/interfaces/route-config/filter-types';
import { OrderingDirection } from '../../../shared/ui-api/interfaces/route-config/ordering-directions';
import { AuthGuard } from '../../../shared/auth/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: ClientListComponent,
    resolve: {
      clients: ClientListResolver
    },
    canActivate: [AuthGuard],
    data: {
      config: {
        feature: 'clients&users.clients',
        search: {
          show: true,
          placeholder: 'Search clients ...',
        },
        subheader: {
          objectName: 'client',
          objectNamePlural: 'clients',
          objectList(data): FleioObjectsList<IBaseFleioObjectModel> {
            return data.clients;
          }
        },
        ordering: {
          default: {
            field: 'date_created',
            direction: OrderingDirection.Descending,
            display: 'Date created',
          },
          options: [
            {display: 'Company', field: 'company'},
            {display: 'Country', field: 'country'},
            {display: 'State', field: 'state'},
            {display: 'Date created', field: 'date_created'},
            {display: 'Up to date credit', field: 'uptodate_credit'},
            {display: 'Configuration name', field: 'configuration_name'},
            {display: 'Group name', field: 'group_name'},
          ]
        },
        filterConfig: {
          availableOptions: [
            {
              field: 'date_created',
              display: 'Date created',
              type: FilterTypes.Date
            },
            {
              display: 'Configuration',
              field: 'configuration',
              type: FilterTypes.CustomModel,
              items: 'configurations',
              itemsDisplayField: 'name',
            },
            {
              field: 'status',
              display: 'Status',
              type: FilterTypes.Choices
            },
            {
              display: 'Tax exempt',
              field: 'tax_exempt',
              type: FilterTypes.Boolean
            },
            // {
            //   display: 'Client group',
            //   field: 'groups',
            //   type: FilterTypes.CustomModel,
            //   items: 'clientgroups',
            //   itemsDisplayField: 'name',
            // },
            {
              display: 'Has instances in region',
              field: 'services__openstack_project__instance__region',
              type: FilterTypes.CustomModel,
              items: 'regions',
              itemsDisplayField: 'id'
            },
            {
              display: 'Has instances with flavor',
              field: 'services__openstack_project__instance__flavor',
              type: FilterTypes.CustomModel,
              items: 'flavors',
              itemsDisplayField: 'display_name'
            },
            {
              display: 'Has instances on hypervisor',
              field: 'services__openstack_project__instance__host_name',
              type: FilterTypes.WildCard,
            },
            {
              field: 'has_billing_agreement',
              display: 'Has billing agreement',
              type: FilterTypes.Boolean
            },
            {
              field: 'has_services',
              display: 'Has services',
              type: FilterTypes.Boolean
            },
            {
              field: 'has_instances',
              display: 'Has instances',
              type: FilterTypes.Boolean
            }
          ]
        },
      } as IRouteConfig,
    },
    runGuardsAndResolvers: 'always'
  },
  {
    path: 'create',
    component: ClientCreateComponent,
    resolve: {
      createOptions: ClientCreateOptionsResolver
    },
    data: {
      config: {
        getBreadCrumbDetail: () => {
          return 'Create client';
        },
      } as IRouteConfig,
    }
  },
  {
    path: ':id',
    component: ClientDetailsComponent,
    resolve: {
      client: ClientResolver,
    },
    data: {
      config: {
        getBreadCrumbDetail: (data) => {
          return data.client.name;
        },
      } as IRouteConfig,
    },
    runGuardsAndResolvers: 'always',
  },
  {
    path: ':id/edit',
    component: ClientEditComponent,
    resolve: {
      client: ClientResolver,
      createOptions: ClientCreateOptionsResolver
    },
    data: {
      config: {
        getBreadCrumbDetail: (data) => {
          return `Edit ${data.client.name}`;
        },
      } as IRouteConfig,
    }
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClientsRoutingModule {
}
