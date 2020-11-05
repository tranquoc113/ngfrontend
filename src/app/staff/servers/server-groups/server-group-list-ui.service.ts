import { Injectable } from '@angular/core';
import { IObjectListUIService } from '@objects-view/interfaces/object-list-ui-service';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import { ConfigService } from '@shared/config/config.service';
import { ServerGroupsApiService } from '@fleio-api/servers/server-groups-api.service';
import { IBaseFleioObjectModel } from '@fleio-api/base-model/base-fleio-object.model';
import { IPermissionsModel } from '@fleio-api/base-model/IPermissionsModel';
import { IObjectUIService } from '@objects-view/interfaces/object-ui-service';
import { ServerGroupUiService } from './server-group-ui.service';
import { IServerGroupModel } from '@fleio-api/servers/model/server-group.model';
import { FleioObjectsList } from '@fleio-api/fleio-objects-list';
import { ITableData } from '@objects-view/interfaces/table-data/table-data';
import { ColumnType } from '@objects-view/interfaces/table-data/column-definition';
import { ITableRow } from '@objects-view/interfaces/table-data/table-row';
import { ServerUiService } from '../servers/server-ui.service';
import { IAction } from '@objects-view/interfaces/actions/action';
import { RouterLinkAction } from '@objects-view/actions/router-link-action';

@Injectable({
  providedIn: 'root'
})
export class ServerGroupListUiService implements IObjectListUIService {
  public noItemsMessage = 'No server groups';
  private datePipe: DatePipe;

  constructor(
    private router: Router, private config: ConfigService,
    private serverGroupsApiService: ServerGroupsApiService,
  ) {
    this.datePipe = new DatePipe(this.config.locale);
  }

  getObjectUIService(
    object: IBaseFleioObjectModel, permissions: IPermissionsModel, state: string
  ): IObjectUIService {
    return new ServerGroupUiService(
      object as IServerGroupModel, permissions, state, this.router, this.config, this.serverGroupsApiService,
    );
  }

  getTableData(objectList: FleioObjectsList<IServerGroupModel>): ITableData {
    const tableData: ITableData = {
      header: {
        columns: [
          {
            type: ColumnType.Value, displayName: 'Name', enableSort: true, fieldName: 'name',
            flex: '1 0 250px', flexXs: '70',
          },
          {
            type: ColumnType.Value, displayName: 'Description', enableSort: false, fieldName: 'description',
            flex: '150px', hide: {xs: true},
          },
          {
            type: ColumnType.Value, displayName: 'Placement', enableSort: false, fieldName: 'placement',
            flex: '1 0 100px', hide: {xs: true, sm: true},
          },
          {
            type: ColumnType.Actions, displayName: 'Actions', enableSort: false, fieldName: '(actions)',
          },
        ],
        columnNames: ['name', 'description', 'placement', '(actions)'],
        showStatus: true,
      },
      rows: [],
    };

    for (const serverGroup of objectList.objects) {
      const rowUIService = this.getObjectUIService(serverGroup, objectList.permissions, 'table-view');
      const row: ITableRow = {
        cells: {
          name: {text: serverGroup.name},
          description: {text: serverGroup.description},
          placement: {text: ServerUiService.getPlacementDisplay(serverGroup)},
        },
        icon: rowUIService.getIcon(),
        status: rowUIService.getStatus(),
        actions: rowUIService.getActions(),
        url: rowUIService.getDetailsLink(),
        object: serverGroup,
      };

      tableData.trackByFunction = (index, item: ITableRow) => item.object.id;
      tableData.rows.push(row);
    }

    return tableData;
  }

  getActions(objectList: FleioObjectsList<IBaseFleioObjectModel>): IAction[] {
    return [
      new RouterLinkAction({
        name: 'Create server group',
        tooltip: 'Create server group',
        icon: {name: 'add'},
        router: this.router,
        routerUrl: this.config.getPanelUrl('servers/server-groups/create')
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
