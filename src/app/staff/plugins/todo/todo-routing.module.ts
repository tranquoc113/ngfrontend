import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TodoListComponent } from './todo-list/todo-list.component';
import { TodoListResolver } from '../../../shared/fleio-api/plugins/todo/todo-list.resolver';
import { TodoCreateComponent } from './todo-create/todo-create.component';
import { TodoDetailsComponent } from './todo-details/todo-details.component';
import { TodoResolver } from '../../../shared/fleio-api/plugins/todo/todo.resolver';
import { TodoCreateOptionsResolver } from '../../../shared/fleio-api/plugins/todo/todo-create-options.resolver';
import { TodoEditComponent } from './todo-edit/todo-edit.component';
import { AuthGuard } from '../../../shared/auth/auth.guard';
import { OrderingDirection } from '../../../shared/ui-api/interfaces/route-config/ordering-directions';
import { FleioObjectsList } from '../../../shared/fleio-api/fleio-objects-list';
import { IBaseFleioObjectModel } from '../../../shared/fleio-api/base-model/base-fleio-object.model';
import { IRouteConfig } from '../../../shared/ui-api/interfaces/route-config/route-config';
import { FilterTypes } from '../../../shared/ui-api/interfaces/route-config/filter-types';

const routes: Routes = [
  {
    path: '',
    component: TodoListComponent,
    resolve: {
      todos: TodoListResolver,
    },
    canActivate: [AuthGuard],
    data: {
      config: {
        feature: 'plugins.todo',
        search: {
          show: true,
          placeholder: 'Search todos ...',
        },
        subheader: {
          objectList(data): FleioObjectsList<IBaseFleioObjectModel> {
            return data.todos;
          },
          objectName: 'todo',
          objectNamePlural: 'todos',
        },
        ordering: {
          default: {
            display: 'Created at',
            field: 'created_at',
            direction: OrderingDirection.Descending,
          },
          options: [
            {
              display: 'Assigned to',
              field: 'assigned_to',
            },
            {
              display: 'Created at',
              field: 'created_at',
            },
            {
              display: 'Created by',
              field: 'created_by',
            },
            {
              display: 'Status',
              field: 'status',
            },
            {
              display: 'Title',
              field: 'title',
            },
          ]
        },
        filterConfig: {
          availableOptions: [
            {
              field: 'assigned_to',
              display: 'Assigned to',
              type: FilterTypes.CustomModel,
              items: 'users',
              itemsDisplayField: 'full_name',
            },
            {
              field: 'created_at',
              display: 'Created at',
              type: FilterTypes.Date,
            },
            {
              field: 'status',
              display: 'Status',
              type: FilterTypes.Choices,
            },
          ],
          defaultFilters: [
            {
              field: 'status',
              value: 'in progress',
            },
            {
              field: 'status',
              value: 'open',
            },
            {
              field: 'assigned_to',
              value: 'current_user',
            },
            {
              field: 'assigned_to',
              value: null,
            },
          ],
        }
      } as IRouteConfig,
    },
    runGuardsAndResolvers: 'always'
  },
  {
    path: 'create',
    component: TodoCreateComponent,
    resolve: {
      createOptions: TodoCreateOptionsResolver,
    },
    data: {
      config: {
        getBreadCrumbDetail: () => {
          return 'Create todo';
        },
      } as IRouteConfig,
    }
  },
  {
    path: ':id',
    component: TodoDetailsComponent,
    resolve: {
      todo: TodoResolver,
    },
    data: {
      config: {
        getBreadCrumbDetail: (data) => {
          return data.todo.title;
        },
      } as IRouteConfig,
    },
    runGuardsAndResolvers: 'always',
  },
  {
    path: ':id/edit',
    component: TodoEditComponent,
    resolve: {
      todo: TodoResolver,
      createOptions: TodoCreateOptionsResolver,
    },
    data: {
      config: {
        getBreadCrumbDetail: (data) => {
          return `Edit todo ${data.todo.title}`;
        },
      } as IRouteConfig,
    }
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TodoRoutingModule {
}
