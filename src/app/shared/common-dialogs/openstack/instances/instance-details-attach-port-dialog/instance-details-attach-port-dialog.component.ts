import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { IInstanceModel } from '@fleio-api/openstack/model/instance.model';
import { FormBuilder, Validators } from '@angular/forms';
import { NotificationService } from '@shared/ui-api/notification.service';
import { InstancesApiService } from '@fleio-api/openstack/instance/instances-api.service';
import { Observable } from 'rxjs';
import { IPortModel } from '@fleio-api/openstack/model/port.model';
import { map, mergeMap, startWith } from 'rxjs/operators';
import { PortsApiService } from '@fleio-api/openstack/port/ports-api.service';

@Component({
  selector: 'app-instance-details-attach-port-dialog',
  templateUrl: './instance-details-attach-port-dialog.component.html',
  styleUrls: ['./instance-details-attach-port-dialog.component.scss']
})
export class InstanceDetailsAttachPortDialogComponent implements OnInit {
  @ViewChild('formErrors') formErrors;
  loading = false;
  backendErrors = {};
  attachPortForm = this.formBuilder.group({
    port: ['', Validators.required]
  });
  filteredPorts$: Observable<Array<IPortModel>>;

  constructor(
    private formBuilder: FormBuilder,
    private notificationService: NotificationService,
    private instancesApi: InstancesApiService,
    private portsApi: PortsApiService,
    public dialogRef: MatDialogRef<InstanceDetailsAttachPortDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {
      instance: IInstanceModel,
    },
  ) { }

  clearPort() {
    this.attachPortForm.controls.port.setValue('');
  }

  public attachPort() {
    this.loading = true;
    if (!this.attachPortForm.valid) {
      this.loading = false;
      return;
    }
    const value = this.attachPortForm.value;
    const portId = value.port.id;
    this.instancesApi.attachPort(this.data.instance.id, portId).subscribe(response => {
      this.loading = false;
      this.dialogRef.close(true);
    }, error => {
      this.loading = false;
      this.formErrors.setBackendErrors(error.error.detail);
    });
  }

  displayPortFn(port) {
    if (port) {
      return port.name || port.id;
    }
    return '';
  }

  public close() {
    this.dialogRef.close(false);
  }

  ngOnInit(): void {
    if (this.data && this.data.instance) {
      this.filteredPorts$ = this.attachPortForm.controls.port.valueChanges.pipe(
        startWith(''),
        map(value => {
          return typeof value === 'string' ? value : value.id;
        }),
        mergeMap(value => {
          return this.portsApi.list({
            search: value,
            filtering: 'project__project_id:' + this.data.instance.project + '+network__region:'
              + this.data.instance.region + '+device_id__exact:'
          }).pipe(map(list => list.objects));
        })
      );
    }
  }

}
