import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NotificationService } from '@shared/ui-api/notification.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { IInstanceModel } from '@fleio-api/openstack/model/instance.model';
import { ConfigService } from '@shared/config/config.service';
import { InstancesApiService } from '@fleio-api/openstack/instance/instances-api.service';

@Component({
  selector: 'app-create-os-backup-dialog',
  templateUrl: './create-os-backup-dialog.component.html',
  styleUrls: ['./create-os-backup-dialog.component.scss']
})
export class CreateOsBackupDialogComponent implements OnInit {
  @ViewChild('formErrors') formErrors;
  loading = false;
  backendErrors = {};
  backupForm = this.formBuilder.group({
    backup_type: ['manual'],
    create_as_client: [false],
    rotation: [this.data.existingBackupsCount + 1, [Validators.required, Validators.min(1)]],
    backup_name: ['', Validators.required],
  });
  isStaff = false;

  rotationControl = this.backupForm.controls.rotation;
  createAsClientControl = this.backupForm.controls.create_as_client;

  constructor(
    private formBuilder: FormBuilder,
    private notificationService: NotificationService,
    private instancesApiService: InstancesApiService,
    public config: ConfigService,
    public dialogRef: MatDialogRef<CreateOsBackupDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {
      instance: IInstanceModel,
      existingBackupsCount: number,
      existingBackupsCountClientProject: number,
    },
  ) { }

  public close() {
    this.dialogRef.close(false);
  }

  public createBackup() {
    this.loading = true;
    if (!this.backupForm.valid) {
      this.loading = false;
      return;
    }
    const value = this.backupForm.value;
    this.instancesApiService.createBackup(this.data.instance.id, value).subscribe(response => {
      this.loading = false;
      this.dialogRef.close(true);
    }, error => {
      this.loading = false;
      this.formErrors.setBackendErrors(error.error.detail);
    })
  }

  ngOnInit(): void {
    if (this.config.currentConfigurationName === 'staff') {
      this.isStaff = true;
      this.createAsClientControl.enable();
    } else {
      this.createAsClientControl.disable();
    }
  }

}
