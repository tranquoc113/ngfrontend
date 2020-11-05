import { Injectable } from '@angular/core';
import { IObjectListUIService } from '@objects-view/interfaces/object-list-ui-service';
import { Router } from '@angular/router';
import { ConfigService } from '@shared/config/config.service';
import { MatDialog } from '@angular/material/dialog';
import { IBaseFleioObjectModel } from '@fleio-api/base-model/base-fleio-object.model';
import { IPermissionsModel } from '@fleio-api/base-model/IPermissionsModel';
import { IObjectUIService } from '@objects-view/interfaces/object-ui-service';
import { FleioObjectsList } from '@fleio-api/fleio-objects-list';
import { ITableData } from '@objects-view/interfaces/table-data/table-data';
import { ColumnType } from '@objects-view/interfaces/table-data/column-definition';
import { ITableRow } from '@objects-view/interfaces/table-data/table-row';
import { IAction } from '@objects-view/interfaces/actions/action';
import { CallbackAction } from '@objects-view/actions/callback-action';
import { map } from 'rxjs/operators';
import { IActionResult } from '@objects-view/interfaces/actions/action-result';
import { VolumeSnapshotsApiService } from '@fleio-api/openstack/volume/volume-snapshots-api.service';
import { VolumeSnapshotUiService } from './volume-snapshot-ui.service';
import { IVolumeSnapshotModel } from '@fleio-api/openstack/model/volume-snapshot.model';
import { EditVolumeSnapshotDialogComponent } from '@shared/common-dialogs/volume-snapshots/edit-volume-snapshot-dialog/edit-volume-snapshot-dialog.component';

@Injectable({
  providedIn: 'root'
})
export class VolumeSnapshotListUiService implements IObjectListUIService {
  public noItemsMessage = 'No volume snapshots';

  constructor(
    private router: Router, private config: ConfigService,
    private volumeSnapshotsApiService: VolumeSnapshotsApiService,
    private matDialog: MatDialog,
  ) {
  }

  getObjectUIService(
    object: IBaseFleioObjectModel, permissions: IPermissionsModel, state: string
  ): IObjectUIService {
    return new VolumeSnapshotUiService(
      object as IVolumeSnapshotModel, permissions, state, this.router, this.config, this.volumeSnapshotsApiService,
      this.matDialog,
    );
  }

  getTableData(objectList: FleioObjectsList<IVolumeSnapshotModel>): ITableData {
    const tableData: ITableData = {
      header: {
        columns: [
          {
            type: ColumnType.Value, displayName: 'Name', enableSort: true, fieldName: 'name',
            flex: '1 0 400px', flexXs: '95%',
          },
          {
            type: ColumnType.Value, displayName: 'Status', enableSort: true, fieldName: 'status',
            flex: '100px', hide: {xs: true, sm: true},
          },
          {
            type: ColumnType.Value, displayName: 'Size', enableSort: true, fieldName: 'size',
            flex: '80px', hide: {xs: true, sm: true},
          },
          {
            type: ColumnType.Value, displayName: 'Volume', enableSort: false, fieldName: 'volume',
            flex: '180px', hide: {xs: true, sm: true, md: true},
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
        columnNames: ['name', 'status', 'size', 'volume', 'client', '(actions)'],
        showStatus: true,
      },
      rows: [],
    };

    for (const volumeSnapshot of objectList.objects) {
      const rowUIService = this.getObjectUIService(volumeSnapshot, objectList.permissions, 'table-view');
      const row: ITableRow = {
        cells: {
          name: {text: volumeSnapshot.name || volumeSnapshot.id.toString()},
          status: {text: volumeSnapshot.status || ''},
          size: {text: volumeSnapshot.size ? (volumeSnapshot.size + ' GB') : ''},
          volume: {text: volumeSnapshot.volume ? volumeSnapshot.volume.toString() : 'n/a'},
          client: {
            text: volumeSnapshot.client ? volumeSnapshot.client.name : 'n/a',
            url: volumeSnapshot.client ? this.config.getPanelUrl(
              `clients-users/clients/${volumeSnapshot.client.id}`,
            ) : null,
          },
        },
        icon: rowUIService.getIcon(),
        status: rowUIService.getStatus(),
        actions: rowUIService.getActions(),
        url: rowUIService.getDetailsLink(),
        object: volumeSnapshot,
      };

      tableData.trackByFunction = (index, item: ITableRow) => item.object.id;
      tableData.rows.push(row);
    }

    return tableData;
  }

  getActions(objectList: FleioObjectsList<IBaseFleioObjectModel>): IAction[] {
    return [
      new CallbackAction(
        {
          object: null,
          icon: {name: 'add'},
          tooltip: 'Create volume snapshot',
          name: 'Create',
          options: {
            displayMessages: true,
            displayConfirmation: false,
          },
          noPermissions: !objectList.permissions['volumesnapshots.create'],
          callback: () => {
            return this.matDialog.open(
              EditVolumeSnapshotDialogComponent, {
                data: {}
              }).afterClosed().pipe(map(result => {
              if (!result) {
                return;
              }
              return {message: 'Snapshot create scheduled'} as IActionResult;
            }));
          },
          refreshAfterExecute: true,
        }
      )
    ];
  }

  getRefreshInterval()
    :
    number {
    if (this.config && this.config.current && this.config.current.settings &&
      this.config.current.settings.refreshIntervals) {
      return this.config.current.settings.refreshIntervals.defaultInterval;
    }

    return 10000;
  }
}
