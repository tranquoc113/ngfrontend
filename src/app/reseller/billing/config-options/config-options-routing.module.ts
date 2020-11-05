import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IRouteConfig } from '../../../shared/ui-api/interfaces/route-config/route-config';
import { ConfigOptionListComponent } from './config-option-list/config-option-list.component';
import { ConfigOptionCreateComponent } from './config-option-create/config-option-create.component';
import { ConfigOptionDetailsComponent } from './config-option-details/config-option-details.component';
import { ConfigOptionEditComponent } from './config-option-edit/config-option-edit.component';
import { ConfigurableOptionListResolver } from '../../../shared/fleio-api/billing/configurable-options/configurable-option-list.resolver';
import { ConfigurableOptionResolver } from '../../../shared/fleio-api/billing/configurable-options/configurable-option.resolver';

const routes: Routes = [
  {
    path: '',
    component: ConfigOptionListComponent,
    resolve: {
      configOptions: ConfigurableOptionListResolver,
    },
    data: {
      config: {
        search: {
          show: true,
          placeholder: 'Search configurable options ...',
        },
      } as IRouteConfig,
    },
    runGuardsAndResolvers: 'always'
  },
  {
    path: 'create',
    component: ConfigOptionCreateComponent,
    resolve: {
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
    component: ConfigOptionDetailsComponent,
    resolve: {
      configOption: ConfigurableOptionResolver,
    },
    data: {
      config: {
        getBreadCrumbDetail: (data) => {
          return '<implement>';
        },
      } as IRouteConfig,
    }
  },
  {
    path: ':id/edit',
    component: ConfigOptionEditComponent,
    resolve: {},
    data: {
      config: {
        getBreadCrumbDetail: (data) => {
          return '<implement>';
        },
      } as IRouteConfig,
    }
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ConfigOptionsRoutingModule {
}
