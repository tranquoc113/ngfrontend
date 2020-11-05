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
import { DatePipe } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { JournalUIService } from './journal-ui.service';
import { IJournalEntryModel } from '@fleio-api/billing/model/journal-entry.model';
import { JournalsApiService } from '@fleio-api/billing/journal/journal-api.service';
import { AppColor } from '@shared/ui/common/enums/app-color.enum';
import { ITableCell } from '@objects-view/interfaces/table-data/table-cell';
import { GatewayApiService } from '@fleio-api/billing/gateways/gateway-api.service';
import { NotificationService } from '@shared/ui-api/notification.service';

@Injectable({
  providedIn: 'root',
})
export class JournalListUiService implements IObjectListUIService {
  public noItemsMessage = 'No journal entries';
  private datePipe: DatePipe;

  constructor(
    private router: Router,
    private config: ConfigService,
    private journalsApiService: JournalsApiService,
    private matDialog: MatDialog,
    private gatewayApiService: GatewayApiService,
    private notificationService: NotificationService
  ) {
    this.datePipe = new DatePipe(this.config.locale);
  }

  getObjectUIService(
    object: IBaseFleioObjectModel, permissions: IPermissionsModel, state: string
  ): IObjectUIService {
    return new JournalUIService(
      object as IJournalEntryModel, permissions, state, this.router, this.config, this.journalsApiService,
      this.matDialog, this.gatewayApiService, this.notificationService
    );
  }

  getTableData(objectList: FleioObjectsList<IJournalEntryModel>): ITableData {
    const tableData: ITableData = {
      header: {
        columns: [
          {
            type: ColumnType.Value, displayName: 'Date', enableSort: false, fieldName: 'date_added',
            flex: '180px', flexXs: '150px'
          },
          {
            type: ColumnType.Value, displayName: 'Source info', enableSort: true, fieldName: 'source',
            flex: '350px', hide: {xs: true, md: true, sm: true}
          },
          {
            type: ColumnType.Value, displayName: 'Destination info', enableSort: true, fieldName: 'destination',
            flex: '250px', flexXs: '130px'
          },
          {
            type: ColumnType.Currency, displayName: 'Amount', enableSort: true, fieldName: 'destination_amount',
          },
          {
            type: ColumnType.Actions, displayName: '', enableSort: false, fieldName: '(actions)',
            hide: {xs: true}
          },
        ],
        columnNames: ['date_added', 'source', 'destination', 'destination_amount', '(actions)'],
        showStatus: false,
      },
      rows: [],
      fullWidthMobile: true,
      alwaysShowActions: true,
    };

    for (const journalEntry of objectList.objects) {
      const rowUIService = this.getObjectUIService(journalEntry, objectList.permissions, 'table-view');
      let sourceInfoSubText;
      let sourceInfoSubTextLink;
      if (journalEntry.source_info.invoice) {
        sourceInfoSubText = `Invoice ${journalEntry.source_info.invoice}`
        sourceInfoSubTextLink = this.config.getPanelUrl(`billing/invoices/${journalEntry.source_info.invoice}`);
      }
      if (journalEntry.source_info.transaction) {
        sourceInfoSubText = `Transaction ${journalEntry.source_info.transaction}`
      }
      let destinationInfoSubText;
      let destinationInfoSubTextLink;
      if (journalEntry.destination_info.invoice) {
        destinationInfoSubText = `Invoice ${journalEntry.destination_info.invoice}`
        destinationInfoSubTextLink = this.config.getPanelUrl(`billing/invoices/${journalEntry.source_info.invoice}`);
      }
      if (journalEntry.destination_info.transaction) {
        destinationInfoSubText = `Transaction ${journalEntry.destination_info.transaction}`
      }
      const destinationAmount = {
        text: `${journalEntry.destination_amount} ${journalEntry.destination_currency}`
      } as ITableCell;
      if (journalEntry.direction === 'outgoing') {
        destinationAmount.text = '- ' + destinationAmount.text;
        destinationAmount.textColor = AppColor.Red;
      }
      if (journalEntry.needs_capture) {
        destinationAmount.textColor = AppColor.Orange;
      }
      const row: ITableRow = {
        cells: {
          date_added: {text: `${this.datePipe.transform(journalEntry.date_added, 'yyyy-MM-dd HH:mm:ss')}`},
          source: {text: journalEntry.source_info.name, subText: sourceInfoSubText, subTextLink: sourceInfoSubTextLink},
          destination: {text: journalEntry.destination_info.name, subText: destinationInfoSubText,
            subTextLink: destinationInfoSubTextLink},
          destination_amount: destinationAmount
        },
        icon: rowUIService.getIcon(),
        status: rowUIService.getStatus(),
        actions: rowUIService.getActions(),
        url: rowUIService.getDetailsLink(),
        object: journalEntry,
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
