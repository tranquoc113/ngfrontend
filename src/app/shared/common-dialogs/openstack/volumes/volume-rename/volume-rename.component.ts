import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { IVolumeModel } from '@fleio-api/openstack/model/volume.model';
import { VolumesApiService } from '@fleio-api/openstack/volume/volumes-api.service';
import { RefreshService } from '../../../../ui-api/refresh.service';

@Component({
  selector: 'app-volume-rename',
  templateUrl: './volume-rename.component.html',
  styleUrls: ['./volume-rename.component.scss']
})
export class VolumeRenameComponent implements OnInit {
  renameForm = this.formBuilder.group({
    name: ['', Validators.required],
  });

  constructor(
    public dialogRef: MatDialogRef<VolumeRenameComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { volume: IVolumeModel },
    private volumesApiService: VolumesApiService,
    private formBuilder: FormBuilder,
    private refreshService: RefreshService,
  ) {
  }

  ngOnInit() {
    this.renameForm.controls.name.setValue(this.data.volume.name);
  }

  close() {
    this.dialogRef.close(false);
  }

  renameVolume() {
    this.volumesApiService.objectPostAction(
      this.data.volume.id,
      'rename',
      this.renameForm.value
    ).subscribe(result => {
      if (result) {
        this.dialogRef.close('Volume renamed');
        this.refreshService.refresh();
      } else {
        this.dialogRef.close('');
      }
    });
  }
}
