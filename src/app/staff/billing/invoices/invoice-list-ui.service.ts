import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { IBaseFleioObjectModel } from '../../../shared/fleio-api/base-model/base-fleio-object.model';
import { IObjectListUIService } from '../../../shared/ui/objects-view/interfaces/object-list-ui-service';
import { IPermissionsModel } from '../../../shared/fleio-api/base-model/IPermissionsModel';
import { ConfigService } from '../../../shared/config/config.service';
import { IObjectUIService } from '../../../shared/ui/objects-view/interfaces/object-ui-service';
import { IInvoiceModel } from '../../../shared/fleio-api/billing/model/invoice.model';
import { InvoiceUIService } from './invoice-ui.service';
import { FleioObjectsList } from '../../../shared/fleio-api/fleio-objects-list';
import { ITableData } from '../../../shared/ui/objects-view/interfaces/table-data/table-data';
import { IAction } from '../../../shared/ui/objects-view/interfaces/actions/action';
import { RouterLinkAction } from '../../../shared/ui/objects-view/actions/router-link-action';
import { InvoicesApiService } from '../../../shared/fleio-api/billing/invoices/invoices-api.service';
import { ColumnType } from '../../../shared/ui/objects-view/interfaces/table-data/column-definition';
import { ITableRow } from '../../../shared/ui/objects-view/interfaces/table-data/table-row';
import { DatePipe } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';

@Injectable({
  providedIn: 'root',
})
export class InvoiceListUIService implements IObjectListUIService {
  public noItemsMessage = 'No invoices';
  private datePipe: DatePipe;

  constructor(private router: Router, private config: ConfigService, private invoicesApi: InvoicesApiService,
              private matDialog: MatDialog) {
    this.datePipe = new DatePipe(this.config.locale);
  }

  getObjectUIService(
    object: IBaseFleioObjectModel, permissions: IPermissionsModel, state: string
  ): IObjectUIService {
    return new InvoiceUIService(
      object as IInvoiceModel, permissions, state, this.router, this.config, this.invoicesApi, this.matDialog
    );
  }

  getTableData(objectList: FleioObjectsList<IInvoiceModel>): ITableData {
    const tableData: ITableData = {
      header: {
        columns: [
          {type: ColumnType.Value, displayName: 'ID', enableSort: true, fieldName: 'display_number'},
          {type: ColumnType.Value, displayName: 'Status', enableSort: true, fieldName: 'status'},
          {type: ColumnType.Value, displayName: 'Issue date', enableSort: true, fieldName: 'issue_date'},
          {type: ColumnType.Currency, displayName: 'Total', enableSort: true, fieldName: 'total'},
        ],
        columnNames: ['display_number', 'status', 'issue_date', 'total'],
        showStatus: true,
      },
      rows: [],
    };

    for (const invoice of objectList.objects) {
      const rowUIService = this.getObjectUIService(invoice, objectList.permissions, 'table-view');
      const row: ITableRow = {
        cells: {
          display_number: {text: invoice.display_number},
          status: {text: invoice.status.toLocaleUpperCase()},
          issue_date: {text: this.datePipe.transform(invoice.issue_date)},
          total: {text: `${invoice.total} ${invoice.currency}`},
        },
        icon: rowUIService.getIcon(),
        status: rowUIService.getStatus(),
        actions: rowUIService.getActions(),
        url: rowUIService.getDetailsLink(),
        object: invoice,
      };

      tableData.trackByFunction = (index, item: ITableRow) => item.object.id;
      tableData.rows.push(row);
    }

    return tableData;
  }

  getActions(objectList: FleioObjectsList<IBaseFleioObjectModel>): IAction[] {
    return [
      new RouterLinkAction({
        icon: {name: 'add'},
        name: 'Create',
        tooltip: 'Create new invoice',
        routerUrl: this.config.getPanelUrl(`billing/invoices/create`),
        router: this.router,
      }),
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
