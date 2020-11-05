import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NotificationService } from '@shared/ui-api/notification.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { InstancesApiService } from '@fleio-api/openstack/instance/instances-api.service';
import { PortsApiService } from '@fleio-api/openstack/port/ports-api.service';
import { IInstanceModel } from '@fleio-api/openstack/model/instance.model';
import { IPortModel } from '@fleio-api/openstack/model/port.model';

@Component({
  selector: 'app-instance-details-add-ip-dialog',
  templateUrl: './instance-details-add-ip-dialog.component.html',
  styleUrls: ['./instance-details-add-ip-dialog.component.scss']
})
export class InstanceDetailsAddIpDialogComponent implements OnInit {
  @ViewChild('formErrors') formErrors;
  loading = false;
  ports: IPortModel[];
  subnets: any[];
  networks: {id: string; subnets: {}[]; }[];
  addIpForm: FormGroup = this.formBuilder.group({
    fixed_ips: this.formBuilder.array(
      [this.createIp()]
    ),
    append_ip: [true, Validators.required],
    subnet: ['', Validators.required],
    device_id: [this.getInstanceId(), Validators.required],
    device_owner: ['compute:nova', Validators.required],
    region: [this.getInstanceRegion(), Validators.required],
    port: ['', Validators.required]
  });

  getInstanceId() {
    if (this.data && this.data.instance) {
      return this.data.instance.id;
    }
    return '';
  }

  getInstanceRegion() {
    if (this.data && this.data.instance) {
      return this.data.instance.region;
    }
    return '';
  }

  constructor(
    private formBuilder: FormBuilder,
    private notificationService: NotificationService,
    public dialogRef: MatDialogRef<InstanceDetailsAddIpDialogComponent>,
    private instancesApi: InstancesApiService,
    private portsApi: PortsApiService,
    @Inject(MAT_DIALOG_DATA) public data: {
      instance: IInstanceModel,
    }
  ) { }

  public close() {
    this.dialogRef.close(false);
  }

  private createIp() {
    return this.formBuilder.group({
      ip_address: ['', Validators.required],
    });
  }

  public addIp() {
    const portIps = this.addIpForm.get('fixed_ips') as FormArray;
    portIps.push(this.createIp());
  }

  public removeIp(index) {
    const portIps = this.addIpForm.get('fixed_ips') as FormArray;
    portIps.removeAt(index);
  }

  public changeSubnets() {
    for (const port of this.ports) {
      if (this.addIpForm.controls.port.value === port.id) {
        for (const network of this.networks) {
          if (port.network === network.id) {
            this.subnets = network.subnets;
            this.addIpForm.controls.subnet.setValue(this.subnets[0].id);
          }
        }
      }
    }
  }

  public addIpToInstance() {
    this.loading = true;
    if (!this.addIpForm.valid) {
      this.loading = false;
      return;
    }
    const value = this.addIpForm.value;
    this.portsApi.objectPostAction(
      value.port,
      'add_ip',
      value
    ).pipe().subscribe(response => {
      this.loading = false;
      this.dialogRef.close(true);
    }, error => {
      this.loading = false;
      this.formErrors.setBackendErrors(error.error.detail);
    });
  }

  ngOnInit() {
    if (this.data && this.data.instance) {
      this.instancesApi.objectGetAction(
        this.data.instance.id,
        'add_ip_options'
      ).pipe().subscribe(response => {
        this.ports = response.ports;
        this.networks = response.networks;
        this.addIpForm.controls.port.setValue(this.ports[0].id);
        this.changeSubnets();
      });
    }
  }

}
