import { ProjectListComponent } from './project-list/project-list.component';
import { RouterModule, Routes } from '@angular/router';
import { ProjectListResolver } from '@fleio-api/openstack/project/project-list.resolver';
import { AuthGuard } from '@shared/auth/auth.guard';
import { FleioObjectsList } from '@fleio-api/fleio-objects-list';
import { IBaseFleioObjectModel } from '@fleio-api/base-model/base-fleio-object.model';
import { OrderingDirection } from '@shared/ui-api/interfaces/route-config/ordering-directions';
import { IRouteConfig } from '@shared/ui-api/interfaces/route-config/route-config';
import { ProjectCreateComponent } from './project-create/project-create.component';
import { ProjectEditComponent } from './project-edit/project-edit.component';
import { ProjectResolver } from '@fleio-api/openstack/project/project.resolver';
import { NgModule } from '@angular/core';
import { FilterTypes } from '@shared/ui-api/interfaces/route-config/filter-types';

const routes: Routes = [
  {
    path: '',
    component: ProjectListComponent,
    resolve: {
      projects: ProjectListResolver,
    },
    canActivate: [AuthGuard],
    data: {
      config: {
        feature: 'openstack.projects',
        search: {
          show: true,
          placeholder: 'Search projects ...',
        },
        subheader: {
          objectList(data): FleioObjectsList<IBaseFleioObjectModel> {
            return data.projects;
          },
          objectName: 'project',
          objectNamePlural: 'projects',
        },
        ordering: {
          default: {
            display: 'Created at',
            field: 'created_at',
            direction: OrderingDirection.Descending,
          },
          options: [
            {
              display: 'Project id',
              field: 'project_id',
            },
            {
              display: 'Project domain id',
              field: 'project_domain_id',
            },
            {
              display: 'Disabled',
              field: 'disabled',
            },
            {
              display: 'Name',
              field: 'name',
            },
            {
              display: 'Created at',
              field: 'created_at',
            },
            {
              display: 'Updated at',
              field: 'updated_at',
            },
          ]
        },
        filterConfig: {
          availableOptions:[
            {
              display: 'Created at',
              field: 'created_at',
              type: FilterTypes.Date,
            },
            {
              display: 'Updated at',
              field: 'updated_at',
              type: FilterTypes.Date,
            },
            {
              display: 'Disabled',
              field: 'disabled',
              type: FilterTypes.Boolean,
            },
            {
              display: 'Is domain',
              field: 'is_domain',
              type: FilterTypes.Boolean,
            },
            {
              display: 'Services count',
              field: 'services_count',
              type: FilterTypes.Decimal,
            },
          ]
        }
      } as IRouteConfig,
    },
    runGuardsAndResolvers: 'always'
  },
  {
    path: 'create',
    component: ProjectCreateComponent,
    resolve: {
    },
    data: {
      config: {
        getBreadCrumbDetail: () => {
          return 'Create project';
        },
      } as IRouteConfig,
    }
  },
  {
    path: ':id',
    component: ProjectEditComponent,
    resolve: {
      project: ProjectResolver,
    },
    data: {
      config: {
        getBreadCrumbDetail: (data) => {
          return `Edit project ${data.project.name}`;
        },
      } as IRouteConfig,
    }
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProjectsRoutingModule {
}
