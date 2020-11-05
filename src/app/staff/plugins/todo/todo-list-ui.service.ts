import { Injectable } from '@angular/core';
import { IObjectListUIService } from '../../../shared/ui/objects-view/interfaces/object-list-ui-service';
import { Router } from '@angular/router';
import { ConfigService } from '../../../shared/config/config.service';
import { TodoApiService } from '../../../shared/fleio-api/plugins/todo/todo-api.service';
import { IBaseFleioObjectModel } from '../../../shared/fleio-api/base-model/base-fleio-object.model';
import { IPermissionsModel } from '../../../shared/fleio-api/base-model/IPermissionsModel';
import { IObjectUIService } from '../../../shared/ui/objects-view/interfaces/object-ui-service';
import { TodoUiService } from './todo-ui.service';
import { ITodoModel } from '../../../shared/fleio-api/plugins/todo/model/todo.model';
import { FleioObjectsList } from '../../../shared/fleio-api/fleio-objects-list';
import { ITableData } from '../../../shared/ui/objects-view/interfaces/table-data/table-data';
import { ColumnType } from '../../../shared/ui/objects-view/interfaces/table-data/column-definition';
import { RouterLinkAction } from '../../../shared/ui/objects-view/actions/router-link-action';
import { IAction } from '../../../shared/ui/objects-view/interfaces/actions/action';
import { ITableRow } from '../../../shared/ui/objects-view/interfaces/table-data/table-row';
import { DatePipe } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class TodoListUiService implements IObjectListUIService {
  public noItemsMessage = 'No todos';
  private datePipe: DatePipe;

  constructor(
    private router: Router, private config: ConfigService,
    private todoApiService: TodoApiService,
  ) {
    this.datePipe = new DatePipe(this.config.locale);
  }

  getObjectUIService(
    object: IBaseFleioObjectModel, permissions: IPermissionsModel, state: string
  ): IObjectUIService {
    return new TodoUiService(
      object as ITodoModel, permissions, state, this.router, this.config, this.todoApiService,
    );
  }

  getTableData(objectList: FleioObjectsList<ITodoModel>): ITableData {
    const tableData: ITableData = {
      header: {
        columns: [
          {
            type: ColumnType.Value, displayName: 'Title', enableSort: true, fieldName: 'title',
            flex: '1 0 300px', flexXs: '70',
          },
          {
            type: ColumnType.Value, displayName: 'Created at', enableSort: true, fieldName: 'created_at',
            flex: '170px', hide: {xs: true, sm: true},
          },
          {
            type: ColumnType.Value, displayName: 'Assigned to', enableSort: true, fieldName: 'assigned_to',
            flex: '1 0 300px', hide: {xs: true, sm: true},
          },
          {
            type: ColumnType.Value, displayName: 'Status', enableSort: true, fieldName: 'status',
          },
          {
            type: ColumnType.Actions, displayName: 'Actions', enableSort: false, fieldName: '(actions)',
            hide: 'xs',
          },
        ],
        columnNames: ['title', 'created_at', 'assigned_to', 'status', '(actions)'],
        showStatus: true,
      },
      rows: [],
    };

    for (const todo of objectList.objects) {
      const rowUIService = this.getObjectUIService(todo, objectList.permissions, 'table-view');
      const row: ITableRow = {
        cells: {
          title: {text: todo.title},
          created_at: {text: this.datePipe.transform(todo.created_at, 'medium')},
          assigned_to: {text: todo.assigned_to_display},
          status: {text: todo.status_display},
        },
        icon: rowUIService.getIcon(),
        status: rowUIService.getStatus(),
        actions: rowUIService.getActions(),
        url: rowUIService.getDetailsLink(),
        object: todo,
      };

      tableData.trackByFunction = (index, item: ITableRow) => item.object.id;
      tableData.rows.push(row);
    }

    return tableData;
  }

  getActions(objectList: FleioObjectsList<IBaseFleioObjectModel>): IAction[] {
    return [
      new RouterLinkAction({
        name: 'Create new todo',
        tooltip: 'Create new todo',
        icon: {name: 'add'},
        router: this.router,
        routerUrl: this.config.getPanelUrl('plugins/todo/create')
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
