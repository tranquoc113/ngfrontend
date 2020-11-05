import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { IBaseFleioObjectModel } from '@fleio-api/base-model/base-fleio-object.model';
import { IObjectListUIService } from '@objects-view/interfaces/object-list-ui-service';
import { IPermissionsModel } from '@fleio-api/base-model/IPermissionsModel';
import { ConfigService } from '@shared/config/config.service';
import { IInstanceModel } from '@fleio-api/openstack/model/instance.model';
import { IObjectUIService } from '@objects-view/interfaces/object-ui-service';
import { InstanceUIService } from './instance-ui.service';
import { InstancesApiService } from '@fleio-api/openstack/instance/instances-api.service';
import { ITableData } from '@objects-view/interfaces/table-data/table-data';
import { FleioObjectsList } from '@fleio-api/fleio-objects-list';
import { ITableRow } from '@objects-view/interfaces/table-data/table-row';
import { ColumnType } from '@objects-view/interfaces/table-data/column-definition';
import { IAction } from '@objects-view/interfaces/actions/action';
import { RouterLinkAction } from '@objects-view/actions/router-link-action';
import { MatDialog } from '@angular/material/dialog';
import { DatePipe } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class InstanceListUIService implements IObjectListUIService {
  public noItemsMessage = 'No instances';

  constructor(
    private router: Router, private config: ConfigService, private instancesApi: InstancesApiService,
    private matDialog: MatDialog
  ) {
  }

  getObjectUIService(
    object: IBaseFleioObjectModel, permissions: IPermissionsModel, state: string
  ): IObjectUIService {
    return new InstanceUIService(
      object as IInstanceModel, permissions, state, this.router, this.config, this.instancesApi, this.matDialog
    );
  }

  getTableData(objectList: FleioObjectsList<IInstanceModel>): ITableData {
    const tableData: ITableData = {
      header: {
        columns: [
          {
            type: ColumnType.Image, displayName: '', enableSort: false, fieldName: '(image)',
            flex: '35px'
          },
          {
            type: ColumnType.Value, displayName: 'Name', enableSort: true, fieldName: 'name',
            flex: '30%', flexXs: '150px'
          },
          {
            type: ColumnType.Value, displayName: 'Created at', enableSort: true, fieldName: 'created',
            flex: '110px', hide: {xs: true, sm: true, md: true},
          },
          {
            type: ColumnType.Value, displayName: 'Hypervisor', enableSort: false, fieldName: 'host_name',
            flex: '100px', hide: {xs: true, sm: true, md: true},
          },
          {
            type: ColumnType.Value, displayName: 'Access IP', enableSort: false, fieldName: 'access_ip',
            flex: '100px',
          },
          {
            type: ColumnType.Value, displayName: 'Flavor', enableSort: false, fieldName: 'flavor',
            flex: '90px', hide: {xs: true, sm: true},
          },
          {
            type: ColumnType.Value, displayName: 'Region', enableSort: true, fieldName: 'region',
            flex: '90px', hide: {xs: true, sm: true},
          },
          {
            type: ColumnType.Actions, displayName: 'Actions', enableSort: false, fieldName: '(actions)',
          },
        ],
        columnNames: ['(image)', 'name', 'created', 'host_name', 'access_ip', 'flavor', 'region', '(actions)'],
        showStatus: true,
        visibleActions: 0,
      },
      rows: [],
    };
    const datePipe = new DatePipe(this.config.locale);
    for (const instance of objectList.objects) {
      const rowUIService = this.getObjectUIService(instance, objectList.permissions, 'table-view');
      const row: ITableRow = {
        cells: {
          name: {text: instance.name, subText: instance.display_status.toLocaleUpperCase()},
          created: {text: datePipe.transform(instance.created)},
          host_name: {text: instance.host_name},
          access_ip: {text: instance.access_ip},
          flavor: {text: instance.flavor ? instance.flavor.name : 'n/a'},
          region: {text: instance.region},
        },
        icon: rowUIService.getIcon(),
        status: rowUIService.getStatus(),
        actions: rowUIService.getActions(),
        url: rowUIService.getDetailsLink(),
        object: instance,
      };

      tableData.trackByFunction = (index, item: ITableRow) => item.object.id;
      tableData.rows.push(row);
    }

    return tableData;
  }

  getActions(objectList: FleioObjectsList<IBaseFleioObjectModel>): IAction[] {
    return [
      new RouterLinkAction({
        name: 'Create new instance',
        tooltip: 'Create new instance',
        icon: {name: 'add'},
        router: this.router,
        routerUrl: this.config.getPanelUrl('openstack/instances/create')
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
