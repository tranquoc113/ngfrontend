import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '@shared/auth/auth.guard';
import { OrderingDirection } from '@shared/ui-api/interfaces/route-config/ordering-directions';
import { FleioObjectsList } from '@fleio-api/fleio-objects-list';
import { IBaseFleioObjectModel } from '@fleio-api/base-model/base-fleio-object.model';
import { IRouteConfig } from '@shared/ui-api/interfaces/route-config/route-config';
import { TicketsListComponent } from './tickets-list/tickets-list.component';
import { TicketsListResolver } from '@fleio-api/plugins/tickets/tickets-list.resolver';
import { TicketsOpenNewComponent } from './tickets-open-new/tickets-open-new.component';
import { TicketsCreateOptionsResolver } from '@fleio-api/plugins/tickets/tickets-create-options.resolver';
import { TicketDetailsComponent } from './ticket-details/ticket-details.component';
import { TicketResolver } from '@fleio-api/plugins/tickets/ticket.resolver';
import { TicketCreateOptionsResolver } from '@fleio-api/plugins/tickets/ticket-create-options.resolver';
import { FilterTypes } from '@shared/ui-api/interfaces/route-config/filter-types';
import { TicketEditComponent } from './ticket-edit/ticket-edit.component';
import { UserSignaturesComponent } from './user-signatures/user-signatures.component';
import { TicketUserSignaturesResolver } from '@fleio-api/plugins/tickets/ticket-user-signatures.resolver';

const routes: Routes = [
  {
    path: '',
    component: TicketsListComponent,
    resolve: {
      tickets: TicketsListResolver,
    },
    canActivate: [AuthGuard],
    data: {
      config: {
        feature: 'plugins.tickets',
        search: {
          show: true,
          placeholder: 'Search tickets ...',
        },
        ordering: {
          default: {
            field: 'last_reply_at',
            display: 'Last reply',
            direction: OrderingDirection.Descending
          },
          options: [
            {
              field: 'last_reply_at',
              display: 'Last reply'
            },
            {
              field: 'assigned_to',
              display: 'Assigned to'
            },
            {
              field: 'created_at',
              display: 'Created at'
            },
            {
              field: 'created_by',
              display: 'Created by'
            },
            {
              field: 'internal_status',
              display: 'Internal status'
            },
            {
              field: 'status',
              display: 'Status'
            },
            {
              field: 'title',
              display: 'Title'
            },
            {
              field: 'department',
              display: 'Department'
            },
            {
              field: 'priority',
              display: 'Priority'
            },
          ],
        },
        subheader: {
          objectName: 'ticket',
          objectNamePlural: 'tickets',
          objectList(data): FleioObjectsList<IBaseFleioObjectModel> {
            return data.tickets;
          }
        },
        getBreadCrumbDetail: () => {
          return 'Tickets';
        },
        filterConfig: {
          availableOptions: [
            {
              display: 'Assigned to',
              field: 'assigned_to',
              type: FilterTypes.CustomModel,
              items: 'users',
              itemsDisplayField: 'username',
              itemsFilter: {
                is_staff: 'True'
              }
            },
            {
              display: 'Created at',
              field: 'created_at',
              type: FilterTypes.Date
            },
            {
              display: 'Internal status',
              field: 'internal_status',
              type: FilterTypes.Choices
            },
            {
              display: 'Status',
              field: 'status',
              type: FilterTypes.Choices
            },
            {
              display: 'Priority',
              field: 'priority',
              type: FilterTypes.Choices
            },
            {
              display: 'Client',
              field: 'client',
              type: FilterTypes.CustomModel,
              items: 'clients',
              itemsDisplayField: 'name',
            },
            {
              display: 'Department',
              field: 'department',
              type: FilterTypes.CustomModel,
              items: 'departments',
              itemsDisplayField: 'name',
            }
          ],
          defaultFilters: [
            {
              field: 'internal_status__ne',
              value: 'done'
            }
          ]
        },
      } as IRouteConfig,
    },
    runGuardsAndResolvers: 'always'
  },
  {
    path: 'open-new-ticket',
    component: TicketsOpenNewComponent,
    resolve: {
      createOptions: TicketsCreateOptionsResolver,
    },
    data: {
      config: {
        getBreadCrumbDetail: () => {
          return 'Open a new ticket';
        },
      } as IRouteConfig,
    },
  },
  {
    path: 'open-new-ticket/:forclient',
    component: TicketsOpenNewComponent,
    resolve: {
      createOptions: TicketsCreateOptionsResolver,
    },
    data: {
      config: {
        getBreadCrumbDetail: () => {
          return 'Open a new ticket';
        },
      } as IRouteConfig,
    },
  },
  {
    path: 'departments',
    loadChildren: () => import('./departments/departments-routing.module').then(mod => mod.DepartmentsRoutingModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'user-signatures',
    component: UserSignaturesComponent,
    resolve: {
      signatures: TicketUserSignaturesResolver,
    },
    data: {
      config: {
        getBreadCrumbDetail: () => {
          return `Edit signatures`;
        },
      } as IRouteConfig,
    },
    runGuardsAndResolvers: 'always'
  },
  {
    path: ':id',
    component: TicketDetailsComponent,
    resolve: {
      ticket: TicketResolver,
      createOptions: TicketCreateOptionsResolver,
    },
    data: {
      config: {
        getBreadCrumbDetail: (data) => {
          return `#${data.ticket.id}`;
        },
      } as IRouteConfig,
    },
    runGuardsAndResolvers: 'always'
  },
  {
    path: ':id/edit',
    component: TicketEditComponent,
    resolve: {
      ticket: TicketResolver,
      createOptions: TicketCreateOptionsResolver,
    },
    data: {
      config: {
        getBreadCrumbDetail: () => {
          return `Edit ticket`;
        },
      } as IRouteConfig,
    },
    runGuardsAndResolvers: 'always'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TicketsRoutingModule {
}
