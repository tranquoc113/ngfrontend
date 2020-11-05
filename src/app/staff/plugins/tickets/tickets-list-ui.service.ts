import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { MatDialog } from '@angular/material/dialog';
import { IObjectListUIService } from '@objects-view/interfaces/object-list-ui-service';
import { ConfigService } from '@shared/config/config.service';
import { TicketsApiService } from '@fleio-api/plugins/tickets/tickets-api.service';
import { IBaseFleioObjectModel } from '@fleio-api/base-model/base-fleio-object.model';
import { IPermissionsModel } from '@fleio-api/base-model/IPermissionsModel';
import { IObjectUIService } from '@objects-view/interfaces/object-ui-service';
import { TicketUiService } from './ticket-ui.service';
import { ITicketModel } from '@fleio-api/plugins/tickets/model/ticket.model';
import { FleioObjectsList } from '@fleio-api/fleio-objects-list';
import { ITableData } from '@objects-view/interfaces/table-data/table-data';
import { ColumnType } from '@objects-view/interfaces/table-data/column-definition';
import { ITableRow } from '@objects-view/interfaces/table-data/table-row';
import { IAction } from '@objects-view/interfaces/actions/action';
import { RouterLinkAction } from '@objects-view/actions/router-link-action';
import { TicketsUtilsService } from '@fleio-api/plugins/tickets/tickets-utils.service';
import { AppColor } from '@shared/ui/common/enums/app-color.enum';

@Injectable({
  providedIn: 'root',
})
export class TicketsListUiService implements IObjectListUIService {
  public noItemsMessage = 'No tickets';
  private readonly ticketsUtilsService: TicketsUtilsService;

  constructor(
    private router: Router, private config: ConfigService,
    private ticketsApiService: TicketsApiService,
    private matDialog: MatDialog,
  ) {
    this.ticketsUtilsService = new TicketsUtilsService();
  }

  getObjectUIService(
    object: IBaseFleioObjectModel, permissions: IPermissionsModel, state: string
  ): IObjectUIService {
    return new TicketUiService(
      object as ITicketModel, permissions, state, this.router, this.config, this.ticketsApiService,
      this.matDialog,
    );
  }

  getTableData(objectList: FleioObjectsList<ITicketModel>): ITableData {
    const tableData: ITableData = {
      header: {
        columns: [
          {
            type: ColumnType.Value, displayName: 'Priority', enableSort: true, fieldName: 'priority',
            flex: '50px', hide: {xs: true, sm: true},
          },
          {
            type: ColumnType.Value, displayName: 'Client name', enableSort: false, fieldName: 'client_name',
            flex: '120px', hide: {xs: true, sm: true},
          },
          {
            type: ColumnType.Value, displayName: 'Title', enableSort: true, fieldName: 'title',
            flex: '1 1 400px', flexXs: '50%',
          },
          {
            type: ColumnType.Value, displayName: 'Last reply', enableSort: true, fieldName: 'last_reply_at',
            flex: '120px', hide: {xs: true, sm: true},
          },
          {
            type: ColumnType.Value, displayName: 'Department', enableSort: true, fieldName: 'department',
            flex: '140px', hide: {xs: true, sm: true, md: true},
          },
          {
            type: ColumnType.Value, displayName: 'Status', enableSort: true, fieldName: 'status',
            flex: '70px', hide: {xs: true, sm: true, md: true},
          },
          {
            type: ColumnType.Actions, displayName: 'Actions', enableSort: false, fieldName: '(actions)',
          },
        ],
        columnNames: ['priority', 'client_name', 'title', 'last_reply_at', 'department', 'status', '(actions)'],
        showStatus: true,
      },
      rows: [],
    };

    for (const ticket of objectList.objects) {
      const rowUIService = this.getObjectUIService(ticket, objectList.permissions, 'table-view');
      let priorityListDisplay: string;
      if (ticket.priority === 'medium') {
        priorityListDisplay = 'MED';
      } else if (ticket.priority === 'high') {
        priorityListDisplay = 'HIGH';
      } else if (ticket.priority === 'low') {
        priorityListDisplay = 'LOW';
      }
      let departmentColDisplay = ticket.department_display;
      if (ticket.assigned_to) {
        departmentColDisplay += ` (${ticket.assigned_to_display})`
      }
      let statusColor: AppColor;
      if (ticket.status === 'open' || ticket.status === 'answered') {
        statusColor = AppColor.Green;
      } else if (ticket.status === 'in progress') {
        statusColor = AppColor.Red;
      } else if (ticket.status === 'on hold' || ticket.status === 'customer reply') {
        statusColor = AppColor.Orange;
      } else if (ticket.status === 'done') {
        statusColor = AppColor.Gray;
      }
      const lastReplyAt = this.ticketsUtilsService.formatLastReply(ticket.last_reply_at);
      const row: ITableRow = {
        cells: {
          priority: {text: priorityListDisplay},
          client_name: {text: ticket.client_display},
          title: {text: ticket.title, subText: `#${ticket.id}`},
          last_reply_at: {text: lastReplyAt},
          department: {text: departmentColDisplay},
          status: {text: ticket.status_display, textColor: statusColor, textBold: true},
        },
        icon: rowUIService.getIcon(),
        status: rowUIService.getStatus(),
        actions: rowUIService.getActions(),
        url: rowUIService.getDetailsLink(),
        boldText: ticket.unread,
        object: ticket,
      };

      tableData.trackByFunction = (index, item: ITableRow) => item.object.id;
      tableData.rows.push(row);
    }

    return tableData;
  }

  getActions(objectList: FleioObjectsList<IBaseFleioObjectModel>): IAction[] {
    return [
      new RouterLinkAction({
        name: 'Open a new ticket',
        tooltip: 'Open a new ticket',
        icon: {name: 'add'},
        router: this.router,
        routerUrl: this.config.getPanelUrl('plugins/tickets/open-new-ticket')
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
