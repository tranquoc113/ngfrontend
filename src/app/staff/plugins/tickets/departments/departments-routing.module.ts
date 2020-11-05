import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../../../../shared/auth/auth.guard';
import { OrderingDirection } from '../../../../shared/ui-api/interfaces/route-config/ordering-directions';
import { FleioObjectsList } from '../../../../shared/fleio-api/fleio-objects-list';
import { IBaseFleioObjectModel } from '../../../../shared/fleio-api/base-model/base-fleio-object.model';
import { IRouteConfig } from '../../../../shared/ui-api/interfaces/route-config/route-config';
import { FilterTypes } from '../../../../shared/ui-api/interfaces/route-config/filter-types';
import { DepartmentsListComponent } from './departments-list/departments-list.component';
import { DepartmentsListResolver } from '../../../../shared/fleio-api/plugins/departments/departments-list.resolver';
import { DepartmentsCreateComponent } from './departments-create/departments-create.component';
import { DepartmentsCreateOptionsResolver } from '../../../../shared/fleio-api/plugins/departments/departments-create-options.resolver';
import { DepartmentDetailsComponent } from './department-details/department-details.component';
import { DepartmentResolver } from '../../../../shared/fleio-api/plugins/departments/department.resolver';

const routes: Routes = [
  {
    path: '',
    component: DepartmentsListComponent,
    resolve: {
      departments: DepartmentsListResolver,
    },
    canActivate: [AuthGuard],
    data: {
      config: {
        feature: 'plugins.tickets',
        search: {
          show: true,
          placeholder: 'Search departments ...',
        },
        ordering: {
          default: {
            field: 'name',
            display: 'Name',
            direction: OrderingDirection.Ascending
          },
          options: [
            {
              field: 'created_at',
              display: 'Created at'
            },
            {
              field: 'email',
              display: 'Email address'
            },
            {
              field: 'name',
              display: 'Name'
            },
          ],
        },
        subheader: {
          objectName: 'department',
          objectNamePlural: 'departments',
          objectList(data): FleioObjectsList<IBaseFleioObjectModel> {
            return data.departments;
          }
        },
        getBreadCrumbDetail: () => {
          return 'Departments';
        },
        filterConfig: {
          availableOptions: [
            {
              display: 'Created at',
              field: 'created_at',
              type: FilterTypes.Date
            },
          ],
        },
      } as IRouteConfig,
    },
    runGuardsAndResolvers: 'always'
  },
  {
    path: 'create',
    component: DepartmentsCreateComponent,
    resolve: {
      createOptions: DepartmentsCreateOptionsResolver,
    },
    data: {
      config: {
        getBreadCrumbDetail: () => {
          return 'Add department';
        },
      } as IRouteConfig,
    },
  },
  {
    path: ':id',
    component: DepartmentDetailsComponent,
    resolve: {
      department: DepartmentResolver,
      createOptions: DepartmentsCreateOptionsResolver,
    },
    data: {
      config: {
        getBreadCrumbDetail: (data) => {
          return `${data.department.name}`;
        },
      } as IRouteConfig,
    },
    runGuardsAndResolvers: 'always'
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DepartmentsRoutingModule {
}
