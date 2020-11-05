import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IRouteConfig } from '../../../shared/ui-api/interfaces/route-config/route-config';
import { AuthGuard } from '../../../shared/auth/auth.guard';
import { IBaseFleioObjectModel } from '../../../shared/fleio-api/base-model/base-fleio-object.model';
import { FleioObjectsList } from '../../../shared/fleio-api/fleio-objects-list';
import { OrderingDirection } from '../../../shared/ui-api/interfaces/route-config/ordering-directions';
import { OperationsResolver } from '../../../shared/fleio-api/utils/operations/operations.resolver';
import { OperationsListComponent } from './operations-list/operations-list.component';
import { FilterTypes } from '../../../shared/ui-api/interfaces/route-config/filter-types';
import { OperationsDetailsComponent } from './operations-details/operations-details.component';
import { OperationResolver } from '../../../shared/fleio-api/utils/operations/operation.resolver';

const routes: Routes = [
  {
    path: '',
    component: OperationsListComponent,
    resolve: {
      operations: OperationsResolver,
    },
    canActivate: [AuthGuard],
    data: {
      config: {
        feature: 'utils.operations',
        search: {
          show: true,
          placeholder: 'Search operations ...',
        },
        subheader: {
          objectList(data): FleioObjectsList<IBaseFleioObjectModel> {
            return data.operations;
          },
          objectName: 'operation',
          objectNamePlural: 'operations',
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
              display: 'Status',
              field: 'status',
            }
          ]
        },
        filterConfig: {
          availableOptions: [
            {
              field: 'created_at',
              display: 'Date created',
              type: FilterTypes.Date
            },
            {
              field: 'initiating_user',
              display: 'Created by',
              type: FilterTypes.CustomModel,
              items: 'users',
              itemsDisplayField: 'username',
            },
            {
              field: 'completed',
              display: 'Completed',
              type: FilterTypes.Boolean
            },
            {
              field: 'operation_type',
              display: 'Operation type',
              type: FilterTypes.Choices
            },
            {
              field: 'status',
              display: 'Status',
              type: FilterTypes.Choices
            },
          ]
        }
      } as IRouteConfig,
    },
    runGuardsAndResolvers: 'always'
  },
  {
    path: ':id',
    component: OperationsDetailsComponent,
    resolve: {
      operation: OperationResolver
    },
    data: {
      config: {
        getBreadCrumbDetail: (data) => {
          return `Operation ${data.operation.id}`;
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
export class OperationsRoutingModule {
}
