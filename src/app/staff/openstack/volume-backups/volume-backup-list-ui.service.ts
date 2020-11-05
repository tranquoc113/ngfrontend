import { Injectable } from '@angular/core';
import { IObjectListUIService } from '@objects-view/interfaces/object-list-ui-service';
import { Router } from '@angular/router';
import { ConfigService } from '@shared/config/config.service';
import { VolumeBackupsApiService } from '@fleio-api/openstack/volume/volume-backups-api.service';
import { MatDialog } from '@angular/material/dialog';
import { IBaseFleioObjectModel } from '@fleio-api/base-model/base-fleio-object.model';
import { IPermissionsModel } from '@fleio-api/base-model/IPermissionsModel';
import { IObjectUIService } from '@objects-view/interfaces/object-ui-service';
import { VolumeBackupUiService } from './volume-backup-ui.service';
import { IVolumeBackupModel } from '@fleio-api/openstack/model/volume-backup.model';
import { FleioObjectsList } from '@fleio-api/fleio-objects-list';
import { ITableData } from '@objects-view/interfaces/table-data/table-data';
import { ColumnType } from '@objects-view/interfaces/table-data/column-definition';
import { ITableRow } from '@objects-view/interfaces/table-data/table-row';
import { IAction } from '@objects-view/interfaces/actions/action';
import { CallbackAction } from '@objects-view/actions/callback-action';
import { EditVolumeBackupDialogComponent } from '@shared/common-dialogs/openstack/volme-backups/edit-volume-backup-dialog/edit-volume-backup-dialog.component';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class VolumeBackupListUIService implements IObjectListUIService {
  public noItemsMessage = 'No volume backups';

  constructor(
    private router: Router, private config: ConfigService,
    private volumeBackupsApiService: VolumeBackupsApiService,
    private matDialog: MatDialog,
  ) {
  }

  getObjectUIService(
    object: IBaseFleioObjectModel, permissions: IPermissionsModel, state: string
  ): IObjectUIService {
    return new VolumeBackupUiService(
      object as IVolumeBackupModel, permissions, state, this.router, this.config, this.volumeBackupsApiService,
      this.matDialog,
    );
  }

  getTableData(objectList: FleioObjectsList<IVolumeBackupModel>): ITableData {
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
            type: ColumnType.Value, displayName: 'Incremental', enableSort: false, fieldName: 'incremental',
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
        columnNames: ['name', 'status', 'size', 'volume', 'incremental', 'client', '(actions)'],
        showStatus: false,
      },
      rows: [],
    };

    for (const volumeBackup of objectList.objects) {
      const rowUIService = this.getObjectUIService(volumeBackup, objectList.permissions, 'table-view');
      const row: ITableRow = {
        cells: {
          name: {text: volumeBackup.name || volumeBackup.id.toString()},
          status: {text: volumeBackup.status || ''},
          size: {text: volumeBackup.size ? (volumeBackup.size + ' GB') : ''},
          volume: {text: volumeBackup.volume ? volumeBackup.volume.toString() : 'n/a'},
          incremental: {text: volumeBackup.is_incremental ? 'Yes' : 'No'},
          client: {
            text: volumeBackup.client ? volumeBackup.client.name : 'n/a',
            url: volumeBackup.client ? this.config.getPanelUrl(
              `clients-users/clients/${volumeBackup.client.id}`,
            ) : null,
          },
        },
        icon: rowUIService.getIcon(),
        status: rowUIService.getStatus(),
        actions: rowUIService.getActions(),
        url: rowUIService.getDetailsLink(),
        object: volumeBackup,
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
          tooltip: 'Create volume backup',
          name: 'Create',
          options: {
            displayMessages: true,
            displayConfirmation: false,
          },
          noPermissions: !objectList.permissions['volumebackups.create'],
          callback: () => {
            return this.matDialog.open(
              EditVolumeBackupDialogComponent, {
                data: {}
              }).afterClosed().pipe(map(result => {
              if (result === 'Ok') {
                return {message: 'Backup create scheduled'};
              } else {
                return {message: null};
              }
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
