import { Injectable } from '@angular/core';
import { IObjectListUIService } from '@objects-view/interfaces/object-list-ui-service';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import { ConfigService } from '@shared/config/config.service';
import { ClientGroupsApiService } from '@fleio-api/client-user/client-group/client-groups-api.service';
import { IBaseFleioObjectModel } from '@fleio-api/base-model/base-fleio-object.model';
import { IPermissionsModel } from '@fleio-api/base-model/IPermissionsModel';
import { IObjectUIService } from '@objects-view/interfaces/object-ui-service';
import { ClientGroupUiService } from './client-group-ui.service';
import { IClientGroupModel } from '@fleio-api/client-user/model/client-group.model';
import { FleioObjectsList } from '@fleio-api/fleio-objects-list';
import { ITableData } from '@objects-view/interfaces/table-data/table-data';
import { ColumnType } from '@objects-view/interfaces/table-data/column-definition';
import { ITableRow } from '@objects-view/interfaces/table-data/table-row';
import { IAction } from '@objects-view/interfaces/actions/action';
import { RouterLinkAction } from '@objects-view/actions/router-link-action';

@Injectable({
  providedIn: 'root'
})
export class ClientGroupListUiService implements IObjectListUIService {
  public noItemsMessage = 'No client groups';
  private datePipe: DatePipe;

  constructor(
    private router: Router, private config: ConfigService,
    private clientGroupsApiService: ClientGroupsApiService,
  ) {
    this.datePipe = new DatePipe(this.config.locale);
  }

  getObjectUIService(
    object: IBaseFleioObjectModel, permissions: IPermissionsModel, state: string
  ): IObjectUIService {
    return new ClientGroupUiService(
      object as IClientGroupModel, permissions, state, this.router, this.config, this.clientGroupsApiService,
    );
  }

  getTableData(objectList: FleioObjectsList<IClientGroupModel>): ITableData {
    const tableData: ITableData = {
      header: {
        columns: [
          {
            type: ColumnType.Value, displayName: 'Name', enableSort: true, fieldName: 'name',
            flex: '1 0 250px', flexXs: '70',
          },
          {
            type: ColumnType.Value, displayName: 'Created at', enableSort: false, fieldName: 'created_at',
            flex: '150px', hide: {xs: true},
          },
          {
            type: ColumnType.Value, displayName: 'Description', enableSort: false, fieldName: 'description',
            flex: '1 0 100px', hide: {xs: true, sm: true},
          },
          {
            type: ColumnType.Actions, displayName: 'Actions', enableSort: false, fieldName: '(actions)',
          },
        ],
        columnNames: ['name', 'created_at', 'description', '(actions)'],
        showStatus: true,
      },
      rows: [],
    };

    for (const clientGroup of objectList.objects) {
      const rowUIService = this.getObjectUIService(clientGroup, objectList.permissions, 'table-view');
      const row: ITableRow = {
        cells: {
          name: {text: clientGroup.name},
          created_at: {text: this.datePipe.transform(clientGroup.created_at)},
          description: {text: clientGroup.description},
        },
        icon: rowUIService.getIcon(),
        status: rowUIService.getStatus(),
        actions: rowUIService.getActions(),
        url: rowUIService.getDetailsLink(),
        object: clientGroup,
      };

      tableData.trackByFunction = (index, item: ITableRow) => item.object.id;
      tableData.rows.push(row);
    }

    return tableData;
  }

  getActions(objectList: FleioObjectsList<IBaseFleioObjectModel>): IAction[] {
    return [
      new RouterLinkAction({
        name: 'Create client group',
        tooltip: 'Create client group',
        icon: {name: 'add'},
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
