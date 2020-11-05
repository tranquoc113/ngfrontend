import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContactListComponent } from './contact-list/contact-list.component';
import { DomainContactListResolver } from '../../../../shared/fleio-api/plugins/domains/domain-contact-list.resolver';
import { AuthGuard } from '../../../../shared/auth/auth.guard';
import { FleioObjectsList } from '../../../../shared/fleio-api/fleio-objects-list';
import { IBaseFleioObjectModel } from '../../../../shared/fleio-api/base-model/base-fleio-object.model';
import { OrderingDirection } from '../../../../shared/ui-api/interfaces/route-config/ordering-directions';
import { FilterTypes } from '../../../../shared/ui-api/interfaces/route-config/filter-types';
import { IRouteConfig } from '../../../../shared/ui-api/interfaces/route-config/route-config';
import { ContactCreateComponent } from './contact-create/contact-create.component';
import { DomainContactCreateOptionsResolver } from '../../../../shared/fleio-api/plugins/domains/domain-contact-create-options.resolver';
import { ContactDetailsComponent } from './contact-details/contact-details.component';
import { DomainContactResolver } from '../../../../shared/fleio-api/plugins/domains/domain-contact.resolver';
import { ContactEditComponent } from './contact-edit/contact-edit.component';

const routes: Routes = [
  {
    path: '',
    component: ContactListComponent,
    resolve: {
      domainContacts: DomainContactListResolver,
    },
    canActivate: [AuthGuard],
    data: {
      config: {
        feature: 'plugins.domains',
        search: {
          show: true,
          placeholder: 'Search contacts ...',
        },
        subheader: {
          objectList(data): FleioObjectsList<IBaseFleioObjectModel> {
            return data.domainContacts;
          },
          objectName: 'domain contact',
          objectNamePlural: 'domain contacts',
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
              display: 'First name',
              field: 'first_name',
            },
            {
              display: 'Last name',
              field: 'last_name',
            },
            {
              display: 'ID',
              field: 'id',
            },
            {
              display: 'Email',
              field: 'email',
            },
            {
              display: 'Company',
              field: 'company',
            },
            {
              display: 'City',
              field: 'city',
            },
            {
              display: 'Country',
              field: 'city',
            },
            {
              display: 'State',
              field: 'city',
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
          ],
        }
      } as IRouteConfig,
    },
    runGuardsAndResolvers: 'always'
  },
  {
    path: 'create',
    component: ContactCreateComponent,
    resolve: {
      createOptions: DomainContactCreateOptionsResolver,
    },
    data: {
      config: {
        getBreadCrumbDetail: () => {
          return 'Create domain contact';
        },
      } as IRouteConfig,
    }
  },
  {
    path: ':id',
    component: ContactDetailsComponent,
    resolve: {
      domainContact: DomainContactResolver,
    },
    data: {
      config: {
        getBreadCrumbDetail: (data) => {
          return data.domainContact.name;
        },
      } as IRouteConfig,
    },
    runGuardsAndResolvers: 'always',
  },
  {
    path: ':id/edit',
    component: ContactEditComponent,
    resolve: {
      domainContact: DomainContactResolver,
      createOptions: DomainContactCreateOptionsResolver,
    },
    data: {
      config: {
        getBreadCrumbDetail: (data) => {
          return `Edit domain contact ${data.domainContact.name}`;
        },
      } as IRouteConfig,
    }
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ContactsRoutingModule {
}
