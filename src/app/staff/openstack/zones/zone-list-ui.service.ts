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
import { RouterLinkAction } from '@objects-view/actions/router-link-action';
import { DatePipe } from '@angular/common';
import { ZonesApiService } from '@fleio-api/openstack/zone/zones-api.service';
import { ZoneUiService } from './zone-ui.service';
import { IZoneModel } from '@fleio-api/openstack/zone/model/zone.model';

@Injectable({
  providedIn: 'root'
})
export class ZoneListUIService implements IObjectListUIService {
  public noItemsMessage = 'No zones';

  private readonly datePipe: DatePipe;

  constructor(
    private router: Router, private config: ConfigService,
    private zonesApiService: ZonesApiService,
  ) {
    this.datePipe = new DatePipe(this.config.locale);
  }

  getObjectUIService(
    object: IBaseFleioObjectModel, permissions: IPermissionsModel, state: string
  ): IObjectUIService {
    return new ZoneUiService(
      object as IZoneModel, permissions, state, this.router, this.config, this.zonesApiService,
    );
  }

  getTableData(objectList: FleioObjectsList<IZoneModel>): ITableData {
    const tableData: ITableData = {
      header: {
        columns: [
          {
            type: ColumnType.Value, displayName: 'Name', enableSort: true, fieldName: 'name',
            flex: '250px', flexXs: '1 0 200px'
          },
          {
            type: ColumnType.Value, displayName: 'Status', enableSort: true, fieldName: 'status',
            flex: '120px', hide: {xs: true},
          },
          {
            type: ColumnType.Value, displayName: 'Created at', enableSort: false, fieldName: 'created_at',
            flex: '120px', hide: {xs: true, sm: true},
          },
          {
            type: ColumnType.Value, displayName: 'Email', enableSort: false, fieldName: 'email',
            flex: '1 0 250px', hide: {xs: true, sm: true},
          },
          {
            type: ColumnType.Actions, displayName: 'Actions', enableSort: false, fieldName: '(actions)',
          },
        ],
        columnNames: [
          'name', 'status', 'created_at', 'email', '(actions)'
        ],
        showStatus: true,
      },
      rows: [],
    };

    for (const zone of objectList.objects) {
      const rowUIService = this.getObjectUIService(zone, objectList.permissions, 'table-view');
      const row: ITableRow = {
        cells: {
          name: {text: zone.name},
          status: {text: zone.status ? zone.status.toLocaleUpperCase() : 'n/a'},
          created_at: {text: this.datePipe.transform(zone.created_at)},
          email: {text: zone.email},
        },
        icon: rowUIService.getIcon(),
        status: rowUIService.getStatus(),
        actions: rowUIService.getActions(),
        url: rowUIService.getDetailsLink(),
        object: zone,
      };

      tableData.trackByFunction = (index, item: ITableRow) => item.object.id;
      tableData.rows.push(row);
    }

    return tableData;
  }

  getActions(objectList: FleioObjectsList<IBaseFleioObjectModel>): IAction[] {
    return [
      new RouterLinkAction({
        name: 'Create new zone',
        tooltip: 'Create new zone',
        icon: {name: 'add'},
        router: this.router,
        routerUrl: this.config.getPanelUrl('openstack/zones/create'),
        noPermissions: !objectList.permissions['dns.create'],
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
