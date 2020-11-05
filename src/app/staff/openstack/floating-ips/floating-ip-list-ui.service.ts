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
import { FloatingIpsApiService } from '@fleio-api/openstack/floating-ips/floating-ips-api.service';
import { FloatingIpUiService } from './floating-ip-ui.service';
import { IFloatingIpModel } from '@fleio-api/openstack/floating-ips/model/floating-ip.model';

@Injectable({
  providedIn: 'root'
})
export class FloatingIpListUiService implements IObjectListUIService {
  public noItemsMessage = 'No floating ips';
  private datePipe: DatePipe;

  constructor(
    private router: Router, private config: ConfigService,
    private floatingIpsApiService: FloatingIpsApiService,
  ) {
    this.datePipe = new DatePipe(this.config.locale);
  }

  getObjectUIService(
    object: IBaseFleioObjectModel, permissions: IPermissionsModel, state: string
  ): IObjectUIService {
    return new FloatingIpUiService(
      object as IFloatingIpModel, permissions, state, this.router, this.config, this.floatingIpsApiService,
    );
  }

  getTableData(objectList: FleioObjectsList<IFloatingIpModel>): ITableData {
    const tableData: ITableData = {
      header: {
        columns: [
          {
            type: ColumnType.Value, displayName: 'IP address', enableSort: true, fieldName: 'floating_ip_address',
            flex: '1 0 180px', flexXs: '60',
          },
          {
            type: ColumnType.Value, displayName: 'Status', enableSort: true, fieldName: 'status',
            flex: '100px', hide: {xs: true},
          },
          {
            type: ColumnType.Value, displayName: 'Network', enableSort: true, fieldName: 'floating_network',
            flex: '1 0 120px', hide: {xs: true, sm: true},
          },
          {
            type: ColumnType.Value, displayName: 'Region', enableSort: false, fieldName: 'region',
            flex: '1 0 180px', hide: {xs: true, sm: true, md: true},
          },
          {
            type: ColumnType.Value, displayName: 'Client', enableSort: false, fieldName: 'client',
            flex: '1 0 50px', hide: {xs: true, sm: true},
          },
          {
            type: ColumnType.Actions, displayName: 'Actions', enableSort: false, fieldName: '(actions)',
          },
        ],
        columnNames: ['floating_ip_address', 'status', 'floating_network', 'region', 'client', '(actions)'],
        showStatus: true,
      },
      rows: [],
    };

    for (const floatingIp of objectList.objects) {
      const floatingIpUiService = this.getObjectUIService(
        floatingIp, objectList.permissions, 'table-view'
      ) as FloatingIpUiService;
      const row: ITableRow = {
        cells: {
          floating_ip_address: {text: floatingIp.floating_ip_address || 'n/a'},
          status: {text: floatingIp.status || 'n/a'},
          floating_network: {text: floatingIp.floating_network.name},
          region: {text: floatingIp.floating_network.region},
          client: {text: floatingIp.client ? floatingIp.client.name : 'n/a'},
        },
        icon: floatingIpUiService.getIcon(),
        status: floatingIpUiService.getStatus(),
        actions: floatingIpUiService.getActions(),
        url: floatingIpUiService.getDetailsLink(),
        object: floatingIp,
      };

      tableData.trackByFunction = (index, item: ITableRow) => item.object.id;
      tableData.rows.push(row);
    }

    return tableData;
  }

  getActions(objectList: FleioObjectsList<IBaseFleioObjectModel>): IAction[] {
    return [
      new RouterLinkAction({
        name: 'Create floating ip',
        tooltip: 'Create floating ip',
        icon: {name: 'add'},
        router: this.router,
        routerUrl: this.config.getPanelUrl('openstack/floating-ips/create')
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
