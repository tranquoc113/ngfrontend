import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { OperationsApiService } from '../../../shared/fleio-api/utils/operations/operations-api.service';
import { IObjectListUIService } from '../../../shared/ui/objects-view/interfaces/object-list-ui-service';
import { ConfigService } from '../../../shared/config/config.service';
import { IBaseFleioObjectModel } from '../../../shared/fleio-api/base-model/base-fleio-object.model';
import { IPermissionsModel } from '../../../shared/fleio-api/base-model/IPermissionsModel';
import { IObjectUIService } from '../../../shared/ui/objects-view/interfaces/object-ui-service';
import { IOperationModel } from '../../../shared/fleio-api/utils/model/operation.model';
import { FleioObjectsList } from '../../../shared/fleio-api/fleio-objects-list';
import { ITableData } from '../../../shared/ui/objects-view/interfaces/table-data/table-data';
import { ColumnType } from '../../../shared/ui/objects-view/interfaces/table-data/column-definition';
import { ITableRow } from '../../../shared/ui/objects-view/interfaces/table-data/table-row';
import { IAction } from '../../../shared/ui/objects-view/interfaces/actions/action';
import { OperationUiService } from './operation-ui.service';
import { DatePipe } from '@angular/common';
import { MediaObserver } from '@angular/flex-layout';

@Injectable({
  providedIn: 'root',
})
export class OperationsListUiService implements IObjectListUIService {
  public noItemsMessage = 'No operations';
  private datePipe: DatePipe;

  constructor(
    private router: Router, private config: ConfigService,
    private operationsApiService: OperationsApiService,
    private matDialog: MatDialog,
  ) {
    this.datePipe = new DatePipe(this.config.locale);
  }

  getObjectUIService(
    object: IBaseFleioObjectModel, permissions: IPermissionsModel, state: string
  ): IObjectUIService {
    return new OperationUiService(
      object as IOperationModel, permissions, state, this.router, this.config, this.operationsApiService,
      this.matDialog,
    );
  }

  getTableData(objectList: FleioObjectsList<IOperationModel>): ITableData {
    const tableData: ITableData = {
      header: {
        columns: [
          {
            type: ColumnType.Value, displayName: 'ID', enableSort: false, fieldName: 'id',
            flex: '150px', hide: {xs: true, sm: true},
          },
          {
            type: ColumnType.Value, displayName: 'Status', enableSort: true, fieldName: 'status',
            flex: '100px',
          },
          {
            type: ColumnType.Value, displayName: 'Created at', enableSort: true, fieldName: 'created_at',
            flex: '200px', hide: {xs: true},
          },
          {
            type: ColumnType.Value, displayName: 'Created by', enableSort: false, fieldName: 'initiating_user',
            flex: '150px', hide: {xs: true, sm: true, md: true},
          },
          {
            type: ColumnType.Value, displayName: 'Primary object id', enableSort: false,
            fieldName: 'primary_object_id',
            flex: '150px', hide: {xs: true, sm: true, md: true},
          },
          {
            type: ColumnType.Value, displayName: 'Operation type', enableSort: false, fieldName: 'operation_type',
            flex: 'auto'
          },
          {
            type: ColumnType.Actions, displayName: 'Actions', enableSort: false, fieldName: '(actions)',
            flex: 'auto', hide: {xs: true, sm: true},
          },
        ],
        columnNames: [
          'id', 'status', 'created_at', 'initiating_user', 'primary_object_id', 'operation_type', '(actions)'
        ],
        showStatus: true,
      },
      rows: [],
    };

    for (const operation of objectList.objects) {
      const rowUIService = this.getObjectUIService(operation, objectList.permissions, 'table-view');
      const row: ITableRow = {
        cells: {
          id: {text: operation.id.toString()},
          status: {text: operation.status},
          created_at: {text: this.datePipe.transform(operation.created_at, 'medium')},
          initiating_user: {text: operation.initiating_user ? operation.initiating_user.full_name : 'n/a'},
          operation_type: {text: operation.operation_type},
          primary_object_id: {text: operation.primary_object_id},
        },
        icon: rowUIService.getIcon(),
        status: rowUIService.getStatus(),
        actions: rowUIService.getActions(),
        url: rowUIService.getDetailsLink(),
        object: operation,
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
      return this.config.current.settings.refreshIntervals.operationsListInterval;
    }
    return 1000;
  }
}
