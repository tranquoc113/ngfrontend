import { Injectable } from '@angular/core';
import { IObjectListUIService } from '@objects-view/interfaces/object-list-ui-service';
import { Router } from '@angular/router';
import { ConfigService } from '@shared/config/config.service';
import { RoutersApiService } from '@fleio-api/openstack/routers/routers-api.service';
import { IBaseFleioObjectModel } from '@fleio-api/base-model/base-fleio-object.model';
import { IPermissionsModel } from '@fleio-api/base-model/IPermissionsModel';
import { IObjectUIService } from '@objects-view/interfaces/object-ui-service';
import { RouterUiService } from './router-ui.service';
import { IRouterModel } from '@fleio-api/openstack/model/router.model';
import { FleioObjectsList } from '@fleio-api/fleio-objects-list';
import { ITableData } from '@objects-view/interfaces/table-data/table-data';
import { ColumnType } from '@objects-view/interfaces/table-data/column-definition';
import { ITableRow } from '@objects-view/interfaces/table-data/table-row';
import { IAction } from '@objects-view/interfaces/actions/action';
import { RouterLinkAction } from '@objects-view/actions/router-link-action';

@Injectable({
  providedIn: 'root'
})
export class RouterListUIService implements IObjectListUIService {
  public noItemsMessage = 'No routers';

  constructor(
    private router: Router, private config: ConfigService,
    private routersApiService: RoutersApiService,
  ) {
  }

  getObjectUIService(
    object: IBaseFleioObjectModel, permissions: IPermissionsModel, state: string
  ): IObjectUIService {
    return new RouterUiService(
      object as IRouterModel, permissions, state, this.router, this.config, this.routersApiService,
    );
  }

  getTableData(objectList: FleioObjectsList<IRouterModel>): ITableData {
    const tableData: ITableData = {
      header: {
        columns: [
          {
            type: ColumnType.Value, displayName: 'Name', enableSort: true, fieldName: 'name',
            flex: '200px', flexXs: '95%',
          },
          {
            type: ColumnType.Value, displayName: 'Status', enableSort: false, fieldName: 'status',
            hide: {xs: true, sm: true, md: true},
          },
          {
            type: ColumnType.Value, displayName: 'Network name', enableSort: false, fieldName: 'network_name',
            flex: '100px', hide: {xs: true},
          },
          {
            type: ColumnType.Value, displayName: 'Region', enableSort: true, fieldName: 'region',
            hide: {xs: true, sm: true},
          },
          {
            type: ColumnType.Value, displayName: 'Description', enableSort: false, fieldName: 'description',
            hide: {xs: true, sm: true},
          },
          {
            type: ColumnType.Actions, displayName: 'Actions', enableSort: false, fieldName: '(actions)',
            hide: {xs: true},
          },
        ],
        columnNames: ['name', 'status', 'network_name', 'region', 'description', '(actions)'],
        showStatus: false,
      },
      rows: [],
    };

    for (const router of objectList.objects) {
      const rowUIService = this.getObjectUIService(
        router, objectList.permissions, 'table-view'
      ) as RouterUiService;

      const row: ITableRow = {
        cells: {
          name: {text: router.name},
          status: {text: router.status},
          network_name: {text: router.network_name},
          region: {text: router.region},
          description: {text: router.description},
        },
        icon: rowUIService.getIcon(),
        status: rowUIService.getStatus(),
        actions: rowUIService.getActions(),
        url: rowUIService.getDetailsLink(),
        object: router,
      };

      tableData.trackByFunction = (index, item: ITableRow) => item.object.id;
      tableData.rows.push(row);
    }

    return tableData;
  }

  getActions(objectList: FleioObjectsList<IBaseFleioObjectModel>): IAction[] {
    return [
      new RouterLinkAction({
        name: 'Create new router',
        tooltip: 'Create new router',
        icon: {name: 'add'},
        router: this.router,
        routerUrl: this.config.getPanelUrl('openstack/routers/create')
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
