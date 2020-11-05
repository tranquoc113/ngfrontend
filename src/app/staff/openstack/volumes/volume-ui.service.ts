import { IPermissionsModel } from '@fleio-api/base-model/IPermissionsModel';
import { IIcon } from '@shared/ui/common/interfaces/icon';
import { ITitle } from '@objects-view/interfaces/card-data/card-title';
import { IObjectStatus, StatusType, StatusValue } from '@objects-view/interfaces/object-status';
import { ObjectUIServiceBase } from '@objects-view/object-ui-service-base';
import { IAction } from '@objects-view/interfaces/actions/action';
import { RouterLinkAction } from '@objects-view/actions/router-link-action';
import { Router } from '@angular/router';
import { ConfigService } from '@shared/config/config.service';
import { IDataField } from '@objects-view/interfaces/card-data/data-field';
import { ApiCallAction, CallType } from '@objects-view/actions/api-call-action';
import { IDetailsTab } from '@objects-view/interfaces/details/details-tab';
import { DatePipe } from '@angular/common';
import { CallbackAction } from '@objects-view/actions/callback-action';
import { VolumesApiService } from '@fleio-api/openstack/volume/volumes-api.service';
import { IVolumeModel } from '@fleio-api/openstack/model/volume.model';
import { VolumeDetailsOverviewComponent } from '@shared/common-tabs/openstack/volumes/volume-details-overview/volume-details-overview.component';
import { VolumeEditFormComponent } from '@shared/common-tabs/openstack/volumes/volume-edit-form/volume-edit-form.component';
import { map } from 'rxjs/operators';
import { IActionResult } from '@objects-view/interfaces/actions/action-result';
import { MatDialog } from '@angular/material/dialog';
import { VolumeRenameComponent } from '@shared/common-dialogs/openstack/volumes/volume-rename/volume-rename.component';
import { VolumeExtendComponent } from '@shared/common-dialogs/openstack/volumes/volume-extend/volume-extend.component';
import { VolumeDetailsBackupsComponent } from './tabs/volume-details-backups/volume-details-backups.component';
import { VolumeDetailsSnapshotsComponent } from './tabs/volume-details-snapshots/volume-details-snapshots.component';
import { FleioObjectsList } from '@fleio-api/fleio-objects-list';
import { IVolumeBackupModel } from '@fleio-api/openstack/model/volume-backup.model';
import { EditVolumeBootableStatusDialogComponent } from './dialogs/edit-volume-bootable-status-dialog/edit-volume-bootable-status-dialog.component';
import { RevertVolumeToSnapshotDialogComponent } from './dialogs/revert-volume-to-snapshot-dialog/revert-volume-to-snapshot-dialog.component';

export class VolumeUiService extends ObjectUIServiceBase<IVolumeModel> {
  private readonly router: Router;
  private readonly config: ConfigService;
  private readonly volumesApiService: VolumesApiService;
  private readonly datePipe: DatePipe;
  private readonly matDialog: MatDialog;


  constructor(
    volume: IVolumeModel, permissions: IPermissionsModel, state: string,
    router: Router, config: ConfigService, volumesApiService: VolumesApiService, matDialog: MatDialog,
  ) {
    super(volume, permissions, state);
    this.matDialog = matDialog;
    this.router = router;
    this.config = config;
    this.volumesApiService = volumesApiService;
    this.datePipe = new DatePipe(this.config.locale);
  }

  getIcon(): IIcon {
    return null;
  }

  getStatus(): IObjectStatus {
    switch (this.object.status) {
      case 'error':
        return {
          value: StatusValue.Error,
          type: StatusType.Defined,
        };
      case 'deleting':
        return {
          value: StatusValue.Error,
          type: StatusType.Changing,
        };
      case 'in-use':
        return {
          value: StatusValue.Warning,
          type: StatusType.Defined,
        };
      case 'extending':
      case 'attaching':
      case 'creating':
      case 'reverting':
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
          text: `Edit volume ${this.object.name || this.object.id}`,
        };

      case 'create':
        return {
          text: `Create new volume`,
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
        tooltip: 'Rename volume',
        name: 'Rename',
        options: {displayMessages: true, displayConfirmation: false},
        callback: () => {
          return this.matDialog.open(
            VolumeRenameComponent, {
              data: {volume: this.object}
            }).afterClosed().pipe(map(result => {
            if (result === false) {
              return;
            }
            return {message: result} as IActionResult;
          }));
        }
      }
    ));

    actions.push(new CallbackAction(
      {
        object: this.object,
        icon: {name: 'resize', class: 'fl-icons'},
        tooltip: 'Extend volume',
        name: 'Extend',
        options: {displayMessages: true, displayConfirmation: false},
        disabled: ['in-use', 'available'].indexOf(this.object.status) < 0,
        callback: () => {
          return this.matDialog.open(
            VolumeExtendComponent, {
              data: {volume: this.object}
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
        tooltip: 'Delete',
        confirmOptions: {
          confirm: true,
          title: 'Delete volume',
          message: `Are you sure you want to delete volume ${this.object.name}`,
        },
        successMessage: 'Volume delete queued',
        errorMessage: 'Failed to delete volume, check logs for details',
        apiService: this.volumesApiService,
        callType: CallType.Delete,
        refreshAfterExecute: false,
        redirectAfterExecute: true,
        redirectUrl: this.config.getPanelUrl('openstack/volumes'),
      }
    ));

    actions.push(new CallbackAction(
      {
        object: this.object,
        icon: {name: 'settings_power'},
        tooltip: 'Edit bootable status',
        name: 'Edit bootable status',
        callback: () => {
          return this.matDialog.open(
            EditVolumeBootableStatusDialogComponent, {
              data: {
                volume: this.object,
              }
            }).afterClosed().pipe(map(result => {
            if (result === false) {
              return;
            }
            return {message: result} as IActionResult;
          }));
        },
        refreshAfterExecute: true,
      }
    ));

    actions.push(new CallbackAction(
      {
        object: this.object,
        icon: {name: 'redo'},
        tooltip: 'Revert to snapshot',
        name: 'Revert to snapshot',
        callback: () => {
          return this.matDialog.open(
            RevertVolumeToSnapshotDialogComponent, {
              data: {
                volume: this.object,
              }
            }).afterClosed().pipe(map(result => {
            if (result === false) {
              return;
            }
            return {message: result} as IActionResult;
          }));
        },
        refreshAfterExecute: true,
      }
    ));

    return actions;
  }

  getDetailsActions(): IAction[] {
    const actions = [];

    switch (this.state) {
      case 'create':
        actions.push(new RouterLinkAction({
            name: 'Cancel',
            routerUrl: this.config.getPrevUrl(`openstack/volumes`),
            router: this.router,
          }
        ));
        actions.push(new CallbackAction({name: 'Create'}));
        break;
      case 'edit':
        actions.push(new RouterLinkAction({
            name: 'Cancel',
            routerUrl: this.config.getPrevUrl(`openstack/volumes`),
            router: this.router,
          }
        ));
        actions.push(new CallbackAction({name: 'Save'}));
        break;
      default:
        break;
    }

    return actions;
  }

  getDetailsLink(): string {
    return this.config.getPanelUrl(`openstack/volumes/${this.object.id}`);
  }

  getCardFields(): IDataField[] {
    const fields = [
      {
        value: `${this.object.size} GB, ${this.object.region}`
      },
      {
        name: 'Client',
        value: this.object.client ? this.object.client.name : 'n/a',
      },
      {
        value: this.object.type,
      }
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
            component: VolumeDetailsOverviewComponent,
          },
          {
            tabName: additionalObjects.backups ? `Backups (${additionalObjects.backups.objects.length})` : 'Backups',
            component: VolumeDetailsBackupsComponent,
            featureName: 'openstack.volumes.backups',
          },
          {
            tabName: additionalObjects.snapshots ?
              `Snapshots (${additionalObjects.snapshots.objects.length})` : 'Snapshots',
            component: VolumeDetailsSnapshotsComponent,
            featureName: 'openstack.volumes.snapshots'
          },
        ];
      case 'create':
        return [
          {
            tabName: 'Create',
            component: VolumeEditFormComponent,
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
      if (['extending', 'attaching'].indexOf(this.object.status) < 0) {
        return this.config.current.settings.refreshIntervals.defaultInterval;
      }
    }

    return 1000;
  }
}
