import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { IInstanceModel } from '@fleio-api/openstack/model/instance.model';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { InstancesApiService } from '@fleio-api/openstack/instance/instances-api.service';
import { PortsApiService } from '@fleio-api/openstack/port/ports-api.service';
import { NotificationService } from '@shared/ui-api/notification.service';

@Component({
  selector: 'app-instance-details-add-port-dialog',
  templateUrl: './instance-details-add-port-dialog.component.html',
  styleUrls: ['./instance-details-add-port-dialog.component.scss']
})
export class InstanceDetailsAddPortDialogComponent implements OnInit {
  @ViewChild('formErrors') formErrors;
  networks: {
    name: string,
    description: string,
    id: string,
    subnets: {
      id: string;
      name: string;
      cidr: string;
    }[];
  }[];
  subnets: {
    id: string;
    name: string;
    cidr: string;
  }[];
  projectId: string | null;
  loading = false;
  addPortForm: FormGroup = this.formBuilder.group({
    fixed_ips: this.formBuilder.array(
      []
    ),
    project: ['', Validators.required],
    network: ['', Validators.required],
    subnet: ['', Validators.required],
    device_id: [this.getInstanceId(), Validators.required],
    device_owner: ['compute:nova', Validators.required],
    region: [this.getInstanceRegion(), Validators.required],
    attach_to: ['instance', Validators.required]
  });
  constructor(
    private formBuilder: FormBuilder,
    private notificationService: NotificationService,
    public dialogRef: MatDialogRef<InstanceDetailsAddPortDialogComponent>,
    private instancesApi: InstancesApiService,
    private portsApi: PortsApiService,
    @Inject(MAT_DIALOG_DATA) public data: {
      instance: IInstanceModel,
    },
  ) { }

  getInstanceRegion() {
    if (this.data && this.data.instance) {
      return this.data.instance.region;
    }
    return '';
  }

  private getInstanceId() {
    if (this.data && this.data.instance) {
      return this.data.instance.id;
    } else {
      return '';
    }
  }

  public close() {
    this.dialogRef.close(false);
  }

  public createPortIp() {
    return this.formBuilder.group({
      ip_address: ['', Validators.required],
    });
  }

  public addPortIp() {
    const portIps = this.addPortForm.get('fixed_ips') as FormArray;
    portIps.push(this.createPortIp());
  }

  public removeIp(index) {
    const portIps = this.addPortForm.get('fixed_ips') as FormArray;
    portIps.removeAt(index);
  }

  public changeSubnets() {
    for (const network of this.networks) {
      if (network.id === this.addPortForm.controls.network.value) {
        this.subnets = network.subnets;
        this.addPortForm.controls.subnet.setValue(this.subnets[0].id);
      }
    }
  }

  public addPort() {
    this.loading = true;
    if (!this.addPortForm.valid) {
      this.loading = false;
      return;
    }
    const value = this.addPortForm.value;
    if (value.fixed_ips.length === 0 && value.subnet) {
      value.fixed_ips = [{subnet_id: value.subnet}];
    }
    this.portsApi.create(
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
    this.networks = [];
    this.projectId = null;
    if (this.data && this.data.instance) {
      this.instancesApi.objectGetAction(
        this.data.instance.id,
        'add_port_options'
      ).pipe().subscribe(response => {
        this.networks = response.networks;
        this.projectId = response.project_id;
        this.addPortForm.controls.network.setValue(this.networks[0].id);
        this.addPortForm.controls.project.setValue(this.projectId);
        this.changeSubnets();
      });
    }
  }

}
