import { ChangeDetectorRef, Component, NgZone, OnInit } from '@angular/core';
import { DetailsComponentBase } from '@objects-view/details-component-base';
import { IVolumeModel } from '@fleio-api/openstack/model/volume.model';
import { FleioObjectsList } from '@fleio-api/fleio-objects-list';
import { IVolumeBackupModel } from '@fleio-api/openstack/model/volume-backup.model';
import { IAction } from '@objects-view/interfaces/actions/action';
import { ConfigService } from '@shared/config/config.service';
import { LineDirection } from '@objects-view/status-line/status-line.component';
import { IObjectStatus, StatusType, StatusValue } from '@objects-view/interfaces/object-status';
import { ApiCallAction, CallType } from '@objects-view/actions/api-call-action';
import { VolumeBackupsApiService } from '@fleio-api/openstack/volume/volume-backups-api.service';
import { CallbackAction } from '@objects-view/actions/callback-action';
import { map } from 'rxjs/operators';
import { IActionResult } from '@objects-view/interfaces/actions/action-result';
import { MatDialog } from '@angular/material/dialog';
import { EditVolumeBackupDialogComponent } from '@shared/common-dialogs/openstack/volme-backups/edit-volume-backup-dialog/edit-volume-backup-dialog.component';
import { NotificationService } from '@shared/ui-api/notification.service';
import { RestoreVolumeBackupDialogComponent } from '@shared/common-dialogs/openstack/volme-backups/restore-volume-backup-dialog/restore-volume-backup-dialog.component';

@Component({
  selector: 'app-volume-details-backups',
  templateUrl: './volume-details-backups.component.html',
  styleUrls: ['./volume-details-backups.component.scss']
})
export class VolumeDetailsBackupsComponent extends DetailsComponentBase<IVolumeModel> implements OnInit {

  constructor(
    public config: ConfigService,
    private volumeBackupsApiService: VolumeBackupsApiService,
    private matDialog: MatDialog,
    private notificationService: NotificationService,
    ngZone: NgZone,
    changeDetectorRef: ChangeDetectorRef,
  ) {
    super(ngZone, changeDetectorRef);
  }

  backups: FleioObjectsList<IVolumeBackupModel>;
  backupActions: { [id: string]: IAction[] };
  backupStatus: { [id: string]: IObjectStatus };
  LineDirection = LineDirection;
  currentPage = 1;
  nextPage = false;
  previousPage = false;

  private getBackupActions(backup: IVolumeBackupModel): IAction[] {
    return [
      new CallbackAction(
        {
          object: this.object,
          icon: {name: 'edit'},
          tooltip: 'Edit backup',
          name: 'Edit',
          callback: () => {
            return this.matDialog.open(
              EditVolumeBackupDialogComponent, {
                data: {
                  volume: this.object,
                  backup,
                }
              }).afterClosed().pipe(map(result => {
              if (result === false) {
                return;
              }
              this.notificationService.showMessage('Backup update scheduled');
              return {message: result} as IActionResult;
            }));
          },
          refreshAfterExecute: true,
        }
      ),
      new CallbackAction(
        {
          object: this.object,
          icon: {name: 'redo'},
          tooltip: 'Restore',
          name: 'Restore',
          callback: () => {
            return this.matDialog.open(
              RestoreVolumeBackupDialogComponent, {
                data: {
                  backup,
                }
              }).afterClosed().pipe(map(result => {
              if (result === false) {
                return;
              }
              this.notificationService.showMessage('Backup restore scheduled');
              return {message: result} as IActionResult;
            }));
          },
          refreshAfterExecute: true,
        }
      ),
      new ApiCallAction(
        {
          object: backup,
          icon: {name: 'delete'},
          tooltip: 'Delete volume backup',
          name: 'Delete',
          confirmOptions: {
            confirm: true,
            title: 'Delete volume backup',
            message: `Are you sure you want to delete volume backup ${backup.name}`,
          },
          successMessage: 'Volume backup delete queued',
          errorMessage: 'Volume backup delete failed, check logs for details',
          apiService: this.volumeBackupsApiService,
          callType: CallType.Delete,
          refreshAfterExecute: true,
          redirectAfterExecute: false,
        }
      ),
    ];
  }

  ngOnInit(): void {
    super.ngOnInit();
    if (this.config && this.config.current && this.config.current.settings &&
      this.config.current.settings.refreshIntervals) {
      this.setupRefreshTimer(this.config.current.settings.refreshIntervals.volumeDetailsBackupsInterval);
    }

    if (this.objectController) {
      this.backups = this.objectController.additionalObjects.backups as FleioObjectsList<IVolumeBackupModel>;
      this.updateStatusAndActions();
    }
  }

  protected refreshData() {
    super.refreshData();
    this.volumeBackupsApiService.list({
      volume__id: this.object.id, page: this.currentPage,
    }).subscribe(backups => {
      this.backups = backups;
      this.updateStatusAndActions();
    });
  }

  createNewBackup() {
    return this.matDialog.open(
      EditVolumeBackupDialogComponent, {
        data: {
          volume: this.object,
        }
      }).afterClosed().pipe(map(result => {
        if (result === 'Ok') {
          this.notificationService.showMessage('Backup create scheduled');
        }
        return {message: result} as IActionResult;
      }
    ));
  }

  changePage(action) {
    if (action === 'next') {
      this.currentPage = this.currentPage + 1;
      this.refreshData();
    }
    if (action === 'previous') {
      this.currentPage = this.currentPage - 1;
      this.refreshData();
    }
  };

  private updateStatusAndActions() {
    this.nextPage = !!this.backups.next;
    this.previousPage = !!this.backups.previous;
    this.backupActions = {};
    this.backupStatus = {};
    for (const backup of this.backups.objects) {
      this.backupActions[backup.id] = this.getBackupActions(backup);
      let status: IObjectStatus = null;
      switch (backup.status) {
        case 'creating':
        case 'restoring':
          status = {type: StatusType.Defined, value: StatusValue.Pending};
          break;
        case 'available':
          status = {type: StatusType.Defined, value: StatusValue.Available};
          break;
        case 'deleting':
          status = {type: StatusType.Defined, value: StatusValue.Deactivated};
          break;
        case 'error':
        case 'error_deleting':
          status = {type: StatusType.Defined, value: StatusValue.Error};
          break;
      }

      this.backupStatus[backup.id] = status;
    }
  }
}
