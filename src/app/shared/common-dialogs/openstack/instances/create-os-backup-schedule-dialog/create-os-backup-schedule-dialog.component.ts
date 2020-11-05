import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NotificationService } from '@shared/ui-api/notification.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { IInstanceModel } from '@fleio-api/openstack/model/instance.model';
import { BackupSchedulesApiService } from '@fleio-api/openstack/backups/backup-schedules-api.service';

@Component({
  selector: 'app-create-os-backup-schedule-dialog',
  templateUrl: './create-os-backup-schedule-dialog.component.html',
  styleUrls: ['./create-os-backup-schedule-dialog.component.scss']
})
export class CreateOsBackupScheduleDialogComponent implements OnInit {
  @ViewChild('formErrors') formErrors;
  loading = false;
  backendErrors = {};
  backupScheduleForm = this.initForm();
  hourChoices = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23];
  daysChoices = [0, 1, 2, 3, 4, 5, 6];
  backupType = this.backupScheduleForm.controls.backup_type;
  dayControl = this.backupScheduleForm.controls.day;

  initForm() {
    if (this.data && this.data.instance) {
      return this.formBuilder.group({
        instance: [this.data.instance.id],
        backup_name: ['', Validators.required],
        backup_type: ['daily', Validators.required],
        hour: [0, Validators.required],
        day: [1, Validators.required],
        rotation: [1, [Validators.required, Validators.min(1)]],
        run_at: [null],
      });
    }
    return this.formBuilder.group({
      instance: [''],
      backup_name: ['', Validators.required],
      backup_type: ['daily', Validators.required],
      hour: [0, Validators.required],
      day: [1, Validators.required],
      rotation: [1, [Validators.required, Validators.min(1)]],
      run_at: [null],
    });
  }

  constructor(
    private formBuilder: FormBuilder,
    private notificationService: NotificationService,
    private backupSchedulesApiService: BackupSchedulesApiService,
    public dialogRef: MatDialogRef<CreateOsBackupScheduleDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {
      instance: IInstanceModel,
    },
  ) { }

  dayOfWeekAsString(day: number) {
    return ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'][day];
  }

  changedBackupType() {
    if (this.backupType.value === 'weekly') {
      this.dayControl.enable();
    } else {
      this.dayControl.disable();
    }
  }

  hourDisplay(hour: number) {
    if (hour < 10) {
      return '0' + hour + ':00';
    } else {
      return hour + ':00';
    }
  };

  public createSchedule() {
    this.loading = true;
    if (!this.backupScheduleForm.valid) {
      this.loading = false;
      return;
    }
    const value = this.backupScheduleForm.value;
    this.backupSchedulesApiService.create(value).subscribe(response => {
      this.loading = false;
      this.dialogRef.close(true);
    }, error => {
      this.loading = false;
      this.formErrors.setBackendErrors(error.error.detail);
    })
  }

  public close() {
    this.dialogRef.close(false);
  }

  ngOnInit(): void {
    this.changedBackupType();
  }

}
