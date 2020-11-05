import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IRouteConfig } from '@shared/ui-api/interfaces/route-config/route-config';
import { ConfigurationListComponent } from './configuration-list/configuration-list.component';
import { ConfigurationListResolver } from '@fleio-api/configurations/configuration-list.resolver';
import { ConfigurationCreateComponent } from './configuration-create/configuration-create.component';
import { ConfigurationDetailsComponent } from './configuration-details/configuration-details.component';
import { ConfigurationResolver } from '@fleio-api/configurations/configuration.resolver';
import { ConfigurationBillingResolver } from '@fleio-api/configurations/configuration-billing.resolver';
import { ConfigurationEditComponent } from './configuration-edit/configuration-edit.component';
import { AuthGuard } from '@shared/auth/auth.guard';
import { IBaseFleioObjectModel } from '@fleio-api/base-model/base-fleio-object.model';
import { FleioObjectsList } from '@fleio-api/fleio-objects-list';
import { OrderingDirection } from '@shared/ui-api/interfaces/route-config/ordering-directions';
import { ConfigurationOpenstackResolver } from '@fleio-api/configurations/configuration-openstack.resolver';
import { ConfigurationDomainsResolver } from '@fleio-api/configurations/configuration-domains.resolver';

const routes: Routes = [
  {
    path: '',
    component: ConfigurationListComponent,
    resolve: {
      configurations: ConfigurationListResolver,
    },
    canActivate: [AuthGuard],
    data: {
      config: {
        feature: 'settings.configurations',
        search: {
          show: true,
          placeholder: 'Search configurations ...',
        },
        subheader: {
          objectList(data): FleioObjectsList<IBaseFleioObjectModel> {
            return data.configurations;
          },
          objectName: 'configuration',
          objectNamePlural: 'configurations',
        },
        ordering: {
          default: {
            display: 'Name',
            field: 'name',
            direction: OrderingDirection.Ascending,
          },
          options: [
            {
              display: 'Name',
              field: 'name',
            }
          ]
        }
      } as IRouteConfig,
    },
    runGuardsAndResolvers: 'always'
  },
  {
    path: 'create',
    component: ConfigurationCreateComponent,
    resolve: {},
    data: {
      config: {
        getBreadCrumbDetail: () => {
          return 'Create configuration';
        },
      } as IRouteConfig,
    }
  },
  {
    path: ':id',
    component: ConfigurationDetailsComponent,
    resolve: {
      configuration: ConfigurationResolver,
      billingConfiguration: ConfigurationBillingResolver,
      openstackConfiguration: ConfigurationOpenstackResolver,
      domainsConfiguration: ConfigurationDomainsResolver,
    },
    data: {
      config: {
        getBreadCrumbDetail: (data) => {
          return data.configuration.name;
        },
      } as IRouteConfig,
    }
  },
  {
    path: ':id/edit',
    component: ConfigurationEditComponent,
    resolve: {
      configuration: ConfigurationResolver,
    },
    data: {
      config: {
        getBreadCrumbDetail: (data) => {
          return `Edit configuration ${data.configuration.name}`;
        },
      } as IRouteConfig,
    }
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ConfigurationsRoutingModule {
}
