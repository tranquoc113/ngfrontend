import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../../../shared/auth/auth.guard';
import { FleioObjectsList } from '../../../shared/fleio-api/fleio-objects-list';
import { IBaseFleioObjectModel } from '../../../shared/fleio-api/base-model/base-fleio-object.model';
import { IRouteConfig } from '../../../shared/ui-api/interfaces/route-config/route-config';
import { DomainListComponent } from './domain-list/domain-list.component';
import { DomainListResolver } from '../../../shared/fleio-api/plugins/domains/domain-list.resolver';
import { DomainEditComponent } from './domain-edit/domain-edit.component';
import { DomainResolver } from '../../../shared/fleio-api/plugins/domains/domain.resolver';
import { DomainCreateOptionsResolver } from '../../../shared/fleio-api/plugins/domains/domain-create-options.resolver';
import { FilterTypes } from '../../../shared/ui-api/interfaces/route-config/filter-types';
import { DomainRegisterComponent } from './domain-register/domain-register.component';
import { DomainTransferComponent } from './domain-transfer/domain-transfer.component';
import { OrderingDirection } from '../../../shared/ui-api/interfaces/route-config/ordering-directions';
import { DomainDetailsComponent } from './domain-details/domain-details.component';
import { DomainContactCreateOptionsResolver } from '../../../shared/fleio-api/plugins/domains/domain-contact-create-options.resolver';
import { ClientCreateOptionsResolver } from '../../../shared/fleio-api/client-user/client/client-create-options.resolver';

const routes: Routes = [
  {
    path: '',
    component: DomainListComponent,
    resolve: {
      domains: DomainListResolver,
    },
    canActivate: [AuthGuard],
    data: {
      config: {
        feature: 'plugins.domains',
        search: {
          show: true,
          placeholder: 'Search domains ...',
        },
        subheader: {
          objectList(data): FleioObjectsList<IBaseFleioObjectModel> {
            return data.domains;
          },
          objectName: 'domain',
          objectNamePlural: 'domains',
        },
        ordering: {
          default: {
            display: 'Created at',
            field: 'created_at',
            direction: OrderingDirection.Descending,
          },
          options: [
            {
              display: 'Created at',
              field: 'created_at',
            },
            {
              display: 'Status',
              field: 'status',
            },
            {
              display: 'Name',
              field: 'name',
            },
          ]
        },
        filterConfig: {
          availableOptions: [
            {
              field: 'created_at',
              display: 'Created at',
              type: FilterTypes.Date,
            },
            {
              field: 'registration_date',
              display: 'Registration date',
              type: FilterTypes.Date,
            },
            {
              field: 'expiry_date',
              display: 'Expiry date',
              type: FilterTypes.Date,
            },
            {
              field: 'registration_period',
              display: 'Registration period',
              type: FilterTypes.Decimal,
            },
            {
              field: 'status',
              display: 'Status',
              type: FilterTypes.Choices
            },
            {
              display: 'Top level domain',
              field: 'tld',
              type: FilterTypes.CustomModel,
              items: 'tlds',
              itemsDisplayField: 'name'
            },
          ],
        }
      } as IRouteConfig,
    },
    runGuardsAndResolvers: 'always'
  },
  {
    path: 'register-domain',
    component: DomainRegisterComponent,
    resolve: {
      contactCreateOptions: DomainContactCreateOptionsResolver,
      clientCreateOptions: ClientCreateOptionsResolver,
    },
    data: {
      config: {
        getBreadCrumbDetail: () => {
          return `Register domain`;
        },
      } as IRouteConfig,
    }
  },
  {
    path: 'transfer-domain',
    component: DomainTransferComponent,
    resolve: {},
    data: {
      config: {
        getBreadCrumbDetail: () => {
          return `Transfer domain`;
        },
      } as IRouteConfig,
    }
  },
  {
    path: 'contacts',
    loadChildren: () => import('./contacts/contacts.module').then(mod => mod.ContactsModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'tlds',
    loadChildren: () => import('./tlds/tlds.module').then(mod => mod.TldsModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'registrars',
    loadChildren: () => import('./registrars/registrars.module').then(mod => mod.RegistrarsModule),
    canActivate: [AuthGuard],
  },
  {
    path: ':id',
    component: DomainDetailsComponent,
    resolve: {
      domain: DomainResolver,
      createOptions: DomainCreateOptionsResolver,
    },
    data: {
      config: {
        getBreadCrumbDetail: (data) => {
          return `Domain ${data.domain.name}`;
        },
      } as IRouteConfig,
    }
  },
  {
    path: ':id/edit',
    component: DomainEditComponent,
    resolve: {
      domain: DomainResolver,
      createOptions: DomainCreateOptionsResolver,
    },
    data: {
      config: {
        getBreadCrumbDetail: (data) => {
          return `Edit domain ${data.domain.name}`;
        },
      } as IRouteConfig,
    }
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DomainsRoutingModule {
}
