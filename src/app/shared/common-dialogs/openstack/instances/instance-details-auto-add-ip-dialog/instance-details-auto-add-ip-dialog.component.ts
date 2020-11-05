import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NotificationService } from '@shared/ui-api/notification.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { InstancesApiService } from '@fleio-api/openstack/instance/instances-api.service';
import { PortsApiService } from '@fleio-api/openstack/port/ports-api.service';
import { IInstanceModel } from '@fleio-api/openstack/model/instance.model';
import { IPortModel } from '@fleio-api/openstack/model/port.model';

@Component({
  selector: 'app-instance-details-auto-add-ip-dialog',
  templateUrl: './instance-details-auto-add-ip-dialog.component.html',
  styleUrls: ['./instance-details-auto-add-ip-dialog.component.scss']
})
export class InstanceDetailsAutoAddIpDialogComponent implements OnInit {
  @ViewChild('formErrors') formErrors;
  ipsToAllocate = 1;
  loading = false;
  networks: {id: string; subnets: {}[]; }[];
  ports: IPortModel[];
  subnets: any[];
  addIpAutomaticallyForm: FormGroup = this.formBuilder.group({
    fixed_ips: this.formBuilder.array(
      []
    ),
    append_ip: [true, Validators.required],
    subnet: ['', Validators.required],
    device_id: [this.getDeviceId(), Validators.required],
    device_owner: ['compute:nova', Validators.required],
    region: [this.getRegion(), Validators.required],
    port: ['', Validators.required]
  });

  getDeviceId() {
    if (this.data && this.data.instance) {
      return this.data.instance.id;
    }
    return '';
  }

  getRegion() {
    if (this.data && this.data.instance) {
      return this.data.instance.region;
    }
    return '';
  }

  constructor(
    private formBuilder: FormBuilder,
    private notificationService: NotificationService,
    public dialogRef: MatDialogRef<InstanceDetailsAutoAddIpDialogComponent>,
    private instancesApi: InstancesApiService,
    private portsApi: PortsApiService,
    @Inject(MAT_DIALOG_DATA) public data: {
      instance: IInstanceModel,
    }
  ) { }

  private createIp(subnetId) {
    return this.formBuilder.group({
      subnet_id: [subnetId, Validators.required],
    });
  }

  public close() {
    this.dialogRef.close(false);
  }

  public changeSubnets() {
    for (const port of this.ports) {
      if (this.addIpAutomaticallyForm.controls.port.value === port.id) {
        for (const network of this.networks) {
          if (port.network === network.id) {
            this.subnets = network.subnets;
            this.addIpAutomaticallyForm.controls.subnet.setValue(this.subnets[0].id);
          }
        }
      }
    }
  }

  public addIpsAutomatically() {
    this.loading = true;
    if (!this.addIpAutomaticallyForm.valid) {
      this.loading = false;
      return;
    }
    const value = this.addIpAutomaticallyForm.value;
    const fixedIps = this.addIpAutomaticallyForm.get('fixed_ips') as FormArray;
    for (let i = 0; i < this.ipsToAllocate; i++) {
      fixedIps.push(this.createIp(this.addIpAutomaticallyForm.controls.subnet.value));
    }
    if (value) {
      this.portsApi.objectPostAction(
        value.port,
        'automatic_add_ips',
        {
          region: this.data.instance.region,
          fixed_ips: this.addIpAutomaticallyForm.get('fixed_ips').value
        }
      ).pipe().subscribe(response => {
        this.loading = false;
        this.dialogRef.close(true);
      }, error => {
        this.loading = false;
        const fixedIpsSubmitted = this.addIpAutomaticallyForm.get('fixed_ips') as FormArray;
        for (let i = 0; i < fixedIpsSubmitted.length; i++) {
          // clear submitted ips
          fixedIpsSubmitted.removeAt(i);
        }
        this.formErrors.setBackendErrors(error.error.detail);
      });
    }
  }

  ngOnInit() {
    if (this.data && this.data.instance) {
      this.instancesApi.objectGetAction(
        this.data.instance.id,
        'add_ip_options'
      ).pipe().subscribe(response => {
        this.ports = response.ports;
        this.networks = response.networks;
        this.addIpAutomaticallyForm.controls.port.setValue(this.ports[0].id);
        this.changeSubnets();
      });
    }
  }

}
