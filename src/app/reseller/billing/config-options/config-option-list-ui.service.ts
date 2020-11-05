import { Injectable } from '@angular/core';
import { IObjectListUIService } from '../../../shared/ui/objects-view/interfaces/object-list-ui-service';
import { Router } from '@angular/router';
import { ConfigService } from '../../../shared/config/config.service';
import { IBaseFleioObjectModel } from '../../../shared/fleio-api/base-model/base-fleio-object.model';
import { IPermissionsModel } from '../../../shared/fleio-api/base-model/IPermissionsModel';
import { IObjectUIService } from '../../../shared/ui/objects-view/interfaces/object-ui-service';
import { FleioObjectsList } from '../../../shared/fleio-api/fleio-objects-list';
import { ITableData } from '../../../shared/ui/objects-view/interfaces/table-data/table-data';
import { ColumnType } from '../../../shared/ui/objects-view/interfaces/table-data/column-definition';
import { ITableRow } from '../../../shared/ui/objects-view/interfaces/table-data/table-row';
import { IAction } from '../../../shared/ui/objects-view/interfaces/actions/action';
import { RouterLinkAction } from '../../../shared/ui/objects-view/actions/router-link-action';
import { ConfigurableOptionsApiService } from '../../../shared/fleio-api/billing/configurable-options/configurable-option-api.service';
import { ConfigOptionUiService } from './config-option-ui.service';
import { IConfigOptionModel } from '../../../shared/fleio-api/billing/model/config-option.model';

@Injectable({
  providedIn: 'root'
})
export class ConfigOptionListUIService implements IObjectListUIService {
  public noItemsMessage = 'No config. options';

  constructor(
    private router: Router, private config: ConfigService,
    private configurableOptionsApiService: ConfigurableOptionsApiService,
  ) {
  }

  getObjectUIService(
    object: IBaseFleioObjectModel, permissions: IPermissionsModel, state: string
  ): IObjectUIService {
    return new ConfigOptionUiService(
      object as IConfigOptionModel, permissions, state, this.router, this.config,
      this.configurableOptionsApiService,
    );
  }

  getTableData(objectList: FleioObjectsList<IConfigOptionModel>): ITableData {
    const tableData: ITableData = {
      header: {
        columns: [
          {type: ColumnType.Value, displayName: 'Name', enableSort: true, fieldName: 'name'},
        ],
        columnNames: ['name'],
        showStatus: true,
      },
      rows: [],
    };

    for (const configOption of objectList.objects) {
      const rowUIService = this.getObjectUIService(configOption, objectList.permissions, 'table-view');
      const row: ITableRow = {
        cells: {
          name: {text: configOption.name},
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
        name: 'Create new configurable option',
        tooltip: 'Create new configurable option',
        icon: {name: 'add'},
        router: this.router,
        routerUrl: this.config.getPanelUrl('billing/config-options/create')
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
