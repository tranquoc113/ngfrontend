import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NotificationService } from '@shared/ui-api/notification.service';
import { InstancesApiService } from '@fleio-api/openstack/instance/instances-api.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { IInstanceModel } from '@fleio-api/openstack/model/instance.model';
import { IPortModel } from '@fleio-api/openstack/model/port.model';

@Component({
  selector: 'app-instance-details-associate-ip-dialog',
  templateUrl: './instance-details-associate-ip-dialog.component.html',
  styleUrls: ['./instance-details-associate-ip-dialog.component.scss']
})
export class InstanceDetailsAssociateIpDialogComponent implements OnInit {
  @ViewChild('formErrors') formErrors;
  loading = false;
  backendErrors = {};
  associateIpForm = this.formBuilder.group({
    floating_ip: ['', Validators.required],
    fixed_ip: ['', Validators.required]
  });

  constructor(
    private formBuilder: FormBuilder,
    private notificationService: NotificationService,
    private instancesApi: InstancesApiService,
    public dialogRef: MatDialogRef<InstanceDetailsAssociateIpDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {
      instance: IInstanceModel,
      ports: Array<IPortModel>,
      freeIps: Array<any>
    },
  ) { }

  public close() {
    this.dialogRef.close(false);
  }

  public associateIp() {
    this.loading = true;
    if (!this.associateIpForm.valid) {
      this.loading = false;
      return;
    }
    const value = this.associateIpForm.value;
    const fixedIp = value.fixed_ip.fixed_ips[0].ip_address; // get actual fixed ip from port
    this.instancesApi.associateIp(this.data.instance.id, value.floating_ip, fixedIp).subscribe(response => {
      this.loading = false;
      this.dialogRef.close(true);
    }, error => {
      this.loading = false;
      this.formErrors.setBackendErrors(error.error.detail);
    });
  }

  ngOnInit(): void {
  }

}
