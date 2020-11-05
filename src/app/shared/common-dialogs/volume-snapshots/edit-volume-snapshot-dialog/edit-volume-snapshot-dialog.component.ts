import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { IVolumeModel } from '@fleio-api/openstack/model/volume.model';
import { IVolumeSnapshotModel } from '@fleio-api/openstack/model/volume-snapshot.model';
import { VolumeSnapshotsApiService } from '@fleio-api/openstack/volume/volume-snapshots-api.service';
import { Observable } from 'rxjs';
import { VolumesApiService } from '@fleio-api/openstack/volume/volumes-api.service';
import { map, mergeMap, startWith } from 'rxjs/operators';

@Component({
  selector: 'app-edit-volume-snapshot-dialog',
  templateUrl: './edit-volume-snapshot-dialog.component.html',
  styleUrls: ['./edit-volume-snapshot-dialog.component.scss']
})
export class EditVolumeSnapshotDialogComponent implements OnInit {
  @ViewChild('formErrors') protected formErrors;
  backendErrors = {};
  snapshotForm = this.formBuilder.group({
    for_client: [false],
    name: ['', Validators.required],
    force: [false],
    description: [''],
    volume: ['', Validators.required],
  });
  filteredVolumes$: Observable<IVolumeModel[]>;
  showVolumeSelect: boolean;
  saving: boolean;

  constructor(
    public dialogRef: MatDialogRef<EditVolumeSnapshotDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {
      volume: IVolumeModel;
      snapshot: IVolumeSnapshotModel;
    },
    private volumeSnapshotsApiService: VolumeSnapshotsApiService,
    private volumesApiService: VolumesApiService,
    private formBuilder: FormBuilder,
  ) {
  }

  clearVolume() {
    this.snapshotForm.controls.volume.setValue('');
  }

  volumeDisplay(volume?: IVolumeModel): string | undefined {
    if (volume) {
      return volume.name ? `${volume.name} - ${volume.id}` : volume.id.toString();
    } else {
      return undefined;
    }
  }

  ngOnInit() {
    if (this.data.snapshot) {
      this.snapshotForm.patchValue(this.data.snapshot);
      this.snapshotForm.controls.for_client.disable();
      this.snapshotForm.controls.force.disable();
      this.snapshotForm.controls.description.disable();
    }

    this.showVolumeSelect = !this.data.snapshot && !this.data.volume;

    if (this.showVolumeSelect) {
      this.filteredVolumes$ = this.snapshotForm.controls.volume.valueChanges.pipe(
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
      this.snapshotForm.controls.volume.disable();
    }
  }

  close() {
    this.dialogRef.close(false);
  }

  createOrUpdate() {
    if (this.snapshotForm.invalid) {
      return;
    }
    const value = this.snapshotForm.value;
    let volume = this.data.volume;

    if (this.showVolumeSelect) {
      volume = value.volume;
    }

    if (volume) {
      value.volume_id = volume.id ? volume.id : volume;
    }

    let request;

    if (this.data.snapshot) {
      value.id = this.data.snapshot.id;
      request = this.volumeSnapshotsApiService.update(value.id, value);
    } else {
      request = this.volumeSnapshotsApiService.create(value);
    }

    this.saving = true;
    request.subscribe(result => {
      if (result) {
        this.dialogRef.close('Ok');
      } else {
        this.dialogRef.close('');
      }
    }, error => {
      this.backendErrors = error.error;
      this.formErrors.setBackendErrors(error.error);
    }).add(() => {
      this.saving = false;
    });
  }
}
