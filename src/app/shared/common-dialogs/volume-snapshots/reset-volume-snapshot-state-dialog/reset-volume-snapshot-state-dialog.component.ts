import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { IVolumeSnapshotModel } from '@fleio-api/openstack/model/volume-snapshot.model';
import { VolumeSnapshotsApiService } from '@fleio-api/openstack/volume/volume-snapshots-api.service';

@Component({
  selector: 'app-reset-volume-snapshot-state-dialog',
  templateUrl: './reset-volume-snapshot-state-dialog.component.html',
  styleUrls: ['./reset-volume-snapshot-state-dialog.component.scss']
})
export class ResetVolumeSnapshotStateDialogComponent implements OnInit {
  @ViewChild('formErrors') protected formErrors;
  backendErrors = {};
  snapshotForm = this.formBuilder.group({
    status: ['', Validators.required],
  });

  constructor(
    public dialogRef: MatDialogRef<ResetVolumeSnapshotStateDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {
      snapshot: IVolumeSnapshotModel;
    },
    private volumeSnapshotsApiService: VolumeSnapshotsApiService,
    private formBuilder: FormBuilder,
  ) {
  }

  ngOnInit() {
    if (this.data.snapshot) {
      this.snapshotForm.patchValue(this.data.snapshot);
    }
  }

  close() {
    this.dialogRef.close(false);
  }

  createOrUpdate() {
    const value = this.snapshotForm.value;

    this.volumeSnapshotsApiService.resetState(this.data.snapshot.id, value.status).subscribe(result => {
      if (result) {
        this.dialogRef.close('Snapshot state updated');
      } else {
        this.dialogRef.close('');
      }
    }, error => {
      this.backendErrors = error.error;
      this.formErrors.setBackendErrors(error.error);
    });
  }
}
