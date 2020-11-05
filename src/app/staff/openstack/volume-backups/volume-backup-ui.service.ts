import { ObjectUIServiceBase } from '@objects-view/object-ui-service-base';
import { IVolumeBackupModel } from '@fleio-api/openstack/model/volume-backup.model';
import { Router } from '@angular/router';
import { ConfigService } from '@shared/config/config.service';
import { VolumeBackupsApiService } from '@fleio-api/openstack/volume/volume-backups-api.service';
import { DatePipe } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { IPermissionsModel } from '@fleio-api/base-model/IPermissionsModel';
import { ITitle } from '@objects-view/interfaces/card-data/card-title';
import { IAction } from '@objects-view/interfaces/actions/action';
import { CallbackAction } from '@objects-view/actions/callback-action';
import { RestoreVolumeBackupDialogComponent } from '@shared/common-dialogs/openstack/volme-backups/restore-volume-backup-dialog/restore-volume-backup-dialog.component';
import { map } from 'rxjs/operators';
import { IActionResult } from '@objects-view/interfaces/actions/action-result';
import { ApiCallAction, CallType } from '@objects-view/actions/api-call-action';
import { IIcon } from '@shared/ui/common/interfaces/icon';
import { IObjectStatus, StatusType, StatusValue } from '@objects-view/interfaces/object-status';
import { IDataField } from '@objects-view/interfaces/card-data/data-field';
import { FleioObjectsList } from '@fleio-api/fleio-objects-list';
import { IDetailsTab } from '@objects-view/interfaces/details/details-tab';
import { VolumeBackupDetailsOverviewComponent } from './tabs/volume-backup-details-overview/volume-backup-details-overview.component';
import { EditVolumeBackupDialogComponent } from '@shared/common-dialogs/openstack/volme-backups/edit-volume-backup-dialog/edit-volume-backup-dialog.component';

export class VolumeBackupUiService extends ObjectUIServiceBase<IVolumeBackupModel> {
  private readonly router: Router;
  private readonly config: ConfigService;
  private readonly volumeBackupsApiService: VolumeBackupsApiService;
  private readonly datePipe: DatePipe;
  private readonly matDialog: MatDialog;


  constructor(
    volumeBackupModel: IVolumeBackupModel, permissions: IPermissionsModel, state: string,
    router: Router, config: ConfigService, volumeBackupsApiService: VolumeBackupsApiService, matDialog: MatDialog,
  ) {
    super(volumeBackupModel, permissions, state);
    this.matDialog = matDialog;
    this.router = router;
    this.config = config;
    this.volumeBackupsApiService = volumeBackupsApiService;
    this.datePipe = new DatePipe(this.config.locale);
  }

  getIcon(): IIcon {
    return null;
  }

  getStatus(): IObjectStatus {
    switch (this.object.status) {
      case 'error':
      case 'error_deleting':
        return {
          value: StatusValue.Error,
          type: StatusType.Defined,
        };
      case 'deleting':
        return {
          value: StatusValue.Error,
          type: StatusType.Changing,
        };
      case 'attaching':
      case 'creating':
      case 'restoring':
        return {
          value: StatusValue.Pending,
          type: StatusType.Changing,
        };
      case 'available':
      default:
        return {
          value: StatusValue.Enabled,
          type: StatusType.Defined,
        };
    }
  }

  getTitle(): ITitle {
    switch (this.state) {
      case 'edit':
        return {
          text: `Edit volume backup ${this.object.name || this.object.id}`,
        };

      case 'create':
        return {
          text: `Create new volume backup`,
        };

      default:
        return {
          text: `${this.object.name || this.object.id}`,
          subText: this.object.status.toLocaleUpperCase(),
        };
    }
  }

  getActions(): IAction[] {
    const actions: IAction[] = [];

    actions.push(new CallbackAction(
      {
        object: this.object,
        icon: {name: 'edit'},
        tooltip: 'Edit backup',
        name: 'Edit',
        options: {
          displayMessages: true,
          displayConfirmation: false,
        },
        noPermissions: !this.permissions['volumebackups.update'],
        callback: () => {
          return this.matDialog.open(
            EditVolumeBackupDialogComponent, {
              data: {
                backup: this.object,
              }
            }).afterClosed().pipe(map(result => {
            if (result === false) {
              return;
            }
            return {message: 'Backup update scheduled'} as IActionResult;
          }));
        },
        refreshAfterExecute: true,
      }
    ));

    actions.push(new CallbackAction(
      {
        object: this.object,
        icon: {name: 'redo'},
        tooltip: 'Restore volume backup',
        name: 'Restore',
        options: {displayMessages: true, displayConfirmation: false},
        noPermissions: !this.permissions['volumebackups.restore'],
        callback: () => {
          return this.matDialog.open(
            RestoreVolumeBackupDialogComponent, {
              data: {backup: this.object}
            }).afterClosed().pipe(map(result => {
            if (result === false) {
              return;
            }
            return {message: result} as IActionResult;
          }));
        }
      }
    ));

    actions.push(new ApiCallAction(
      {
        object: this.object,
        icon: {name: 'delete'},
        name: 'Delete',
        tooltip: 'Delete volume backup',
        confirmOptions: {
          confirm: true,
          title: 'Delete volume backup',
          message: `Are you sure you want to delete volume backup ${this.object.name}`,
        },
        successMessage: 'Volume backup delete queued',
        errorMessage: 'Failed to delete volume backup, check logs for details',
        noPermissions: !this.permissions['volumebackups.destroy'],
        apiService: this.volumeBackupsApiService,
        callType: CallType.Delete,
        refreshAfterExecute: false,
        redirectAfterExecute: true,
        redirectUrl: this.config.getPanelUrl('openstack/volume-backups'),
      }
    ));

    return actions;
  }

  getDetailsActions(): IAction[] {
    const actions = [];
    return actions;
  }

  getDetailsLink(): string {
    return this.config.getPanelUrl(`openstack/volume-backups/${this.object.id}`);
  }

  getCardFields(): IDataField[] {
    const fields = [
      {
        value: `${this.object.size} GB, ${this.object.region}`
      },
      {
        name: 'Volume',
        value: this.object.volume ? this.object.volume.toString() : 'n/a',
      },
      {
        name: 'Client',
        value: this.object.client ? this.object.client.name : 'n/a',
      },
    ];

    return fields;
  }

  getTabs(additionalObjects?: {
    backups: FleioObjectsList<IVolumeBackupModel>;
    snapshots: FleioObjectsList<IVolumeBackupModel>;
  }): IDetailsTab[] {
    switch (this.state) {
      case 'details':
        return [
          {
            tabName: 'Overview',
            component: VolumeBackupDetailsOverviewComponent,
          },
        ];
    }
  }

  getCardTags(): string[] {
    const tags: string[] = [];

    if (this.object.is_incremental) {
      tags.push('incremental');
    }

    return tags;
  }

  getObjectDetailsRefreshInterval(): number {
    if (this.config && this.config.current && this.config.current.settings &&
      this.config.current.settings.refreshIntervals) {
      if (['restoring', 'attaching'].indexOf(this.object.status) < 0) {
        return this.config.current.settings.refreshIntervals.defaultInterval;
      }
    }

    return 1000;
  }
}
