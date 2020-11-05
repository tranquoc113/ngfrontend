import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { InstancesApiService } from '@fleio-api/openstack/instance/instances-api.service';
import { NotificationService } from '@shared/ui-api/notification.service';
import { VolumesApiService } from '@fleio-api/openstack/volume/volumes-api.service';
import { FleioObjectsList } from '@fleio-api/fleio-objects-list';
import { IVolumeModel } from '@fleio-api/openstack/model/volume.model';

@Component({
  selector: 'app-instance-details-create-snapshot-dialog',
  templateUrl: './instance-details-attach-volume-dialog.component.html',
  styleUrls: ['./instance-details-attach-volume-dialog.component.scss']
})
export class InstanceDetailsAttachVolumeDialogComponent implements OnInit {
  @ViewChild('formErrors') formErrors;
  loading = false;
  volumesToAttach: IVolumeModel[];
  attachVolumeForm: FormGroup = new FormGroup({
    volume_id: new FormControl('', Validators.required),
  });
  constructor(
    private notificationService: NotificationService,
    private instancesApiService: InstancesApiService,
    private volumesApiService: VolumesApiService,
    public dialogRef: MatDialogRef<InstanceDetailsAttachVolumeDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {
      instanceId: string,
      instanceName: string,
      project: string,
      region: string
    },
  ) { }

  ngOnInit() {
    this.volumesToAttach = [];
    this.loading = true;
    this.volumesApiService.list(
      {
        page_size: '100000',
        project: this.data.project,
        region: this.data.region,
        status: 'available'
      }
    ).pipe().subscribe((response: FleioObjectsList<IVolumeModel>) => {
      this.volumesToAttach = response.objects;
      this.loading = false;
    });
  }

  close() {
    this.dialogRef.close(false);
  }

  attachVolume() {
    this.loading = true;
    const value = this.attachVolumeForm.value;
    if (!value.volume_id) {
      this.loading = false;
      return;
    }
    this.instancesApiService.objectPostAction(
      this.data.instanceId, 'attach_volume', value
    ).pipe().subscribe(response => {
      this.loading = false;
      this.dialogRef.close(true);
    }, error => {
      this.loading = false;
      this.notificationService.showMessage('Failed to attach volume');
      this.formErrors.setBackendErrors(error);
    });
  }

}
