import { ObjectUIServiceBase } from '@objects-view/object-ui-service-base';
import { Router } from '@angular/router';
import { ConfigService } from '@shared/config/config.service';
import { DatePipe } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { IPermissionsModel } from '@fleio-api/base-model/IPermissionsModel';
import { ITitle } from '@objects-view/interfaces/card-data/card-title';
import { IAction } from '@objects-view/interfaces/actions/action';
import { CallbackAction } from '@objects-view/actions/callback-action';
import { map } from 'rxjs/operators';
import { IActionResult } from '@objects-view/interfaces/actions/action-result';
import { ApiCallAction, CallType } from '@objects-view/actions/api-call-action';
import { IIcon } from '@shared/ui/common/interfaces/icon';
import { IObjectStatus, StatusType, StatusValue } from '@objects-view/interfaces/object-status';
import { IDataField } from '@objects-view/interfaces/card-data/data-field';
import { IDetailsTab } from '@objects-view/interfaces/details/details-tab';
import { IVolumeSnapshotModel } from '@fleio-api/openstack/model/volume-snapshot.model';
import { VolumeSnapshotsApiService } from '@fleio-api/openstack/volume/volume-snapshots-api.service';
import { EditVolumeSnapshotDialogComponent } from '@shared/common-dialogs/volume-snapshots/edit-volume-snapshot-dialog/edit-volume-snapshot-dialog.component';
import { VolumeSnapshotDetailsOverviewComponent } from './tabs/volume-snapshot-details-overview/volume-snapshot-details-overview.component';
import { ResetVolumeSnapshotStateDialogComponent } from '@shared/common-dialogs/volume-snapshots/reset-volume-snapshot-state-dialog/reset-volume-snapshot-state-dialog.component';

export class VolumeSnapshotUiService extends ObjectUIServiceBase<IVolumeSnapshotModel> {
  private readonly router: Router;
  private readonly config: ConfigService;
  private readonly volumeSnapshotsApiService: VolumeSnapshotsApiService;
  private readonly datePipe: DatePipe;
  private readonly matDialog: MatDialog;


  constructor(
    volumeSnapshot: IVolumeSnapshotModel, permissions: IPermissionsModel, state: string,
    router: Router, config: ConfigService, volumeSnapshotsApiService: VolumeSnapshotsApiService, matDialog: MatDialog,
  ) {
    super(volumeSnapshot, permissions, state);
    this.matDialog = matDialog;
    this.router = router;
    this.config = config;
    this.volumeSnapshotsApiService = volumeSnapshotsApiService;
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
          text: `Edit volume snapshot ${this.object.name || this.object.id}`,
        };

      case 'create':
        return {
          text: `Create new volume snapshot`,
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
        tooltip: 'Edit snapshot',
        name: 'Edit',
        options: {
          displayMessages: true,
          displayConfirmation: false,
        },
        noPermissions: !this.permissions['volumesnapshots.update'],
        callback: () => {
          return this.matDialog.open(
            EditVolumeSnapshotDialogComponent, {
              data: {
                snapshot: this.object,
              }
            }).afterClosed().pipe(map(result => {
              if (!result) {
                return;
              }
              return {message: 'Snapshot update scheduled'} as IActionResult;
            }
          ));
        },
        refreshAfterExecute: true,
      }
    ));

    actions.push(new CallbackAction(
      {
        object: this.object,
        icon: {name: 'redo'},
        tooltip: 'Reset state',
        name: 'Reset state',
        options: {displayMessages: true, displayConfirmation: false},
        noPermissions: !this.permissions['volumesnapshots.reset-state'],
        callback: () => {
          return this.matDialog.open(
            ResetVolumeSnapshotStateDialogComponent, {
              data: {snapshot: this.object}
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
        tooltip: 'Delete volume snapshot',
        confirmOptions: {
          confirm: true,
          title: 'Delete volume snapshot',
          message: `Are you sure you want to delete volume snapshot ${this.object.name}`,
        },
        successMessage: 'Volume snapshot delete queued',
        errorMessage: 'Failed to delete volume snapshot, check logs for details',
        noPermissions: !this.permissions['volumesnapshots.destroy'],
        apiService: this.volumeSnapshotsApiService,
        callType: CallType.Delete,
        refreshAfterExecute: false,
        redirectAfterExecute: true,
        redirectUrl: this.config.getPanelUrl('openstack/volume-snapshots'),
      }
    ));

    return actions;
  }

  getDetailsActions(): IAction[] {
    const actions = [];
    return actions;
  }

  getDetailsLink(): string {
    return this.config.getPanelUrl(`openstack/volume-snapshots/${this.object.id}`);
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

  getTabs(): IDetailsTab[] {
    switch (this.state) {
      case 'details':
        return [
          {
            tabName: 'Overview',
            component: VolumeSnapshotDetailsOverviewComponent,
          },
        ];
    }
  }

  getCardTags(): string[] {
    const tags: string[] = [];
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
