import { RouterModule, Routes } from '@angular/router';
import { ConfigurableOptionListComponent } from './configurable-option-list/configurable-option-list.component';
import { ConfigurableOptionListResolver } from '@fleio-api/billing/configurable-options/configurable-option-list.resolver';
import { AuthGuard } from '@shared/auth/auth.guard';
import { FleioObjectsList } from '@fleio-api/fleio-objects-list';
import { IBaseFleioObjectModel } from '@fleio-api/base-model/base-fleio-object.model';
import { OrderingDirection } from '@shared/ui-api/interfaces/route-config/ordering-directions';
import { IRouteConfig } from '@shared/ui-api/interfaces/route-config/route-config';
import { ConfigurableOptionCreateComponent } from './configurable-option-create/configurable-option-create.component';
import { ConfigurableOptionCreateOptionsResolver } from '@fleio-api/billing/configurable-options/configurable-option-create-options.resolver';
import { ConfigurableOptionResolver } from '@fleio-api/billing/configurable-options/configurable-option.resolver';
import { ConfigurableOptionEditComponent } from './configurable-option-edit/configurable-option-edit.component';
import { NgModule } from '@angular/core';

const routes: Routes = [
  {
    path: '',
    component: ConfigurableOptionListComponent,
    resolve: {
      configurableOptions: ConfigurableOptionListResolver,
    },
    canActivate: [AuthGuard],
    data: {
      config: {
        feature: 'billing',
        search: {
          show: true,
          placeholder: 'Search configurable options ...',
        },
        subheader: {
          objectList(data): FleioObjectsList<IBaseFleioObjectModel> {
            return data.configurableOptions;
          },
          objectName: 'configurable option',
          objectNamePlural: 'configurable options',
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
          ]
        },
      } as IRouteConfig,
    },
    runGuardsAndResolvers: 'always',
  },
  {
    path: 'create',
    component: ConfigurableOptionCreateComponent,
    resolve: {
      createOptions: ConfigurableOptionCreateOptionsResolver,
    },
    data: {
      config: {
        getBreadCrumbDetail: () => {
          return 'Create configurable option';
        },
      } as IRouteConfig,
    }
  },
  {
    path: ':id',
    component: ConfigurableOptionEditComponent,
    resolve: {
      configurableOption: ConfigurableOptionResolver,
      createOptions: ConfigurableOptionCreateOptionsResolver,
    },
    data: {
      config: {
        getBreadCrumbDetail: (data) => {
          return `Edit configurable option ${data.configurableOption.name}`;
        },
      } as IRouteConfig,
    },
    runGuardsAndResolvers: 'always',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ConfigurableOptionsRoutingModule {
}
