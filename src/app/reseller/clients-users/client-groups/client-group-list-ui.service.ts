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
import { ClientGroupsApiService } from '../../../shared/fleio-api/client-user/client-group/client-groups-api.service';
import { IClientGroupModel } from '../../../shared/fleio-api/client-user/model/client-group.model';
import { ClientGroupUIService } from './client-group-ui.service';
import { IAction } from '../../../shared/ui/objects-view/interfaces/actions/action';
import { RouterLinkAction } from '../../../shared/ui/objects-view/actions/router-link-action';

@Injectable({
  providedIn: 'root'
})
export class ClientGroupListUIService implements IObjectListUIService {
  constructor(private router: Router, private config: ConfigService, private clientGroupsApi: ClientGroupsApiService) {
  }

  getObjectUIService(
    object: IBaseFleioObjectModel, permissions: IPermissionsModel, state: string
  ): IObjectUIService {
      return new ClientGroupUIService(
        object as IClientGroupModel, permissions, state, this.router, this.config, this.clientGroupsApi,
      );
  }

  getTableData(objectList: FleioObjectsList<IClientGroupModel>): ITableData {
    const tableData: ITableData = {
      header: {
        columns: [
          { type: ColumnType.Value, displayName: 'Name', enableSort: true, fieldName: 'name' },
        ],
        columnNames: [ 'name' ],
        showStatus: true,
      },
      rows: [],
    };

    for (const group of objectList.objects) {
      const rowUIService = this.getObjectUIService(group, objectList.permissions, 'table-view');
      const row: ITableRow = {
        cells: {
          name: { text: group.name},
        },
        icon: rowUIService.getIcon(),
        status: rowUIService.getStatus(),
        actions: rowUIService.getActions(),
        url: rowUIService.getDetailsLink(),
        object: group,
      };

      tableData.trackByFunction = (index, item: ITableRow) => item.object.id;
      tableData.rows.push(row);
    }

    return tableData;
  }

  getActions(objectList: FleioObjectsList<IBaseFleioObjectModel>): IAction[] {
    return [
      new RouterLinkAction({
        name: 'Create new group',
        tooltip: 'Create new group',
        icon: { name: 'add' },
        router: this.router,
        routerUrl: this.config.getPanelUrl('clients-users/client-groups/create')
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
