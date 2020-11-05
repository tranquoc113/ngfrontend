import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InstanceListComponent } from './instance-list/instance-list.component';
import { InstanceListResolver } from '../../../shared/fleio-api/openstack/instance/instance-list.resolver';
import { InstanceDetailsComponent } from './instance-details/instance-details.component';
import { InstanceResolver } from '../../../shared/fleio-api/openstack/instance/instance.resolver';
import { InstancePermissionsResolver } from '../../../shared/fleio-api/openstack/instance/instance-permissions.resolver';
import { InstanceRescueComponent } from './instance-rescue/instance-rescue.component';
import { IRouteConfig } from '../../../shared/ui-api/interfaces/route-config/route-config';
import { OrderingDirection } from '../../../shared/ui-api/interfaces/route-config/ordering-directions';
import { FleioObjectsList } from '../../../shared/fleio-api/fleio-objects-list';
import { IBaseFleioObjectModel } from '../../../shared/fleio-api/base-model/base-fleio-object.model';
import { FilterTypes } from '../../../shared/ui-api/interfaces/route-config/filter-types';
import { InstanceCreateComponent } from './instance-create/instance-create.component';
import { InstanceCreateOptionsResolver } from '../../../shared/fleio-api/openstack/instance/instance-create-options.resolver';
import { InstanceResizeOptionsResolver } from '../../../shared/fleio-api/openstack/instance/instance-resize-options.resolver';
import { InstanceResizeComponent } from './instance-resize/instance-resize.component';
import { InstanceRescueOptionsResolver } from '../../../shared/fleio-api/openstack/instance/instance-rescue-options.resolver';
import { InstanceRebuildComponent } from './instance-rebuild/instance-rebuild.component';
import { InstanceRebuildOptionsResolver } from '../../../shared/fleio-api/openstack/instance/instance-rebuild-options.resolver';
import { InstanceBootFromIsoComponent } from './instance-boot-from-iso/instance-boot-from-iso.component';
import { InstanceBootFromIsoOptionsResolver } from '../../../shared/fleio-api/openstack/instance/instance-boot-from-iso-options.resolver';
import { AuthGuard } from '../../../shared/auth/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: InstanceListComponent,
    resolve: {
      instances: InstanceListResolver,
    },
    canActivate: [AuthGuard],
    data: {
      config: {
        feature: 'openstack.instances',
        search: {
          show: true,
          placeholder: 'Search instances ...',
        },
        ordering: {
          default: {
            field: 'created',
            display: 'Creation date',
            direction: OrderingDirection.Descending
          },
          options: [
            {
              field: 'created',
              display: 'Creation date',
            },
            {
              field: 'name',
              display: 'Name'
            },
            {
              field: 'region',
              display: 'Region'
            },
            {
              field: 'status',
              display: 'Status'
            },
          ],
        },
        filterConfig: {
          availableOptions: [
            {
              field: 'created',
              display: 'Created at',
              type: FilterTypes.Date
            },
            {
              field: 'project__service__client__id',
              display: 'Client',
              type: FilterTypes.CustomModel,
              items: 'clients',
              itemsDisplayField: 'name'
            },
            {
              field: 'status',
              display: 'Status',
              type: FilterTypes.Choices
            },
            {
              field: 'task_state',
              display: 'Task state',
              type: FilterTypes.Choices
            },
            {
              field: 'region',
              display: 'Region',
              type: FilterTypes.CustomModel,
              items: 'regions',
              itemsDisplayField: 'id'
            },
            {
              field: 'flavor__name',
              display: 'Flavor name',
              type: FilterTypes.WildCard
            },
            {
              field: 'host_name',
              display: 'Host name',
              type: FilterTypes.WildCard
            },
            {
              field: 'image__os_distro',
              display: 'Image OS distro name',
              type: FilterTypes.WildCard
            },
            {
              field: 'flavor',
              display: 'Flavor',
              type: FilterTypes.CustomModel,
              items: 'flavors',
              itemsDisplayField: 'display_name'
            }
          ]
        },
        subheader: {
          objectName: 'instance',
          objectNamePlural: 'instances',
          objectList(data): FleioObjectsList<IBaseFleioObjectModel> {
            return data.instances;
          }
        },
      } as IRouteConfig,
    },
    runGuardsAndResolvers: 'always',
  },
  {
    path: 'create',
    component: InstanceCreateComponent,
    resolve: {
      createOptions: InstanceCreateOptionsResolver,
    },
    data: {
      config: {
        getBreadCrumbDetail: () => {
          return 'Create instance';
        },
      } as IRouteConfig,
    }
  },
  {
    path: ':id',
    component: InstanceDetailsComponent,
    resolve: {
      instance: InstanceResolver,
      permissions: InstancePermissionsResolver
    },
    data: {
      config: {
        getBreadCrumbDetail: (data) => {
          return data.instance.name;
        },
      } as IRouteConfig,
    },
    runGuardsAndResolvers: 'always',
  },
  {
    path: ':id/resize',
    component: InstanceResizeComponent,
    resolve: {
      instance: InstanceResolver,
      resizeOptions: InstanceResizeOptionsResolver
    },
    data: {
      config: {
        getBreadCrumbDetail: (data) => {
          return `Resize ${data.resizeOptions.instance.name}`;
        },
      } as IRouteConfig,
    },
  },
  {
    path: ':id/rescue',
    component: InstanceRescueComponent,
    resolve: {
      instance: InstanceResolver,
      permissions: InstancePermissionsResolver,
      bootOptions: InstanceRescueOptionsResolver,
    },
    data: {
      config: {
        getBreadCrumbDetail: (data) => {
          return `Rescue ${data.instance.name}`;
        },
      } as IRouteConfig,
    },
  },
  {
    path: ':id/boot-from-iso',
    component: InstanceBootFromIsoComponent,
    resolve: {
      instance: InstanceResolver,
      permissions: InstancePermissionsResolver,
      bootOptions: InstanceBootFromIsoOptionsResolver,
    },
    data: {
      config: {
        getBreadCrumbDetail: (data) => {
          return `Boot from ISO ${data.instance.name}`;
        },
      } as IRouteConfig,
    },
  },
  {
    path: ':id/rebuild',
    component: InstanceRebuildComponent,
    resolve: {
      instance: InstanceResolver,
      permissions: InstancePermissionsResolver,
      rebuildOptions: InstanceRebuildOptionsResolver,
    },
    data: {
      config: {
        getBreadCrumbDetail: (data) => {
          return `Rebuild ${data.instance.name}`;
        },
      } as IRouteConfig,
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InstancesRoutingModule {
}
