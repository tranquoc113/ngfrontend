import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { IInstanceModel } from '@fleio-api/openstack/model/instance.model';
import { InstancesApiService } from '@fleio-api/openstack/instance/instances-api.service';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-instance-change-password-dialog',
  templateUrl: './instance-change-password-dialog.component.html',
  styleUrls: ['./instance-change-password-dialog.component.scss']
})
export class InstanceChangePasswordDialogComponent implements OnInit {
  showPassword = false;
  backendErrors = {};
  loading = false;
  changePasswordForm = this.formBuilder.group({
    password: ['', Validators.required],
  });
  @ViewChild('formErrors') formErrors;
  constructor(
    public dialogRef: MatDialogRef<InstanceChangePasswordDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { instance: IInstanceModel },
    private instancesApiService: InstancesApiService,
    private formBuilder: FormBuilder,
    ) {
  }

  public close() {
    this.dialogRef.close(false);
  }

  public changePassword() {
    if (!this.changePasswordForm.valid) {
      return;
    }
    this.loading = true;
    this.instancesApiService.objectPostAction(
      this.data.instance.id,
      'change_password',
      {
        password: this.changePasswordForm.controls.password.value
      }
    ).subscribe(result => {
      this.loading = false;
      this.dialogRef.close(true);
    }, error => {
      this.loading = false;
      this.backendErrors = error.error;
      this.formErrors.setBackendErrors(error.error);
    });
  }

  ngOnInit() {
  }

}
