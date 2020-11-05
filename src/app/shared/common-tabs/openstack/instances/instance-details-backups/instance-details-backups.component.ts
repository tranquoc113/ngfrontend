import { ChangeDetectorRef, Component, NgZone, OnInit } from '@angular/core';
import { DetailsComponentBase } from '@objects-view/details-component-base';
import { IInstanceModel } from '@fleio-api/openstack/model/instance.model';
import { InstancesApiService } from '@fleio-api/openstack/instance/instances-api.service';
import { IOpenstackBackupSchedule } from '@fleio-api/openstack/model/openstack-backup-schedule.model';
import { IImageModel } from '@fleio-api/openstack/model/image.model';
import { NotificationService } from '@shared/ui-api/notification.service';
import { map } from 'rxjs/operators';
import { IActionResult } from '@objects-view/interfaces/actions/action-result';
import { MatDialog } from '@angular/material/dialog';
import { CreateOsBackupScheduleDialogComponent } from '@shared/common-dialogs/openstack/instances/create-os-backup-schedule-dialog/create-os-backup-schedule-dialog.component';
import { Observable } from 'rxjs';
import { BackupSchedulesApiService } from '@fleio-api/openstack/backups/backup-schedules-api.service';
import { CreateOsBackupDialogComponent } from '@shared/common-dialogs/openstack/instances/create-os-backup-dialog/create-os-backup-dialog.component';
import { ConfigService } from '@shared/config/config.service';

@Component({
  selector: 'app-instance-details-backups',
  templateUrl: './instance-details-backups.component.html',
  styleUrls: ['./instance-details-backups.component.scss']
})
export class InstanceDetailsBackupsComponent extends DetailsComponentBase<IInstanceModel> implements OnInit {
  schedules: Array<IOpenstackBackupSchedule> = [];
  backups: Array<IImageModel> = [];
  schedulesDisplayedColumns = ['backup_name', 'backup_type', 'run_at', 'actions'];
  backupsDisplayedColumns = ['name', 'backup_type'];
  permissions: {} = {};

  constructor(
    private instancesApiService: InstancesApiService,
    private notificationService: NotificationService,
    private backupSchedulesApiService: BackupSchedulesApiService,
    private matDialog: MatDialog,
    public config: ConfigService,
    ngZone: NgZone,
    changeDetectorRef: ChangeDetectorRef,
  ) {
    super(ngZone, changeDetectorRef);
  }

  deleteSchedule(schedule: IOpenstackBackupSchedule) {
    let dialogResult$: Observable<string>;
    dialogResult$ = this.notificationService.confirmDialog({
        title: 'Delete backup schedule?',
        message: 'Are you sure?',
      });
    dialogResult$.subscribe(dialogResult => {
      if (dialogResult === 'yes') {
        this.backupSchedulesApiService.delete(schedule.id).subscribe(response => {
          this.notificationService.showMessage('Successfully deleted backup schedule.');
          this.boostRefreshTimer();
        }, error => {
          this.notificationService.showMessage('Failed to delete backup schedule.');
        });
      }
    });
  }

  protected refreshData() {
    this.instancesApiService.getInstanceBackupsAndBackupSchedules(this.object.id).subscribe(response => {
      this.schedules = response.schedules;
      this.backups = response.backups;
    }, error => {
      this.notificationService.showMessage('Failed to load backups and backup schedules info.');
    })
  }

  public openCreateBackupScheduleDialog() {
    return this.matDialog.open(
      CreateOsBackupScheduleDialogComponent, {
        data: {
          instance: this.object
        }
    }).afterClosed().pipe(map(result => {
      if (result === true || result === 'true') {
        this.boostRefreshTimer();
        this.notificationService.showMessage('Added a new backup schedule');
      }
      return {message: result} as IActionResult;
    })).subscribe();
  }

  getManualBackupsCount(onlyClientOwned: boolean) {
      let count = 0;
      for (const backup of this.backups) {
        if (backup.backup_type === 'manual') {
          if (onlyClientOwned) {
            if (backup.client_owned === true) {
              count = count + 1;
            }
          } else {
            count = count + 1;
          }
        }
      }
      return count;
    };

  public openCreateBackupDialog() {
    return this.matDialog.open(
      CreateOsBackupDialogComponent, {
        data: {
          instance: this.object,
          existingBackupsCount: this.getManualBackupsCount(false),
          existingBackupsCountClientProject: this.getManualBackupsCount(true),
        }
    }).afterClosed().pipe(map(result => {
      if (result === true || result === 'true') {
        this.boostRefreshTimer();
        this.notificationService.showMessage('Backup is being created.');
      }
      return {message: result} as IActionResult;
    })).subscribe();
  }

  ngOnInit(): void {
    super.ngOnInit();
    if (this.objectController) {
      this.permissions = this.objectController.additionalObjects.permissions;
    }
    this.setupRefreshTimer(10000);
  }

}
