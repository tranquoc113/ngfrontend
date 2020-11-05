import { Injectable } from '@angular/core';
import { IObjectListUIService } from '@objects-view/interfaces/object-list-ui-service';
import { Router } from '@angular/router';
import { ConfigService } from '@shared/config/config.service';
import { IBaseFleioObjectModel } from '@fleio-api/base-model/base-fleio-object.model';
import { IPermissionsModel } from '@fleio-api/base-model/IPermissionsModel';
import { IObjectUIService } from '@objects-view/interfaces/object-ui-service';
import { FleioObjectsList } from '@fleio-api/fleio-objects-list';
import { ITableData } from '@objects-view/interfaces/table-data/table-data';
import { ColumnType } from '@objects-view/interfaces/table-data/column-definition';
import { ITableRow } from '@objects-view/interfaces/table-data/table-row';
import { IAction } from '@objects-view/interfaces/actions/action';
import { NetworksApiService } from '@fleio-api/openstack/network/networks-api.service';
import { INetworkModel } from '@fleio-api/openstack/model/network.model';
import { NetworkUiService } from './networks-ui.service';
import { RouterLinkAction } from '@objects-view/actions/router-link-action';

@Injectable({
  providedIn: 'root'
})
export class NetworkListUIService implements IObjectListUIService {
  public noItemsMessage = 'No networks';

  constructor(
    private router: Router, private config: ConfigService,
    private networksApiService: NetworksApiService,
  ) {
  }

  getObjectUIService(
    object: IBaseFleioObjectModel, permissions: IPermissionsModel, state: string
  ): IObjectUIService {
    return new NetworkUiService(
      object as INetworkModel, permissions, state, this.router, this.config, this.networksApiService,
    );
  }

  getTableData(objectList: FleioObjectsList<INetworkModel>): ITableData {
    const tableData: ITableData = {
      header: {
        columns: [
          {
            type: ColumnType.Value, displayName: 'Name', enableSort: true, fieldName: 'name',
            flex: '200px', flexXs: '95%',
          },
          {
            type: ColumnType.Value, displayName: 'Router', enableSort: false, fieldName: 'router',
            hide: {xs: true, sm: true, md: true},
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
        columnNames: ['name', 'router', 'region', 'description', '(actions)'],
        showStatus: false,
      },
      rows: [],
    };

    for (const network of objectList.objects) {
      const rowUIService = this.getObjectUIService(
        network, objectList.permissions, 'table-view'
      ) as NetworkUiService;

      const row: ITableRow = {
        cells: {
          name: {text: network.name},
          router: {text: network.router_external ? 'external' : 'internal'},
          region: {text: network.region},
          description: {text: network.description},
        },
        icon: rowUIService.getIcon(),
        status: rowUIService.getStatus(),
        actions: rowUIService.getActions(),
        url: rowUIService.getDetailsLink(),
        object: network,
      };

      tableData.trackByFunction = (index, item: ITableRow) => item.object.id;
      tableData.rows.push(row);
    }

    return tableData;
  }

  getActions(objectList: FleioObjectsList<IBaseFleioObjectModel>): IAction[] {
    return [
      new RouterLinkAction({
        name: 'Configure get me a network',
        tooltip: 'Configure get me a network',
        icon: {name: 'network_check'},
        router: this.router,
        routerUrl: this.config.getPanelUrl('openstack/networks/config-auto-create'),
        noPermissions: !objectList.permissions['networks.save_auto_create_network_options'],
        featureName: 'openstack.networks.auto_create_network',
      }),
      new RouterLinkAction({
        name: 'Get me a network',
        tooltip: 'Get me a network',
        icon: {name: 'network_check'},
        router: this.router,
        routerUrl: this.config.getPanelUrl('openstack/networks/auto-create'),
        noPermissions: !objectList.permissions['networks.auto_create_network'],
        featureName: 'openstack.networks.auto_create_network',
      }),
      new RouterLinkAction({
        name: 'Create new network',
        tooltip: 'Create new network',
        icon: {name: 'add'},
        router: this.router,
        routerUrl: this.config.getPanelUrl('openstack/networks/create'),
        noPermissions: !objectList.permissions['networks.create'],
      }),
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
