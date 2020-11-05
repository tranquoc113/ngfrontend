import { RouterModule, Routes } from '@angular/router';
import { RegistrarListComponent } from './registrar-list/registrar-list.component';
import { DomainRegistrarListResolver } from '../../../../shared/fleio-api/plugins/domains/domain-registrar-list.resolver';
import { AuthGuard } from '../../../../shared/auth/auth.guard';
import { FleioObjectsList } from '../../../../shared/fleio-api/fleio-objects-list';
import { IBaseFleioObjectModel } from '../../../../shared/fleio-api/base-model/base-fleio-object.model';
import { OrderingDirection } from '../../../../shared/ui-api/interfaces/route-config/ordering-directions';
import { IRouteConfig } from '../../../../shared/ui-api/interfaces/route-config/route-config';
import { RegistrarCreateComponent } from './registrar-create/registrar-create.component';
import { DomainRegistrarResolver } from '../../../../shared/fleio-api/plugins/domains/domain-registrar.resolver';
import { RegistrarDetailsComponent } from './registrar-details/registrar-details.component';
import { RegistrarEditComponent } from './registrar-edit/registrar-edit.component';
import { NgModule } from '@angular/core';

const routes: Routes = [
  {
    path: '',
    component: RegistrarListComponent,
    resolve: {
      registrars: DomainRegistrarListResolver,
    },
    canActivate: [AuthGuard],
    data: {
      config: {
        feature: 'plugins.domains',
        search: {
          show: true,
          placeholder: 'Search registrars ...',
        },
        subheader: {
          objectList(data): FleioObjectsList<IBaseFleioObjectModel> {
            return data.todos;
          },
          objectName: 'domain registrar',
          objectNamePlural: 'domain registrars',
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
              display: 'Name',
              field: 'name',
            },
          ]
        },
      } as IRouteConfig,
    },
    runGuardsAndResolvers: 'always'
  },
  {
    path: 'create',
    component: RegistrarCreateComponent,
    resolve: {
    },
    data: {
      config: {
        getBreadCrumbDetail: () => {
          return 'Create registrar';
        },
      } as IRouteConfig,
    }
  },
  {
    path: ':id',
    component: RegistrarDetailsComponent,
    resolve: {
      registrar: DomainRegistrarResolver,
    },
    data: {
      config: {
        getBreadCrumbDetail: (data) => {
          return data.registrar.name;
        },
      } as IRouteConfig,
    },
    runGuardsAndResolvers: 'always',
  },
  {
    path: ':id/edit',
    component: RegistrarEditComponent,
    resolve: {
      registrar: DomainRegistrarResolver,
    },
    data: {
      config: {
        getBreadCrumbDetail: (data) => {
          return `Edit registrar ${data.registrar.display_name}`;
        },
      } as IRouteConfig,
    }
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RegistrarsRoutingModule {
}
