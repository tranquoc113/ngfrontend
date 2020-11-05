import { Injectable } from '@angular/core';
import { IObjectListUIService } from '@objects-view/interfaces/object-list-ui-service';
import { Router } from '@angular/router';
import { ConfigService } from '@shared/config/config.service';
import { IBaseFleioObjectModel } from '@fleio-api/base-model/base-fleio-object.model';
import { IPermissionsModel } from '@fleio-api/base-model/IPermissionsModel';
import { IObjectUIService } from '@objects-view/interfaces/object-ui-service';
import { FleioObjectsList } from '@fleio-api/fleio-objects-list';
import { ITableData } from '@objects-view/interfaces/table-data/table-data';
import { ColumnType } from '@objects-view/interfaces/table-data/column-definition';
import { ITableRow } from '@objects-view/interfaces/table-data/table-row';
import { IAction } from '@objects-view/interfaces/actions/action';
import { ActivityLogApiService } from '@fleio-api/utils/activity-log/activity-log-api.service';
import { ActivityLogUIService } from './activity-log-ui.service';
import { IActivityLogModel } from '@fleio-api/utils/model/activity-log.model';
import { DatePipe } from '@angular/common';
import { ActivityLogDetailComponent } from './tabs/activity-log-detail/activity-log-detail.component';

@Injectable({
  providedIn: 'root'
})
export class ActivityLogListUiService implements IObjectListUIService {
  public noItemsMessage = 'No activity log entries';
  private datePipe: DatePipe;

  constructor(
    private router: Router, private config: ConfigService,
    private activityLogApiService: ActivityLogApiService,
  ) {
    this.datePipe = new DatePipe(this.config.locale);
  }

  getObjectUIService(
    object: IBaseFleioObjectModel, permissions: IPermissionsModel, state: string
  ): IObjectUIService {
    return new ActivityLogUIService(
      object as IActivityLogModel, permissions, state, this.router, this.config, this.activityLogApiService,
    );
  }

  getTableData(objectList: FleioObjectsList<IActivityLogModel>): ITableData {
    const tableData: ITableData = {
      header: {
        columns: [
          {
            type: ColumnType.Value, displayName: 'Message', enableSort: false, fieldName: 'message',
            flex:'1 0 400px', flexXs: '1 1 90%', wrap: true,
          },
          {
            type: ColumnType.Value, displayName: 'Created at', enableSort: true, fieldName: 'created_at',
            flex: '200px', hide: {xs: true, sm: true, md: true, },
          },
          {
            type: ColumnType.Value, displayName: 'Tasks', enableSort: false, fieldName: 'tasks',
            flex: '80px', hide: 'xs',
          },
          {
            type: ColumnType.Value, displayName: 'User', enableSort: true, fieldName: 'user',
            flex: '120px', hide: {xs: true, sm: true },
          },
          {
            type: ColumnType.Value, displayName: 'IP', enableSort: true, fieldName: 'ip',
            flex: '150px', hide: {xs: true, sm: true },
          },
        ],
        columnNames: ['message', 'tasks', 'created_at', 'user', 'ip'],
        showStatus: true,
      },
      rows: [],
      expandableRows: true,
      detailComponent: ActivityLogDetailComponent,
      trackByFunction: (index, item: ITableRow) => item.object.id,
    };

    for (const activityLogEntry of objectList.objects) {
      const rowUIService = this.getObjectUIService(activityLogEntry, objectList.permissions, 'table-view');
      const row: ITableRow = {
        cells: {
          created_at: {text: this.datePipe.transform(activityLogEntry.created_at, 'medium')},
          tasks: {text: activityLogEntry.tasks_count > 0 ? `${activityLogEntry.tasks_count} tasks`: 'no tasks' },
          user: {text: activityLogEntry.user ? activityLogEntry.user.username : 'n/a'},
          message: {text: activityLogEntry.log},
          ip: {text: activityLogEntry.ip ? activityLogEntry.ip : 'n/a'},
        },
        status: rowUIService.getStatus(),
        object: activityLogEntry,
        expandable: activityLogEntry.tasks_count > 0,
      };

      tableData.rows.push(row);
    }

    return tableData;
  }

  getActions(objectList: FleioObjectsList<IBaseFleioObjectModel>): IAction[] {
    return [];
  }

  getRefreshInterval(): number {
    if (this.config && this.config.current && this.config.current.settings &&
      this.config.current.settings.refreshIntervals) {
      return this.config.current.settings.refreshIntervals.defaultInterval;
    }
    return 10000;
  }
}
