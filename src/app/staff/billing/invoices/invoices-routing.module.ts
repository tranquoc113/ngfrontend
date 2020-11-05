import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IRouteConfig } from '@shared/ui-api/interfaces/route-config/route-config';
import { InvoiceListComponent } from './invoice-list/invoice-list.component';
import { InvoiceDetailsComponent } from './invoice-details/invoice-details.component';
import { InvoiceListResolver } from '@fleio-api/billing/invoices/invoice-list.resolver';
import { InvoiceResolver } from '@fleio-api/billing/invoices/invoice.resolver';
import { OrderingDirection } from '@shared/ui-api/interfaces/route-config/ordering-directions';
import { FilterTypes } from '@shared/ui-api/interfaces/route-config/filter-types';
import { FleioObjectsList } from '@fleio-api/fleio-objects-list';
import { IBaseFleioObjectModel } from '@fleio-api/base-model/base-fleio-object.model';
import { InvoiceCreateComponent } from './invoice-create/invoice-create.component';
import { InvoiceEditComponent } from './invoice-edit/invoice-edit.component';
import { InvoiceCreateOptionsResolver } from '@fleio-api/billing/invoices/invoice-create-options.resolver';
import { InvoiceEditOptionsResolver } from '@fleio-api/billing/invoices/invoice-edit-options.resolver';
import { InvoicePaymentOptionsResolver } from '@fleio-api/billing/invoices/invoice-payment-options.resolver';
import { AuthGuard } from '@shared/auth/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: InvoiceListComponent,
    resolve: {
      invoices: InvoiceListResolver
    },
    canActivate: [AuthGuard],
    data: {
      config: {
        feature: 'billing.invoices',
        search: {
          show: true,
          placeholder: 'Search invoices ...',
        },
        ordering: {
          default: {
            field: 'issue_date',
            display: 'Issue date',
            direction: OrderingDirection.Descending
          },
          options: [
            {
              field: 'status',
              display: 'Status'
            },
            {
              field: 'issue_date',
              display: 'Issue date'
            },
            {
              field: 'due_date',
              display: 'Due date'
            },
            {
              field: 'client',
              display: 'Client'
            }
          ],
        },
        filterConfig: {
          availableOptions: [
            {
              field: 'issue_date',
              display: 'Issue date',
              type: FilterTypes.Date
            },
            {
              field: 'due_date',
              display: 'Due date',
              type: FilterTypes.Date
            },
            {
              display: 'Status',
              field: 'status',
              type: FilterTypes.Choices,
            },
            {
              field: 'total',
              display: 'Total',
              type: FilterTypes.Decimal
            },
            {
              display: 'Client',
              field: 'client',
              type: FilterTypes.CustomModel,
              items: 'clients',
              itemsDisplayField: 'name'
            },
          ]
        },
        subheader: {
          objectName: 'invoice',
          objectNamePlural: 'invoices',
          objectList(data): FleioObjectsList<IBaseFleioObjectModel> {
            return data.invoices;
          }
        },
      } as IRouteConfig,
    },
    runGuardsAndResolvers: 'always'
  },
  {
    path: 'create',
    component: InvoiceCreateComponent,
    resolve: {
      createOptions: InvoiceCreateOptionsResolver,
    },
    data: {
      config: {
        getBreadCrumbDetail: (data) => {
          return 'Create new invoice';
        },
      } as IRouteConfig,
    }
  },
  {
    path: ':id',
    component: InvoiceDetailsComponent,
    resolve: {
      invoice: InvoiceResolver,
      paymentOptions: InvoicePaymentOptionsResolver,
    },
    data: {
      config: {
        getBreadCrumbDetail: (data) => {
          return data.invoice.display_number;
        },
      } as IRouteConfig,
    },
    runGuardsAndResolvers: 'always',
  },
  {
    path: ':id/edit',
    component: InvoiceEditComponent,
    resolve: {
      invoice: InvoiceResolver,
      createOptions: InvoiceEditOptionsResolver,
    },
    data: {
      config: {
        getBreadCrumbDetail: (data) => {
          return data.invoice.display_number;
        },
      } as IRouteConfig,
    }
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InvoicesRoutingModule {
}
