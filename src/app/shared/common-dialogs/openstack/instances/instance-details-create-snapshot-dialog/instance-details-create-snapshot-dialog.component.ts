import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { InstancesApiService } from '@fleio-api/openstack/instance/instances-api.service';
import { NotificationService } from '@shared/ui-api/notification.service';

@Component({
  selector: 'app-instance-details-create-snapshot-dialog',
  templateUrl: './instance-details-create-snapshot-dialog.component.html',
  styleUrls: ['./instance-details-create-snapshot-dialog.component.scss']
})
export class InstanceDetailsCreateSnapshotDialogComponent implements OnInit {
  @ViewChild('formErrors') formErrors;
  loading = false;
  createSnapshotForm: FormGroup = new FormGroup({
    name: new FormControl('', Validators.required),
    create_snapshot_as_client: new FormControl(false, Validators.required)
  });
  constructor(
    private notificationService: NotificationService,
    private instancesApiService: InstancesApiService,
    public dialogRef: MatDialogRef<InstanceDetailsCreateSnapshotDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {
      instanceId: string,
      instanceName: string
    },
  ) { }

  ngOnInit() {
  }

  close() {
    this.dialogRef.close(false);
  }

  createSnapshot() {
    this.loading = true;
    const value = this.createSnapshotForm.value;
    if (!this.createSnapshotForm.valid) {
      this.loading = false;
      return;
    }
    this.instancesApiService.objectPostAction(
      this.data.instanceId, 'create_snapshot', value
    ).pipe().subscribe(response => {
      this.loading = false;
      this.dialogRef.close(true);
    }, error => {
      this.loading = false;
      this.notificationService.showMessage('Failed to create snapshot');
      this.formErrors.setBackendErrors(error.error);
    });
  }

}
