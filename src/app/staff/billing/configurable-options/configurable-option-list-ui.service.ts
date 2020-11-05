import { Injectable } from '@angular/core';
import { IObjectListUIService } from '@objects-view/interfaces/object-list-ui-service';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import { ConfigService } from '@shared/config/config.service';
import { IBaseFleioObjectModel } from '@fleio-api/base-model/base-fleio-object.model';
import { ConfigurableOptionsApiService } from '@fleio-api/billing/configurable-options/configurable-option-api.service';
import { IConfigOptionModel } from '@fleio-api/billing/model/config-option.model';
import { IPermissionsModel } from '@fleio-api/base-model/IPermissionsModel';
import { IObjectUIService } from '@objects-view/interfaces/object-ui-service';
import { ConfigurableOptionUiService } from './configurable-option-ui.service';
import { FleioObjectsList } from '@fleio-api/fleio-objects-list';
import { ITableData } from '@objects-view/interfaces/table-data/table-data';
import { ColumnType } from '@objects-view/interfaces/table-data/column-definition';
import { ITableRow } from '@objects-view/interfaces/table-data/table-row';
import { IAction } from '@objects-view/interfaces/actions/action';
import { RouterLinkAction } from '@objects-view/actions/router-link-action';

@Injectable({
  providedIn: 'root'
})
export class ConfigurableOptionListUiService implements IObjectListUIService {
  public noItemsMessage = 'No configurable options';
  private datePipe: DatePipe;

  constructor(
    private router: Router, private config: ConfigService,
    private configurableOptionsApiService: ConfigurableOptionsApiService,
  ) {
    this.datePipe = new DatePipe(this.config.locale);
  }

  getObjectUIService(
    configOption: IConfigOptionModel, permissions: IPermissionsModel, state: string
  ): IObjectUIService {
    return new ConfigurableOptionUiService(
      configOption as IConfigOptionModel, permissions, state, this.router, this.config,
      this.configurableOptionsApiService,
    );
  }

  getTableData(objectList: FleioObjectsList<IConfigOptionModel>): ITableData {
    const tableData: ITableData = {
      header: {
        columns: [
          {
            type: ColumnType.Value, displayName: 'ID', enableSort: false, fieldName: 'id',
            flex: '1 0 50px', flexXs: '70',
          },
          {
            type: ColumnType.Value, displayName: 'Name', enableSort: false, fieldName: 'name',
            flex: '250px', hide: {xs: true},
          },
          {
            type: ColumnType.Value, displayName: 'Description', enableSort: false, fieldName: 'description',
            flex: '1 0 150px', hide: {xs: true, sm: true},
          },
          {
            type: ColumnType.Value, displayName: 'Status', enableSort: false, fieldName: 'status',
            hide: {xs: true, sm: true},
          },
          {
            type: ColumnType.Value, displayName: 'Widget', enableSort: false, fieldName: 'widget',
            hide: {xs: true, sm: true},
          },
          {
            type: ColumnType.Actions, displayName: 'Actions', enableSort: false, fieldName: '(actions)',
          },
        ],
        columnNames: ['id', 'name', 'description', 'status', 'widget', '(actions)'],
        showStatus: false,
      },
      rows: [],
    };

    for (const configOption of objectList.objects) {
      const rowUIService = this.getObjectUIService(configOption, objectList.permissions, 'table-view');
      const row: ITableRow = {
        cells: {
          id: {text: configOption.id.toString()},
          name: {text: configOption.name},
          description: {text: configOption.description},
          status: {text: configOption.status},
          widget: {text: configOption.widget},
        },
        icon: rowUIService.getIcon(),
        status: rowUIService.getStatus(),
        actions: rowUIService.getActions(),
        url: rowUIService.getDetailsLink(),
        object: configOption,
      };

      tableData.trackByFunction = (index, item: ITableRow) => item.object.id;
      tableData.rows.push(row);
    }

    return tableData;
  }

  getActions(objectList: FleioObjectsList<IBaseFleioObjectModel>): IAction[] {
    return [
      new RouterLinkAction({
        name: 'Create configurable option',
        tooltip: 'Create configurable option',
        icon: {name: 'add'},
        router: this.router,
        routerUrl: this.config.getPanelUrl('billing/configurable-options/create')
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
