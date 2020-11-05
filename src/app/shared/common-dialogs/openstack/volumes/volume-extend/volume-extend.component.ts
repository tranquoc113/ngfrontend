import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { IVolumeModel } from '@fleio-api/openstack/model/volume.model';
import { VolumesApiService } from '@fleio-api/openstack/volume/volumes-api.service';
import { RefreshService } from '@shared/ui-api/refresh.service';

@Component({
  selector: 'app-volume-extend',
  templateUrl: './volume-extend.component.html',
  styleUrls: ['./volume-extend.component.scss']
})
export class VolumeExtendComponent implements OnInit {
  @ViewChild('formErrors') protected formErrors;
  backendErrors = {};
  extendForm = this.formBuilder.group({
    size: ['', Validators.required],
  });

  constructor(
    public dialogRef: MatDialogRef<VolumeExtendComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { volume: IVolumeModel },
    private volumesApiService: VolumesApiService,
    private formBuilder: FormBuilder,
    private refreshService: RefreshService,
  ) {
  }

  ngOnInit() {
    this.extendForm.controls.size.setValue(this.data.volume.size);
  }

  close() {
    this.dialogRef.close(false);
  }

  extendVolume() {
    this.volumesApiService.objectPostAction(
      this.data.volume.id,
      'extend',
      this.extendForm.value
    ).subscribe(result => {
      if (result) {
        this.dialogRef.close('Volume extend scheduled');
        this.refreshService.refresh();
      } else {
        this.dialogRef.close('');
      }
    }, error => {
      this.backendErrors = error.error;
      this.formErrors.setBackendErrors(error.error);
    });
  }
}
