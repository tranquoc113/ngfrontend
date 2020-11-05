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
import { ConfigurationsApiService } from '../../../shared/fleio-api/configurations/configurations-api.service';
import { ConfigurationUiService } from './configuration-ui.service';
import { IConfigurationModel } from '../../../shared/fleio-api/configurations/model/configuration.model';

@Injectable({
  providedIn: 'root'
})
export class ConfigurationListUIService implements IObjectListUIService {
  public noItemsMessage = 'No configurations';

  constructor(
    private router: Router, private config: ConfigService,
    private configurationsApiService: ConfigurationsApiService,
  ) {
  }

  getObjectUIService(
    object: IBaseFleioObjectModel, permissions: IPermissionsModel, state: string
  ): IObjectUIService {
    return new ConfigurationUiService(
      object as IConfigurationModel, permissions, state, this.router, this.config, this.configurationsApiService,
    );
  }

  getTableData(objectList: FleioObjectsList<IConfigurationModel>): ITableData {
    const tableData: ITableData = {
      header: {
        columns: [
          {type: ColumnType.Value, displayName: 'Name', enableSort: true, fieldName: 'name'},
          {type: ColumnType.Value, displayName: 'Labels', enableSort: false, fieldName: 'tags'},
          {
            type: ColumnType.Value, displayName: 'Description', enableSort: false, fieldName: 'description',
            flex: '50', hide: {xs: true},
          },
          {type: ColumnType.Actions, displayName: 'Actions', enableSort: false, fieldName: '(actions)'},
        ],
        columnNames: ['name', 'tags', 'description', '(actions)'],
        showStatus: true,
      },
      rows: [],
    };

    for (const configuration of objectList.objects) {
      const rowUIService = this.getObjectUIService(configuration, objectList.permissions, 'table-view');
      const row: ITableRow = {
        cells: {
          name: {text: configuration.name},
          tags: {tags: rowUIService.getCardTags()},
          description: {text: configuration.description},
        },
        icon: rowUIService.getIcon(),
        status: rowUIService.getStatus(),
        actions: rowUIService.getActions(),
        url: rowUIService.getDetailsLink(),
        object: configuration,
      };

      tableData.trackByFunction = (index, item: ITableRow) => item.object.id;
      tableData.rows.push(row);
    }

    return tableData;
  }

  getActions(objectList: FleioObjectsList<IBaseFleioObjectModel>): IAction[] {
    return [
      new RouterLinkAction({
        name: 'Create new configuration',
        tooltip: 'Create new configuration',
        icon: {name: 'add'},
        router: this.router,
        routerUrl: this.config.getPanelUrl('settings/configurations/create')
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
