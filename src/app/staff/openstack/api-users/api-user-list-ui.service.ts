import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { IBaseFleioObjectModel } from '@fleio-api/base-model/base-fleio-object.model';
import { IObjectListUIService } from '@objects-view/interfaces/object-list-ui-service';
import { IPermissionsModel } from '@fleio-api/base-model/IPermissionsModel';
import { ConfigService } from '@shared/config/config.service';
import { IObjectUIService } from '@objects-view/interfaces/object-ui-service';
import { ITableData } from '@objects-view/interfaces/table-data/table-data';
import { FleioObjectsList } from '@fleio-api/fleio-objects-list';
import { ITableRow } from '@objects-view/interfaces/table-data/table-row';
import { ColumnType } from '@objects-view/interfaces/table-data/column-definition';
import { IAction } from '@objects-view/interfaces/actions/action';
import { RouterLinkAction } from '@objects-view/actions/router-link-action';
import { ApiUserUiService } from './api-user-ui.service';
import { ApiUsersApiService } from '@fleio-api/openstack/api-user/api-users-api.service';
import { IApiUserModel } from '@fleio-api/openstack/model/api-user.model';
import { MatDialog } from '@angular/material/dialog';

@Injectable({
  providedIn: 'root',
})
export class ApiUserListUiService implements IObjectListUIService {
  public noItemsMessage = 'No API users';

  constructor(
    private router: Router,
    private config: ConfigService,
    private apiUsersApi: ApiUsersApiService,
    private matDialog: MatDialog,
  ) {
  }

  getObjectUIService(
    object: IBaseFleioObjectModel, permissions: IPermissionsModel, state: string
  ): IObjectUIService {
    return new ApiUserUiService(
      object as IApiUserModel, permissions, state, this.router, this.config, this.apiUsersApi, this.matDialog
    );
  }

  getTableData(objectList: FleioObjectsList<IApiUserModel>): ITableData {
    const tableData: ITableData = {
      header: {
        columns: [
          {
            type: ColumnType.Value, displayName: 'Name', enableSort: false, fieldName: 'name',
            flex: '1 0 200px', flexXs: '95%',
          },
          {
            type: ColumnType.Value, displayName: 'ID', enableSort: false, fieldName: 'id',
            flex: '1 1 300px', hide: {xs: true, sm: true},
          },
          {
            type: ColumnType.Value, displayName: 'Project', enableSort: false, fieldName: 'project_name',
            flex: '1 1 300px', hide: {xs: true, sm: true, md: true},
          },
          {
            type: ColumnType.Actions, displayName: 'Actions', enableSort: false, fieldName: '(actions)'
          },
        ],
        columnNames: ['name', 'id', 'project_name', '(actions)'],
        showStatus: true,
      },
      rows: [],
    };

    for (const apiUser of objectList.objects) {
      const rowUIService = this.getObjectUIService(apiUser, objectList.permissions, 'table-view');
      const row: ITableRow = {
        cells: {
          name: { text: apiUser.name},
          id: { text: apiUser.id.toString()},
          project_name: { text: apiUser.project_name},
        },
        icon: rowUIService.getIcon(),
        status: rowUIService.getStatus(),
        actions: rowUIService.getActions(),
        url: rowUIService.getDetailsLink(),
        object: apiUser,
      };

      tableData.trackByFunction = (index, item: ITableRow) => item.object.id;
      tableData.rows.push(row);
    }

    return tableData;
  }

  getActions(objectList: FleioObjectsList<IBaseFleioObjectModel>): IAction[] {
    return [
      new RouterLinkAction({
        name: 'Create new api user',
        tooltip: 'Create new api user',
        icon: {name: 'add'},
        router: this.router,
        routerUrl: this.config.getPanelUrl('openstack/api-users/create')
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
