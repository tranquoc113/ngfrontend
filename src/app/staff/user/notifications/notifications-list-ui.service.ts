import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { IObjectListUIService } from '../../../shared/ui/objects-view/interfaces/object-list-ui-service';
import { ConfigService } from '../../../shared/config/config.service';
import { FleioObjectsList } from '../../../shared/fleio-api/fleio-objects-list';
import { IBaseFleioObjectModel } from '../../../shared/fleio-api/base-model/base-fleio-object.model';
import { ITableData } from '../../../shared/ui/objects-view/interfaces/table-data/table-data';
import { IPermissionsModel } from '../../../shared/fleio-api/base-model/IPermissionsModel';
import { NotificationsUiService } from './notifications-ui.service';
import { INotificationModel } from '../../../shared/fleio-api/notifications/model/notification.model';
import { UserNotificationsApiService } from '../../../shared/fleio-api/notifications/user-notifications-api.service';
import { IObjectUIService } from '../../../shared/ui/objects-view/interfaces/object-ui-service';
import { IAction } from '../../../shared/ui/objects-view/interfaces/actions/action';
import { ColumnType } from '../../../shared/ui/objects-view/interfaces/table-data/column-definition';
import { ITableRow } from '../../../shared/ui/objects-view/interfaces/table-data/table-row';
import { DatePipe } from '@angular/common';
import { RouterLinkAction } from '../../../shared/ui/objects-view/actions/router-link-action';


@Injectable({
  providedIn: 'root'
})
export class NotificationsListUiService implements IObjectListUIService {
  public noItemsMessage = 'No notifications';
  private datePipe: DatePipe;

  constructor(
    private router: Router, private config: ConfigService, private userNotificationsApiService: UserNotificationsApiService
  ) {
    this.datePipe = new DatePipe(this.config.locale);
  }

  getTableData(objectList: FleioObjectsList<INotificationModel>): ITableData {
    const tableData: ITableData = {
      header: {
        columns: [
          {type: ColumnType.Value, displayName: 'Title', enableSort: false, fieldName: 'title'},
          {type: ColumnType.Value, displayName: 'Generated', enableSort: true, fieldName: 'generated'},
          {type: ColumnType.Value, displayName: 'Status', enableSort: false, fieldName: 'status'},
        ],
        columnNames: ['title', 'generated', 'status'],
        showStatus: true,
      },
      rows: []
    };
    for (const notification of objectList.objects) {
      const rowUIService = this.getObjectUIService(notification, objectList.permissions, 'table-view');
      const row: ITableRow = {
        cells: {
          title: {text: notification.title},
          generated: {text: this.datePipe.transform(notification.generated)},
          status: {text: notification.status},
        },
        icon: rowUIService.getIcon(),
        status: rowUIService.getStatus(),
        actions: rowUIService.getActions(),
        url: rowUIService.getDetailsLink(),
        object: notification,
      };

      tableData.trackByFunction = (index, item: ITableRow) => item.object.id;
      tableData.rows.push(row);
    }
    return tableData;
  }

  getObjectUIService(
    object: IBaseFleioObjectModel, permissions: IPermissionsModel, state: string
  ): IObjectUIService {
    return new NotificationsUiService(
      object as INotificationModel, permissions, state, this.router, this.config, this.userNotificationsApiService,
    );
  }

  getActions(objectList: FleioObjectsList<IBaseFleioObjectModel>): IAction[] {
    return [
      new RouterLinkAction({
        name: 'Enable/Disable notifications',
        tooltip: 'Enable/Disable notifications',
        icon: {name: 'settings', class: 'fl-icons'},
        router: this.router,
        routerUrl: this.config.getPanelUrl('user/notifications/settings')
      })
    ];
  }

  getRefreshInterval(): number {
    if (this.config && this.config.current && this.config.current.settings &&
      this.config.current.settings.refreshIntervals) {
      return this.config.current.settings.refreshIntervals.defaultInterval;
    }
    return 10000;
  }
}
