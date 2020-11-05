import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { IVolumeModel } from '@fleio-api/openstack/model/volume.model';
import { IVolumeBackupModel } from '@fleio-api/openstack/model/volume-backup.model';
import { VolumeBackupsApiService } from '@fleio-api/openstack/volume/volume-backups-api.service';
import { map, mergeMap, startWith } from 'rxjs/operators';
import { VolumesApiService } from '@fleio-api/openstack/volume/volumes-api.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-edit-volume-backup-dialog',
  templateUrl: './edit-volume-backup-dialog.component.html',
  styleUrls: ['./edit-volume-backup-dialog.component.scss']
})
export class EditVolumeBackupDialogComponent implements OnInit {
  @ViewChild('formErrors') protected formErrors;
  backendErrors = {};
  backupForm = this.formBuilder.group({
    for_client: [false],
    name: ['', Validators.required],
    incremental: [false],
    force: [false],
    description: ['', Validators.required],
    volume: ['', Validators.required],
  });
  filteredVolumes$: Observable<IVolumeModel[]>;
  showVolumeSelect: boolean;

  constructor(
    public dialogRef: MatDialogRef<EditVolumeBackupDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {
      volume: IVolumeModel;
      backup: IVolumeBackupModel;
    },
    private volumeBackupsApiService: VolumeBackupsApiService,
    private volumesApiService: VolumesApiService,
    private formBuilder: FormBuilder,
  ) {
  }

  clearVolume() {
    this.backupForm.controls.volume.setValue('');
  }

  volumeDisplay(volume?: IVolumeModel): string | undefined {
    if (volume) {
      return volume.name ? `${volume.name} - ${volume.id}` : volume.id.toString();
    } else {
      return undefined;
    }
  }


  ngOnInit() {
    if (this.data.backup) {
      this.backupForm.patchValue(this.data.backup);
      this.backupForm.controls.for_client.disable();
      this.backupForm.controls.incremental.disable();
      this.backupForm.controls.force.disable();
    }

    this.showVolumeSelect = !this.data.backup && !this.data.volume;

    if (this.showVolumeSelect) {
      this.filteredVolumes$ = this.backupForm.controls.volume.valueChanges.pipe(
        startWith(''),
        map(value => {
          if (value) {
            return typeof value === 'string' ? value : value.id;
          } else {
            return null;
          }
        }),
        mergeMap(value => {
          return this.volumesApiService.list({
            search: value,
          }).pipe(map(volumesList => {
            if (volumesList) {
              return volumesList.objects;
            } else {
              return [];
            }
          }));
        })
      );
    } else {
      this.backupForm.controls.volume.disable();
    }
  }

  close() {
    this.dialogRef.close(false);
  }

  createOrUpdate() {
    const value = this.backupForm.value;
    let volume = this.data.volume;

    if (this.showVolumeSelect) {
      volume = value.volume;
    }

    if (volume) {
      value.volume_id = volume.id ? volume.id: volume;
    }

    let request;

    if (this.data.backup) {
      value.id = this.data.backup.id;
      request = this.volumeBackupsApiService.update(value.id, value);
    } else {
      request = this.volumeBackupsApiService.create(value);
    }

    request.subscribe(result => {
      if (result) {
        this.dialogRef.close('Ok');
      } else {
        this.dialogRef.close('');
      }
    }, error => {
      this.backendErrors = error.error;
      this.formErrors.setBackendErrors(error.error);
    });
  }
}
