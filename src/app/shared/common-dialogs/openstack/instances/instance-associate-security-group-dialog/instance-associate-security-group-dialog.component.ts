import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ISecurityGroupModel } from '@fleio-api/openstack/model/security-group.model';
import { NotificationService } from '@shared/ui-api/notification.service';
import { InstancesApiService } from '@fleio-api/openstack/instance/instances-api.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { IInstanceModel } from '@fleio-api/openstack/model/instance.model';

@Component({
  selector: 'app-instance-associate-security-group-dialog',
  templateUrl: './instance-associate-security-group-dialog.component.html',
  styleUrls: ['./instance-associate-security-group-dialog.component.scss']
})
export class InstanceAssociateSecurityGroupDialogComponent implements OnInit {
  @ViewChild('formErrors') formErrors;
  loading = false;
  backendErrors = {};
  associateSecurityGroupForm = this.formBuilder.group({
    group: ['', Validators.required]
  });
  securityGroups: Array<ISecurityGroupModel> = [];

  constructor(
    private formBuilder: FormBuilder,
    private notificationService: NotificationService,
    private instancesApi: InstancesApiService,
    public dialogRef: MatDialogRef<InstanceAssociateSecurityGroupDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {
      instance: IInstanceModel,
    },
  ) { }

  public attachPort() {
    this.loading = true;
    if (!this.associateSecurityGroupForm.valid) {
      this.loading = false;
      return;
    }
    const value = this.associateSecurityGroupForm.value;
    this.instancesApi.associateSecurityGroup(this.data.instance.id, value.group).subscribe(response => {
      this.loading = false;
      this.dialogRef.close(true);
    }, error => {
      this.loading = false;
      this.formErrors.setBackendErrors(error.error.detail);
    });
  }

  public close() {
    this.dialogRef.close(false);
  }

  ngOnInit(): void {
    if (this.data && this.data.instance) {
      this.instancesApi.getAssociateSecurityGroupOptions(this.data.instance.id).subscribe(response => {
        this.securityGroups = response.groups;
      }, error => {
        this.notificationService.showMessage('Could not load associate security group options.');
        this.close();
      });
    }
  }

}
