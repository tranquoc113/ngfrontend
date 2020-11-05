import { Injectable } from '@angular/core';
import { IObjectListUIService } from '@objects-view/interfaces/object-list-ui-service';
import { DatePipe } from '@angular/common';
import { ConfigService } from '@shared/config/config.service';
import { Router } from '@angular/router';
import { IBaseFleioObjectModel } from '@fleio-api/base-model/base-fleio-object.model';
import { IPermissionsModel } from '@fleio-api/base-model/IPermissionsModel';
import { IObjectUIService } from '@objects-view/interfaces/object-ui-service';
import { FleioObjectsList } from '@fleio-api/fleio-objects-list';
import { ITableData } from '@objects-view/interfaces/table-data/table-data';
import { ColumnType } from '@objects-view/interfaces/table-data/column-definition';
import { ITableRow } from '@objects-view/interfaces/table-data/table-row';
import { IAction } from '@objects-view/interfaces/actions/action';
import { RouterLinkAction } from '@objects-view/actions/router-link-action';
import { SubnetPoolsApiService } from '@fleio-api/openstack/subnet-pools/subnet-pools-api.service';
import { SubnetPoolUiService } from './subnet-pool-ui.service';
import { ISubnetPoolModel } from '@fleio-api/openstack/subnet-pools/model/subnet-pool.model';

@Injectable({
  providedIn: 'root'
})
export class SubnetPoolListUiService implements IObjectListUIService {
  public noItemsMessage = 'No subnet pools';
  private datePipe: DatePipe;

  constructor(
    private router: Router, private config: ConfigService,
    private subnetPoolsApiService: SubnetPoolsApiService,
  ) {
    this.datePipe = new DatePipe(this.config.locale);
  }

  getObjectUIService(
    object: IBaseFleioObjectModel, permissions: IPermissionsModel, state: string
  ): IObjectUIService {
    return new SubnetPoolUiService(
      object as ISubnetPoolModel, permissions, state, this.router, this.config, this.subnetPoolsApiService,
    );
  }

  getTableData(objectList: FleioObjectsList<ISubnetPoolModel>): ITableData {
    const tableData: ITableData = {
      header: {
        columns: [
          {
            type: ColumnType.Value, displayName: 'Name', enableSort: true, fieldName: 'name',
            flex: '1 0 180px', flexXs: '60',
          },
          {
            type: ColumnType.Value, displayName: 'Is shared', enableSort: false, fieldName: 'shared',
            flex: '1 0 180px', flexXs: '60',
          },
          {
            type: ColumnType.Value, displayName: 'Region', enableSort: true, fieldName: 'region',
            flex: '1 0 70px', hide: {xs: true, sm: true},
          },
          {
            type: ColumnType.Value, displayName: 'Prefixes', enableSort: true, fieldName: 'prefixes',
            flex: '1 0 180px', hide: {xs: true, sm: true, md: true},
          },
          {
            type: ColumnType.Value, displayName: 'Description', enableSort: false, fieldName: 'description',
            flex: '1 0 50px', hide: {xs: true, sm: true},
          },
          {
            type: ColumnType.Actions, displayName: 'Actions', enableSort: false, fieldName: '(actions)',
          },
        ],
        columnNames: ['name', 'shared', 'region', 'prefixes', 'description', '(actions)'],
        showStatus: true,
      },
      rows: [],
    };

    for (const subnetPool of objectList.objects) {
      const subnetPoolUiService = this.getObjectUIService(
        subnetPool, objectList.permissions, 'table-view'
      ) as SubnetPoolUiService;
      const row: ITableRow = {
        cells: {
          name: {text: subnetPool.name},
          shared: {text: subnetPool.shared ? 'SHARED': 'NOT SHARED' },
          region: {text: subnetPool.region},
          prefixes: {text: subnetPool.prefixes.join(', ')},
          description: {text: subnetPool.description},
        },
        icon: subnetPoolUiService.getIcon(),
        status: subnetPoolUiService.getStatus(),
        actions: subnetPoolUiService.getActions(),
        url: subnetPoolUiService.getDetailsLink(),
        object: subnetPool,
      };

      tableData.trackByFunction = (index, item: ITableRow) => item.object.id;
      tableData.rows.push(row);
    }

    return tableData;
  }

  getActions(objectList: FleioObjectsList<IBaseFleioObjectModel>): IAction[] {
    return [
      new RouterLinkAction({
        name: 'Create subnet pool',
        tooltip: 'Create subnet pool',
        icon: {name: 'add'},
        router: this.router,
        routerUrl: this.config.getPanelUrl('openstack/subnet-pools/create'),
        noPermissions: !objectList.permissions['subnetpools.create'],
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
