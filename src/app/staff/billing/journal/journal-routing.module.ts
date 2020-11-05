import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IRouteConfig } from '../../../shared/ui-api/interfaces/route-config/route-config';
import { FleioObjectsList } from '../../../shared/fleio-api/fleio-objects-list';
import { IBaseFleioObjectModel } from '../../../shared/fleio-api/base-model/base-fleio-object.model';
import { OrderingDirection } from '../../../shared/ui-api/interfaces/route-config/ordering-directions';
import { AuthGuard } from '../../../shared/auth/auth.guard';
import { FilterTypes } from '../../../shared/ui-api/interfaces/route-config/filter-types';
import { JournalListComponent } from './journal-list/journal-list.component';
import { JournalListResolver } from '../../../shared/fleio-api/billing/journal/journal-list.resolver';
import { JournalDetailsComponent } from './journal-details/journal-details.component';
import { JournalResolver } from '../../../shared/fleio-api/billing/journal/journal.resolver';

const routes: Routes = [
  {
    path: '',
    component: JournalListComponent,
    resolve: {
      journalEntries: JournalListResolver,
    },
    canActivate: [AuthGuard],
    data: {
      config: {
        feature: 'billing.journal',
        search: {
          show: true,
          placeholder: 'Search journal entries ...',
        },
        subheader: {
          objectNamePlural: 'journal entries',
          objectName: 'journal entry',
          objectList(data): FleioObjectsList<IBaseFleioObjectModel> {
            return data.journalEntries;
          }
        },
        ordering: {
          default: {
            field: 'id',
            display: 'Id',
            direction: OrderingDirection.Descending,
          },
          options: [
            {display: 'Id', field: 'id'},
            {display: 'Invoice', field: 'invoice'},
            {display: 'Transaction', field: 'transaction'},
            {display: 'Transaction Status', field: 'transaction__status'},
            {display: 'Source', field: 'source'},
            {display: 'Destination', field: 'destination'},
            {display: 'Source amount', field: 'source_amount'},
            {display: 'Destination amount', field: 'destination_amount'},
          ]
        },
        filterConfig: {
          availableOptions: [
            {
              display: 'User',
              field: 'user_id',
              type: FilterTypes.CustomModel,
              items: 'users',
              itemsDisplayField: 'username'
            },
            {
              display: 'Source',
              field: 'source',
              type: FilterTypes.Choices
            },
            {
              display: 'Destination',
              field: 'destination',
              type: FilterTypes.Choices
            },
            {
              display: 'Credit related client',
              field: 'client_credit__client',
              type: FilterTypes.CustomModel,
              items: 'clients',
              itemsDisplayField: 'name'
            },
            {
              display: 'Invoice related client',
              field: 'invoice__client',
              type: FilterTypes.CustomModel,
              items: 'clients',
              itemsDisplayField: 'name'
            },
            {
              display: 'Date added',
              field: 'date_added',
              type: FilterTypes.Date
            },
            {
              display: 'Destination amount',
              field: 'destination_amount',
              type: FilterTypes.Decimal
            },
            {
              display: 'Source amount',
              field: 'source_amount',
              type: FilterTypes.Decimal
            },
          ]
        }
      } as IRouteConfig,
    },
    runGuardsAndResolvers: 'always'
  },
  {
    path: ':id',
    component: JournalDetailsComponent,
    resolve: {
      journalEntry: JournalResolver,
      // permissions: JournalPermissionsResolver,
    },
    data: {
      config: {
        getBreadCrumbDetail: (data) => {
          return 'Detail';
        },
      } as IRouteConfig,
    }
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class JournalRoutingModule {
}
