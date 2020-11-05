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
import { VolumesApiService } from '@fleio-api/openstack/volume/volumes-api.service';
import { VolumeUiService } from './volume-ui.service';
import { IVolumeModel } from '@fleio-api/openstack/model/volume.model';
import { MatDialog } from '@angular/material/dialog';

@Injectable({
  providedIn: 'root'
})
export class VolumeListUIService implements IObjectListUIService {
  public noItemsMessage = 'No volumes';

  constructor(
    private router: Router, private config: ConfigService,
    private volumesApiService: VolumesApiService,
    private matDialog: MatDialog,
  ) {
  }

  getObjectUIService(
    object: IBaseFleioObjectModel, permissions: IPermissionsModel, state: string
  ): IObjectUIService {
    return new VolumeUiService(
      object as IVolumeModel, permissions, state, this.router, this.config, this.volumesApiService,
      this.matDialog,
    );
  }

  getTableData(objectList: FleioObjectsList<IVolumeModel>): ITableData {
    const tableData: ITableData = {
      header: {
        columns: [
          {
            type: ColumnType.Value, displayName: 'Name', enableSort: true, fieldName: 'name',
            flex: '1 0 400px', flexXs: '95%',
          },
          {
            type: ColumnType.Value, displayName: 'Region', enableSort: false, fieldName: 'region',
            flex: '100px', hide: {xs: true, sm: true},
          },
          {
            type: ColumnType.Value, displayName: 'Size', enableSort: false, fieldName: 'size',
            flex: '80px', hide: {xs: true, sm: true},
          },
          {
            type: ColumnType.Value, displayName: 'Client', enableSort: false, fieldName: 'client',
            flex: '180px', hide: {xs: true, sm: true, md: true},
          },
          {
            type: ColumnType.Actions, displayName: 'Actions', enableSort: false, fieldName: '(actions)',
            hide: 'xs',
          },
        ],
        columnNames: ['name', 'region', 'size', 'client', '(actions)'],
        showStatus: true,
      },
      rows: [],
    };

    for (const volume of objectList.objects) {
      const rowUIService = this.getObjectUIService(volume, objectList.permissions, 'table-view');
      const row: ITableRow = {
        cells: {
          name: {text: volume.name},
          region: {text: volume.region || ''},
          size: {text: volume.size ? (volume.size + ' GB') : ''},
          client: {
            text: volume.client ? volume.client.name : '',
            url: volume.client ? this.config.getPanelUrl(`clients-users/clients/${volume.client.id}`) : null,
          },
        },
        icon: rowUIService.getIcon(),
        status: rowUIService.getStatus(),
        actions: rowUIService.getActions(),
        url: rowUIService.getDetailsLink(),
        object: volume,
      };

      tableData.trackByFunction = (index, item: ITableRow) => item.object.id;
      tableData.rows.push(row);
    }

    return tableData;
  }

  getActions(objectList: FleioObjectsList<IBaseFleioObjectModel>): IAction[] {
    return [
      new RouterLinkAction({
        name: 'Create new volume',
        tooltip: 'Create new volume',
        icon: {name: 'add'},
        router: this.router,
        routerUrl: this.config.getPanelUrl('openstack/volumes/create')
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
