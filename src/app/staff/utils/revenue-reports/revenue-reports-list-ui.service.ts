import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { IObjectListUIService } from '../../../shared/ui/objects-view/interfaces/object-list-ui-service';
import { ConfigService } from '../../../shared/config/config.service';
import { IBaseFleioObjectModel } from '../../../shared/fleio-api/base-model/base-fleio-object.model';
import { IPermissionsModel } from '../../../shared/fleio-api/base-model/IPermissionsModel';
import { IObjectUIService } from '../../../shared/ui/objects-view/interfaces/object-ui-service';
import { FleioObjectsList } from '../../../shared/fleio-api/fleio-objects-list';
import { ITableData } from '../../../shared/ui/objects-view/interfaces/table-data/table-data';
import { ColumnType } from '../../../shared/ui/objects-view/interfaces/table-data/column-definition';
import { ITableRow } from '../../../shared/ui/objects-view/interfaces/table-data/table-row';
import { IAction } from '../../../shared/ui/objects-view/interfaces/actions/action';
import { DatePipe } from '@angular/common';
import { RevenueReportUiService } from './revenue-report-ui.service';
import { IRevenueReportModel } from '../../../shared/fleio-api/utils/model/revenue-report.model';
import { RevenueReportsApiService } from '../../../shared/fleio-api/utils/revenue-reports/revenue-reports-api.service';
import { RouterLinkAction } from '../../../shared/ui/objects-view/actions/router-link-action';

@Injectable({
  providedIn: 'root',
})
export class RevenueReportsListUiService implements IObjectListUIService {
  public noItemsMessage = 'No revenue reports';
  private datePipe: DatePipe;
  constructor(
    private router: Router, private config: ConfigService,
    private revenueReportsApiService: RevenueReportsApiService,
    private matDialog: MatDialog,
    ) {
    this.datePipe = new DatePipe(this.config.locale);
  }

  getObjectUIService(
    object: IBaseFleioObjectModel, permissions: IPermissionsModel, state: string
  ): IObjectUIService {
      return new RevenueReportUiService(
        object as IRevenueReportModel, permissions, state, this.router, this.config, this.revenueReportsApiService,
        this.matDialog,
      );
  }

  getTableData(objectList: FleioObjectsList<IRevenueReportModel>): ITableData {
    const tableData: ITableData = {
      header: {
        columns: [
          { type: ColumnType.Value, displayName: 'Report for', enableSort: false, fieldName: 'report_month_year' },
          { type: ColumnType.Value, displayName: 'Total revenue', enableSort: false, fieldName: 'total_revenue' },
          { type: ColumnType.Image, displayName: 'Finished generation', enableSort: false, fieldName: 'generating' },
          { type: ColumnType.Value, displayName: 'Clients processed', enableSort: false, fieldName: 'processed' },
          { type: ColumnType.Actions, displayName: 'Actions', enableSort: false, fieldName: '(actions)' },
        ],
        columnNames: [
          'report_month_year', 'total_revenue', 'generating', 'processed', '(actions)'
        ],
        showStatus: true,
      },
      rows: [],
    };

    for (const revenueReport of objectList.objects) {
      const rowUIService = this.getObjectUIService(revenueReport, objectList.permissions, 'table-view');
      const row: ITableRow = {
        cells: {
          report_month_year: { text: revenueReport.report_month_year},
          total_revenue: { text: `${revenueReport.total_revenue} ${revenueReport.currency_code}` },
          processed: { text: `${revenueReport.processed}%`},
        },
        icon: rowUIService.getIcon(),
        status: rowUIService.getStatus(),
        actions: rowUIService.getActions(),
        url: rowUIService.getDetailsLink(),
      };

      tableData.rows.push(row);
    }

    return tableData;
  }

  getActions(objectList: FleioObjectsList<IBaseFleioObjectModel>): IAction[] {
    return [
      new RouterLinkAction({
        name: 'Generate report',
        tooltip: 'Generate report',
        icon: {name: 'add'},
        router: this.router,
        routerUrl: this.config.getPanelUrl('utils/revenue-reports/generate')
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
