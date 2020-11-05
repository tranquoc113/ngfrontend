import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IRouteConfig } from '@shared/ui-api/interfaces/route-config/route-config';
import { AuthGuard } from '@shared/auth/auth.guard';
import { IBaseFleioObjectModel } from '@fleio-api/base-model/base-fleio-object.model';
import { FleioObjectsList } from '@fleio-api/fleio-objects-list';
import { OrderingDirection } from '@shared/ui-api/interfaces/route-config/ordering-directions';
import { FilterTypes } from '@shared/ui-api/interfaces/route-config/filter-types';
import { SecurityGroupListComponent } from './security-group-list/security-group-list.component';
import { SecurityGroupListResolver } from '@fleio-api/openstack/security-groups/security-group-list.resolver';
import { SecurityGroupCreateComponent } from './security-group-create/security-group-create.component';
import { SecurityGroupDetailsComponent } from './security-group-details/security-group-details.component';
import { SecurityGroupResolver } from '@fleio-api/openstack/security-groups/security-group.resolver';
import { SecurityGroupPermissionsResolver } from '@fleio-api/openstack/security-groups/security-group-permissions.resolver';
import { SecurityGroupCreateOptionsResolver } from '@fleio-api/openstack/security-groups/security-group-create-options.resolver';
import { SecurityGroupEditComponent } from './security-group-edit/security-group-edit.component';
import { SecurityGroupAddRuleComponent } from './security-group-add-rule/security-group-add-rule.component';

const routes: Routes = [
  {
    path: '',
    component: SecurityGroupListComponent,
    resolve: {
      securityGroups: SecurityGroupListResolver,
    },
    canActivate: [AuthGuard],
    data: {
      config: {
        feature: 'openstack.securitygroups',
        search: {
          show: true,
          placeholder: 'Search security groups ...',
        },
        subheader: {
          objectList(data): FleioObjectsList<IBaseFleioObjectModel> {
            return data.securityGroups;
          },
          objectName: 'security group',
          objectNamePlural: 'security groups',
        },
        ordering: {
          default: {
            field: 'created_at',
            display: 'Created at',
            direction: OrderingDirection.Descending
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
            {
              display: 'Region',
              field: 'region',
            }
          ]
        },
        filterConfig: {
          availableOptions: [
            {
              display: 'Created at',
              field: 'created_at',
              type: FilterTypes.Date
            },
            {
              display: 'Updated at',
              field: 'updated_at',
              type: FilterTypes.Date
            },
            {
              display: 'Region',
              field: 'region',
              type: FilterTypes.CustomModel,
              items: 'regions',
              itemsDisplayField: 'id'
            },
          ]
        }
      } as IRouteConfig,
    },
    runGuardsAndResolvers: 'always'
  },
  {
    path: 'create',
    component: SecurityGroupCreateComponent,
    resolve: {
      createOptions: SecurityGroupCreateOptionsResolver
    },
    data: {
      config: {
        getBreadCrumbDetail: () => {
          return 'Create security group';
        },
      } as IRouteConfig,
    }
  },
  {
    path: ':id',
    component: SecurityGroupDetailsComponent,
    resolve: {
      securityGroup: SecurityGroupResolver,
    },
    data: {
      config: {
        getBreadCrumbDetail: (data) => {
          return data.securityGroup.name || data.securityGroup.id;
        },
      } as IRouteConfig,
    }
  },
  {
    path: ':id/add-rule',
    component: SecurityGroupAddRuleComponent,
    resolve: {
      securityGroup: SecurityGroupResolver,
    },
    data: {
      config: {
        getBreadCrumbDetail: (data) => {
          return `Add rule for ${data.securityGroup.name || data.securityGroup.id}`;
        },
      } as IRouteConfig,
    }
  },
  {
    path: ':id/edit',
    component: SecurityGroupEditComponent,
    resolve: {
      securityGroup: SecurityGroupResolver,
      permissions: SecurityGroupPermissionsResolver,
    },
    data: {
      config: {
        getBreadCrumbDetail: (data) => {
          return data.securityGroup.name || data.securityGroup.id;
        },
      } as IRouteConfig,
    }
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SecurityGroupsRoutingModule {
}
