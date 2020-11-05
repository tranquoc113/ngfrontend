import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { MatDialog } from '@angular/material/dialog';
import { IObjectListUIService } from '../../../../shared/ui/objects-view/interfaces/object-list-ui-service';
import { ConfigService } from '../../../../shared/config/config.service';
import { IBaseFleioObjectModel } from '../../../../shared/fleio-api/base-model/base-fleio-object.model';
import { IPermissionsModel } from '../../../../shared/fleio-api/base-model/IPermissionsModel';
import { IObjectUIService } from '../../../../shared/ui/objects-view/interfaces/object-ui-service';
import { FleioObjectsList } from '../../../../shared/fleio-api/fleio-objects-list';
import { ITableData } from '../../../../shared/ui/objects-view/interfaces/table-data/table-data';
import { ColumnType } from '../../../../shared/ui/objects-view/interfaces/table-data/column-definition';
import { ITableRow } from '../../../../shared/ui/objects-view/interfaces/table-data/table-row';
import { IAction } from '../../../../shared/ui/objects-view/interfaces/actions/action';
import { RouterLinkAction } from '../../../../shared/ui/objects-view/actions/router-link-action';
import { DepartmentUiService } from './department-ui.service';
import { ITicketDepartmentModel } from '../../../../shared/fleio-api/plugins/tickets/model/ticket-department.model';
import { TicketDepartmentsApiService } from '../../../../shared/fleio-api/plugins/tickets/ticket-departments-api.service';
import { DatePipe } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class DepartmentsListUiService implements IObjectListUIService {
  public noItemsMessage = 'No departments';

  private readonly datePipe: DatePipe;

  constructor(
    private router: Router, private config: ConfigService,
    private ticketDepartmentsApiService: TicketDepartmentsApiService,
    private matDialog: MatDialog,
    ) {
    this.datePipe = new DatePipe(this.config.locale);
  }

  getObjectUIService(
    object: IBaseFleioObjectModel, permissions: IPermissionsModel, state: string
  ): IObjectUIService {
      return new DepartmentUiService(
        object as ITicketDepartmentModel, permissions, state, this.router, this.config,
        this.ticketDepartmentsApiService,
        this.matDialog,
      );
  }

  getTableData(objectList: FleioObjectsList<ITicketDepartmentModel>): ITableData {
    const tableData: ITableData = {
      header: {
        columns: [
          { type: ColumnType.Value, displayName: 'Name', enableSort: true, fieldName: 'name', flex: '300px',
            flexXs: '150px' },
          { type: ColumnType.Value, displayName: 'Created at', enableSort: true, fieldName: 'created_at',
            hide: {xs: true, sm: true},
            flex: '250px' },
          { type: ColumnType.Value, displayName: 'Email', enableSort: true, fieldName: 'email', },
          { type: ColumnType.Actions, displayName: 'Actions', enableSort: false, fieldName: '(actions)' },
        ],
        columnNames: ['name', 'created_at', 'email', '(actions)'],
      },
      rows: [],
    };

    for (const department of objectList.objects) {
      const rowUIService = this.getObjectUIService(department, objectList.permissions, 'table-view');
      const row: ITableRow = {
        cells: {
          name: { text: department.name },
          created_at: { text: this.datePipe.transform(department.created_at, 'medium') },
          email: { text: department.email },
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
        name: 'Add department',
        tooltip: 'Add department',
        icon: { name: 'add' },
        router: this.router,
        routerUrl: this.config.getPanelUrl('plugins/tickets/departments/create')
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
