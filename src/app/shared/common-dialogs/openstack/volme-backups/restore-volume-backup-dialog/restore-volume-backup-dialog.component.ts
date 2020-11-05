import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { IVolumeModel } from '@fleio-api/openstack/model/volume.model';
import { IVolumeBackupModel } from '@fleio-api/openstack/model/volume-backup.model';
import { VolumeBackupsApiService } from '@fleio-api/openstack/volume/volume-backups-api.service';
import { Observable } from 'rxjs';
import { map, mergeMap, startWith } from 'rxjs/operators';
import { VolumesApiService } from '@fleio-api/openstack/volume/volumes-api.service';

@Component({
  selector: 'app-restore-volume-backup-dialog',
  templateUrl: './restore-volume-backup-dialog.component.html',
  styleUrls: ['./restore-volume-backup-dialog.component.scss']
})
export class RestoreVolumeBackupDialogComponent implements OnInit {
  @ViewChild('formErrors') protected formErrors;
  backendErrors = {};
  restoreBackupForm = this.formBuilder.group({
    newVolume: [false],
    volume: ['', Validators.required],
    name: ['', Validators.required],
  });
  filteredVolumes$: Observable<IVolumeModel[]>;

  constructor(
    public dialogRef: MatDialogRef<RestoreVolumeBackupDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {
      backup: IVolumeBackupModel;
    },
    private volumeBackupsApiService: VolumeBackupsApiService,
    private volumesApiService: VolumesApiService,
    private formBuilder: FormBuilder,
  ) {
  }

  changedNewVolume() {
    if (this.restoreBackupForm.controls.newVolume.value) {
      this.restoreBackupForm.controls.volume.disable();
      this.restoreBackupForm.controls.name.enable();
    } else {
      this.restoreBackupForm.controls.volume.enable();
      this.restoreBackupForm.controls.name.disable();
    }
  }

  clearVolume() {
    this.restoreBackupForm.controls.volume.setValue('');
  }

  volumeDisplay(volume?: IVolumeModel): string | undefined {
    if (volume) {
      return volume.name ? `${volume.name} - ${volume.id}` : volume.id.toString();
    } else {
      return undefined;
    }
  }

  ngOnInit() {
    this.changedNewVolume();
    this.filteredVolumes$ = this.restoreBackupForm.controls.volume.valueChanges.pipe(
      startWith(''),
      map(value => {
        if (value) {
          return typeof value === 'string' ? value : value.id
        } else {
          return null;
        }
      }),
      mergeMap(value => {
        return this.volumesApiService.list(
          value ? {search: value} : {},
        ).pipe(map(volumeList => {
          if (volumeList) {
            return volumeList.objects;
          } else {
            return [];
          }
        }));
      })
    );
  }

  close() {
    this.dialogRef.close(false);
  }

  createOrUpdate() {
    if (this.restoreBackupForm.invalid) {
      return;
    }
    const value = this.restoreBackupForm.value;
    let volumeId = null;
    if (value.volume && value.volume.id) {
      volumeId = value.volume.id;
    }

    this.volumeBackupsApiService.restore(this.data.backup.id, volumeId, value.name).subscribe(result => {
      if (result) {
        this.dialogRef.close('Backup restore scheduled');
      } else {
        this.dialogRef.close('');
      }
    }, error => {
      this.backendErrors = error.error;
      this.formErrors.setBackendErrors(error.error);
    });
  }
}
