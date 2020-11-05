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
import { PortsApiService } from '@fleio-api/openstack/port/ports-api.service';
import { PortUiService } from './ports-ui.service';
import { IPortModel } from '@fleio-api/openstack/model/port.model';

@Injectable({
  providedIn: 'root'
})
export class PortListUiService implements IObjectListUIService {
  public noItemsMessage = 'No ports';
  private datePipe: DatePipe;

  constructor(
    private router: Router, private config: ConfigService,
    private portsApiService: PortsApiService,
  ) {
    this.datePipe = new DatePipe(this.config.locale);
  }

  getObjectUIService(
    object: IBaseFleioObjectModel, permissions: IPermissionsModel, state: string
  ): IObjectUIService {
    return new PortUiService(
      object as IPortModel, permissions, state, this.router, this.config, this.portsApiService,
    );
  }

  getTableData(objectList: FleioObjectsList<IPortModel>): ITableData {
    const tableData: ITableData = {
      header: {
        columns: [
          {
            type: ColumnType.Value, displayName: 'Name', enableSort: true, fieldName: 'name',
            flex: '1 0 180px', flexXs: '60',
          },
          {
            type: ColumnType.Value, displayName: 'Fixed IPs', enableSort: false, fieldName: 'fixed_ips',
            flex: '200px', hide: {xs: true},
          },
          {
            type: ColumnType.Value, displayName: 'MAC address', enableSort: false, fieldName: 'mac_address',
            flex: '1 0 70px', hide: {xs: true, sm: true},
          },
          {
            type: ColumnType.Value, displayName: 'Device owner', enableSort: false, fieldName: 'device_owner',
            flex: '1 0 180px', hide: {xs: true, sm: true, md: true},
          },
          {
            type: ColumnType.Value, displayName: 'Admin state up', enableSort: false, fieldName: 'admin_state_up',
            flex: '1 0 50px', hide: {xs: true, sm: true},
          },
          {
            type: ColumnType.Actions, displayName: 'Actions', enableSort: false, fieldName: '(actions)',
          },
        ],
        columnNames: ['name', 'fixed_ips', 'mac_address', 'device_owner', 'admin_state_up', '(actions)'],
        showStatus: true,
      },
      rows: [],
    };

    for (const port of objectList.objects) {
      const portUiService = this.getObjectUIService(
        port, objectList.permissions, 'table-view'
      ) as PortUiService;
      const row: ITableRow = {
        cells: {
          name: {text: port.name || port.id.toString()},
          fixed_ips: {text: portUiService.getFixedIPs() || 'n/a'},
          mac_address: {text: port.mac_address},
          device_owner: {text: port.device_owner},
          admin_state_up: {text: port.admin_state_up ? 'UP' : 'DOWN'},
        },
        icon: portUiService.getIcon(),
        status: portUiService.getStatus(),
        actions: portUiService.getActions(),
        url: portUiService.getDetailsLink(),
        object: port,
      };

      tableData.trackByFunction = (index, item: ITableRow) => item.object.id;
      tableData.rows.push(row);
    }

    return tableData;
  }

  getActions(objectList: FleioObjectsList<IBaseFleioObjectModel>): IAction[] {
    return [
      new RouterLinkAction({
        name: 'Create port',
        tooltip: 'Create port',
        icon: {name: 'add'},
        router: this.router,
        routerUrl: this.config.getPanelUrl('openstack/ports/create')
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
