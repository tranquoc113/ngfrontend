import { Injectable } from '@angular/core';
import { IObjectListUIService } from '../../../shared/ui/objects-view/interfaces/object-list-ui-service';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import { ConfigService } from '../../../shared/config/config.service';
import { ServersApiService } from '../../../shared/fleio-api/servers/servers-api.service';
import { IBaseFleioObjectModel } from '../../../shared/fleio-api/base-model/base-fleio-object.model';
import { IPermissionsModel } from '../../../shared/fleio-api/base-model/IPermissionsModel';
import { IObjectUIService } from '../../../shared/ui/objects-view/interfaces/object-ui-service';
import { ServerUiService } from './server-ui.service';
import { IServerModel } from '../../../shared/fleio-api/servers/model/server.model';
import { FleioObjectsList } from '../../../shared/fleio-api/fleio-objects-list';
import { ITableData } from '../../../shared/ui/objects-view/interfaces/table-data/table-data';
import { ColumnType } from '../../../shared/ui/objects-view/interfaces/table-data/column-definition';
import { ITableRow } from '../../../shared/ui/objects-view/interfaces/table-data/table-row';
import { IAction } from '../../../shared/ui/objects-view/interfaces/actions/action';
import { RouterLinkAction } from '../../../shared/ui/objects-view/actions/router-link-action';
import { IServerGroupModel } from '../../../shared/fleio-api/servers/model/server-group.model';
import { IServerPluginModel } from '../../../shared/fleio-api/servers/model/server-plugin.model';

@Injectable({
  providedIn: 'root'
})
export class ServerListUiService implements IObjectListUIService {
  public noItemsMessage = 'No servers';
  private datePipe: DatePipe;

  constructor(
    private router: Router, private config: ConfigService,
    private serversApiService: ServersApiService,
  ) {
    this.datePipe = new DatePipe(this.config.locale);
  }

  getObjectUIService(
    object: IBaseFleioObjectModel, permissions: IPermissionsModel, state: string
  ): IObjectUIService {
    return new ServerUiService(
      object as IServerModel, permissions, state, this.router, this.config, this.serversApiService,
    );
  }

  getTableData(objectList: FleioObjectsList<IServerModel>): ITableData {
    const tableData: ITableData = {
      header: {
        columns: [
          {
            type: ColumnType.Value, displayName: 'Name', enableSort: true, fieldName: 'name',
            flex: '1 0 250px', flexXs: '70',
          },
          {
            type: ColumnType.Value, displayName: 'Group', enableSort: true, fieldName: 'group',
            flex: '150px', hide: {xs: true},
          },
          {
            type: ColumnType.Value, displayName: 'Status', enableSort: false, fieldName: 'status',
            flex: '1 0 100px', hide: {xs: true, sm: true},
          },
          {
            type: ColumnType.Value, displayName: 'Plugin', enableSort: false, fieldName: 'plugin',
            hide: {xs: true, sm: true},
          },
          {
            type: ColumnType.Actions, displayName: 'Actions', enableSort: false, fieldName: '(actions)',
          },
        ],
        columnNames: ['name', 'group', 'status', 'plugin', '(actions)'],
        showStatus: true,
      },
      rows: [],
    };

    for (const server of objectList.objects) {
      const rowUIService = this.getObjectUIService(server, objectList.permissions, 'table-view');
      const row: ITableRow = {
        cells: {
          name: {text: server.name},
          group: {text: (server.group as IServerGroupModel).name},
          status: {text: server.status},
          plugin: {text: (server.plugin as IServerPluginModel).label},
        },
        icon: rowUIService.getIcon(),
        status: rowUIService.getStatus(),
        actions: rowUIService.getActions(),
        url: rowUIService.getDetailsLink(),
        object: server,
      };

      tableData.trackByFunction = (index, item: ITableRow) => item.object.id;
      tableData.rows.push(row);
    }

    return tableData;
  }

  getActions(objectList: FleioObjectsList<IBaseFleioObjectModel>): IAction[] {
    return [
      new RouterLinkAction({
        name: 'Create server',
        tooltip: 'Create server',
        icon: {name: 'add'},
        router: this.router,
        routerUrl: this.config.getPanelUrl('servers/servers/create')
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
