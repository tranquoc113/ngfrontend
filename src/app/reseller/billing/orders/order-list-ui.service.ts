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
import { OrderUiService } from './order-ui.service';
import { IOrderModel } from '@fleio-api/billing/model/order.model';
import { OrdersApiService } from '@fleio-api/billing/orders/order-api.service';
import { IAction } from '@objects-view/interfaces/actions/action';

@Injectable({
  providedIn: 'root',
})
export class OrderListUIService implements IObjectListUIService {
  public noItemsMessage = 'No orders';

  constructor(private router: Router, private config: ConfigService, private ordersApiService: OrdersApiService) {
  }

  getObjectUIService(
    object: IBaseFleioObjectModel, permissions: IPermissionsModel, state: string
  ): IObjectUIService {
      return new OrderUiService(
        object as IOrderModel, permissions, state, this.router, this.config, this.ordersApiService,
      );
  }

  getTableData(objectList: FleioObjectsList<IOrderModel>): ITableData {
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

    for (const order of objectList.objects) {
      const rowUIService = this.getObjectUIService(order, objectList.permissions, 'table-view');
      const row: ITableRow = {
        cells: {
          name: { text: order.id.toString()},
        },
        icon: rowUIService.getIcon(),
        status: rowUIService.getStatus(),
        actions: rowUIService.getActions(),
        url: rowUIService.getDetailsLink(),
        object: order,
      };

      tableData.trackByFunction = (index, item: ITableRow) => item.object.id;
      tableData.rows.push(row);
    }

    return tableData;
  }

  getActions(objectList: FleioObjectsList<IBaseFleioObjectModel>): IAction[] {
    return null;
  }

  getRefreshInterval(): number {
    if (this.config && this.config.current && this.config.current.settings &&
      this.config.current.settings.refreshIntervals) {
      return this.config.current.settings.refreshIntervals.defaultInterval;
    }
    return 10000;
  }
}
