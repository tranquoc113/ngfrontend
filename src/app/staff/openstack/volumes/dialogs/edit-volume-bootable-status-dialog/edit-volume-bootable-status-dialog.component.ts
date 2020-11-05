import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { IVolumeModel } from '@fleio-api/openstack/model/volume.model';
import { VolumesApiService } from '@fleio-api/openstack/volume/volumes-api.service';
import { NotificationService } from '@shared/ui-api/notification.service';

@Component({
  selector: 'app-edit-volume-bootable-status-dialog',
  templateUrl: './edit-volume-bootable-status-dialog.component.html',
  styleUrls: ['./edit-volume-bootable-status-dialog.component.scss']
})
export class EditVolumeBootableStatusDialogComponent implements OnInit {
  @ViewChild('formErrors') protected formErrors;
  backendErrors = {};
  bootableStatusForm = this.formBuilder.group({
    bootable: [false],
  });

  constructor(
    public dialogRef: MatDialogRef<EditVolumeBootableStatusDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {
      volume: IVolumeModel;
    },
    private volumesApiService: VolumesApiService,
    private formBuilder: FormBuilder,
    private notificationService: NotificationService,
  ) {
  }

  ngOnInit() {
    if (this.data.volume) {
      this.bootableStatusForm.patchValue(this.data.volume);
    }
  }

  close() {
    this.dialogRef.close(false);
  }

  changeBootableFlag() {
    if (!this.data.volume) {
      return;
    }

    const value = this.bootableStatusForm.value;

    this.volumesApiService.changeBootableStatus(this.data.volume.id, value.bootable).subscribe(result => {
      if (result) {
        this.dialogRef.close('Ok');
        this.notificationService.showMessage('Bootable status updated');
      } else {
        this.dialogRef.close('');
      }
    }, error => {
      this.backendErrors = error.error;
      this.formErrors.setBackendErrors(error.error);
    });
  }
}
