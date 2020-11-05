import { Injectable } from '@angular/core';
import { IObjectListUIService } from '@objects-view/interfaces/object-list-ui-service';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import { ConfigService } from '@shared/config/config.service';
import { GatewayApiService } from '@fleio-api/billing/gateways/gateway-api.service';
import { IBaseFleioObjectModel } from '@fleio-api/base-model/base-fleio-object.model';
import { IPermissionsModel } from '@fleio-api/base-model/IPermissionsModel';
import { IObjectUIService } from '@objects-view/interfaces/object-ui-service';
import { GatewayUiService } from './gateway-ui.service';
import { IGatewayModel } from '@fleio-api/billing/model/gateway.model';
import { FleioObjectsList } from '@fleio-api/fleio-objects-list';
import { ITableData } from '@objects-view/interfaces/table-data/table-data';
import { ColumnType } from '@objects-view/interfaces/table-data/column-definition';
import { ITableRow } from '@objects-view/interfaces/table-data/table-row';
import { IAction } from '@objects-view/interfaces/actions/action';

@Injectable({
  providedIn: 'root'
})
export class GatewayListUiService implements IObjectListUIService {
  public noItemsMessage = 'No gateways';
  private datePipe: DatePipe;

  constructor(
    private router: Router, private config: ConfigService,
    private gatewayApiService: GatewayApiService,
  ) {
    this.datePipe = new DatePipe(this.config.locale);
  }

  getObjectUIService(
    object: IBaseFleioObjectModel, permissions: IPermissionsModel, state: string
  ): IObjectUIService {
    return new GatewayUiService(
      object as IGatewayModel, permissions, state, this.router, this.config, this.gatewayApiService,
    );
  }

  getTableData(objectList: FleioObjectsList<IGatewayModel>): ITableData {
    const tableData: ITableData = {
      header: {
        columns: [
          {
            type: ColumnType.Value, displayName: 'ID', enableSort: true, fieldName: 'id',
            flex: '1 0 50px', flexXs: '70',
          },
          {
            type: ColumnType.Value, displayName: 'Name', enableSort: true, fieldName: 'name',
            flex: '150px', hide: {xs: false},
          },
          {
            type: ColumnType.Value, displayName: 'Enabled', enableSort: true, fieldName: 'enabled',
            flex: '1 0 100px', hide: {xs: false, sm: false},
          },
          {
            type: ColumnType.Value, displayName: 'Show to user', enableSort: true, fieldName: 'visible_to_user',
            flex: '1 0 100px', hide: {xs: true, sm: true},
          },
          {
            type: ColumnType.Value, displayName: 'Fixed fee', enableSort: true, fieldName: 'fixed_fee',
            flex: '1 0 100px', hide: {xs: true, sm: true},
          },
          {
            type: ColumnType.Value, displayName: 'Percent fee', enableSort: true, fieldName: 'percent_fee',
            flex: '1 0 100px', hide: {xs: true, sm: true},
          },
        ],
        columnNames: ['id', 'name', 'enabled', 'visible_to_user', 'fixed_fee', 'percent_fee'],
        showStatus: false,
      },
      rows: [],
    };

    for (const gateway of objectList.objects) {
      const rowUIService = this.getObjectUIService(gateway, objectList.permissions, 'table-view');
      const row: ITableRow = {
        cells: {
          id: {text: `${gateway.id}`},
          name: {text: gateway.name},
          enabled: {text: gateway.enabled? 'Yes': 'No'},
          visible_to_user: {text: gateway.visible_to_user? 'Yes': 'No'},
          fixed_fee: {text: `${gateway.fixed_fee}`},
          percent_fee: {text: `${gateway.percent_fee}%`},
        },
        icon: rowUIService.getIcon(),
        status: rowUIService.getStatus(),
        actions: rowUIService.getActions(),
        url: rowUIService.getDetailsLink(),
        object: gateway,
      };

      tableData.trackByFunction = (index, item: ITableRow) => item.object.id;
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
