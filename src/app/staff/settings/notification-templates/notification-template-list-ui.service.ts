import { Injectable } from '@angular/core';
import { IObjectListUIService } from '../../../shared/ui/objects-view/interfaces/object-list-ui-service';
import { Router } from '@angular/router';
import { ConfigService } from '../../../shared/config/config.service';
import { IBaseFleioObjectModel } from '../../../shared/fleio-api/base-model/base-fleio-object.model';
import { IPermissionsModel } from '../../../shared/fleio-api/base-model/IPermissionsModel';
import { IObjectUIService } from '../../../shared/ui/objects-view/interfaces/object-ui-service';
import { FleioObjectsList } from '../../../shared/fleio-api/fleio-objects-list';
import { ITableData } from '../../../shared/ui/objects-view/interfaces/table-data/table-data';
import { ColumnType } from '../../../shared/ui/objects-view/interfaces/table-data/column-definition';
import { ITableRow } from '../../../shared/ui/objects-view/interfaces/table-data/table-row';
import { IAction } from '../../../shared/ui/objects-view/interfaces/actions/action';
import { NotificationTemplatesApiService } from '../../../shared/fleio-api/notification-templates/notification-templates-api.service';
import { NotificationTemplateUIService } from './notification-template-ui.service';
import { INotificationTemplateModel } from '../../../shared/fleio-api/notification-templates/model/notification-template.model';

@Injectable({
  providedIn: 'root'
})
export class NotificationTemplateListUIService implements IObjectListUIService {
  public noItemsMessage = 'No notification templates';

  constructor(
    private router: Router, private config: ConfigService,
    private notificationTemplatesApiService: NotificationTemplatesApiService,
  ) {
  }

  getObjectUIService(
    object: IBaseFleioObjectModel, permissions: IPermissionsModel, state: string
  ): IObjectUIService {
    return new NotificationTemplateUIService(
      object as INotificationTemplateModel, permissions, state, this.router, this.config,
      this.notificationTemplatesApiService,
    );
  }

  getTableData(objectList: FleioObjectsList<INotificationTemplateModel>): ITableData {
    const tableData: ITableData = {
      header: {
        columns: [
          {
            type: ColumnType.Value, displayName: 'Name', enableSort: true, fieldName: 'name',
            flex: '200px'
          },
          {
            type: ColumnType.Value, displayName: 'Category', enableSort: false, fieldName: 'category',
            flex: '100px',
          },
          {
            type: ColumnType.Value, displayName: 'Title', enableSort: false, fieldName: 'title',
            hide: {xs: true, sm: true},
          },
          {type: ColumnType.Actions, displayName: 'Actions', enableSort: false, fieldName: '(actions)'},
        ],
        columnNames: ['name', 'category', 'title', '(actions)'],
        showStatus: true,
      },
      rows: [],
    };

    for (const notificationTemplate of objectList.objects) {
      const rowUIService = this.getObjectUIService(notificationTemplate, objectList.permissions, 'table-view');
      const row: ITableRow = {
        cells: {
          name: {text: notificationTemplate.name},
          category: {text: notificationTemplate.category_display},
          title: {text: notificationTemplate.title},
        },
        icon: rowUIService.getIcon(),
        status: rowUIService.getStatus(),
        actions: rowUIService.getActions(),
        url: rowUIService.getDetailsLink(),
        object: notificationTemplate,
      };

      tableData.trackByFunction = (index, item: ITableRow) => item.object.id;
      tableData.rows.push(row);
    }

    return tableData;
  }

  getActions(objectList: FleioObjectsList<IBaseFleioObjectModel>): IAction[] {
    return [
      // new RouterLinkAction({
      //   name: 'Create new notification template',
      //   tooltip: 'Create new notification template',
      //   icon: {name: 'add'},
      //   router: this.router,
      //   routerUrl: this.config.getPanelUrl('settings/notification-templates/create')
      // })
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
