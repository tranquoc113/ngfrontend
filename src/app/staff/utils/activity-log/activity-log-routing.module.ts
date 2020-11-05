import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IRouteConfig } from '@shared/ui-api/interfaces/route-config/route-config';
import { AuthGuard } from '@shared/auth/auth.guard';
import { IBaseFleioObjectModel } from '@fleio-api/base-model/base-fleio-object.model';
import { FleioObjectsList } from '@fleio-api/fleio-objects-list';
import { OrderingDirection } from '@shared/ui-api/interfaces/route-config/ordering-directions';
import { ActivityLogListComponent } from './activity-log-list/activity-log-list.component';
import { ActivityLogResolver } from '@fleio-api/utils/activity-log/activity-log.resolver';
import { FilterTypes } from '@shared/ui-api/interfaces/route-config/filter-types';

const routes: Routes = [
  {
    path: '',
    component: ActivityLogListComponent,
    resolve: {
      activityLog: ActivityLogResolver,
    },
    canActivate: [AuthGuard],
    data: {
      config: {
        feature: 'utils.activitylog',
        search: {
          show: true,
          placeholder: 'Search activity log entries ...',
        },
        subheader: {
          objectList(data): FleioObjectsList<IBaseFleioObjectModel> {
            return data.activityLogEntries;
          },
          objectName: 'activity log entry',
          objectNamePlural: 'activity log entries',
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
              display: 'User',
              field: 'user',
            },
            {
              display: 'IP',
              field: 'ip',
            },
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
              field: 'user',
              display: 'User',
              type: FilterTypes.CustomModel,
              items: 'users',
              itemsDisplayField: 'full_name',
            },
            {
              field: 'log_class__name',
              display: 'Action',
              type: FilterTypes.Choices
            },
            {
              field: 'log_class__category__name',
              display: 'Category',
              type: FilterTypes.Choices
            },
          ],
        }
      } as IRouteConfig,
    },
    runGuardsAndResolvers: 'always'
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ActivityLogRoutingModule {
}
