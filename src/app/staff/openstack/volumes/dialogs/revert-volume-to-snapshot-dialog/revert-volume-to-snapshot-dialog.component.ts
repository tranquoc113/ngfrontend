import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { IVolumeModel } from '@fleio-api/openstack/model/volume.model';
import { NotificationService } from '@shared/ui-api/notification.service';
import { VolumeSnapshotsApiService } from '@fleio-api/openstack/volume/volume-snapshots-api.service';
import { VolumesApiService } from '@fleio-api/openstack/volume/volumes-api.service';
import { IVolumeSnapshotModel } from '@fleio-api/openstack/model/volume-snapshot.model';

@Component({
  selector: 'app-revert-volume-to-snapshot-dialog',
  templateUrl: './revert-volume-to-snapshot-dialog.component.html',
  styleUrls: ['./revert-volume-to-snapshot-dialog.component.scss']
})
export class RevertVolumeToSnapshotDialogComponent implements OnInit {
  loading: boolean;
  snapshot: IVolumeSnapshotModel;

  constructor(
    public dialogRef: MatDialogRef<RevertVolumeToSnapshotDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {
      volume: IVolumeModel;
    },
    private volumesApiService: VolumesApiService,
    private volumeSnapshotsApiService: VolumeSnapshotsApiService,
    private notificationService: NotificationService,
  ) {
  }

  ngOnInit() {
    if (this.data.volume) {
      this.loading = true;
      this.volumeSnapshotsApiService.getSnapshotForRevert(this.data.volume.id).subscribe(snapshot => {
        this.snapshot = snapshot;
      }).add(() => {
        this.loading = false;
      });
    }
  }

  close() {
    this.dialogRef.close(false);
  }

  revertToSnapshot() {
    if (!this.data.volume) {
      return;
    }

    this.volumesApiService.revertToSnapshot(this.data.volume.id, this.snapshot.id).subscribe(result => {
      if (result) {
        this.dialogRef.close('Ok');
        this.notificationService.showMessage('Revert to snapshot scheduled');
      } else {
        this.dialogRef.close('');
      }
    });
  }
}
