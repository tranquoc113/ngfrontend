import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormControl, FormGroup } from '@angular/forms';
import { NotificationService } from '../../ui-api/notification.service';
import { LicenseApiService } from '../../fleio-api/core/license-api.service';

@Component({
  selector: 'app-set-license',
  templateUrl: './set-license.component.html',
  styleUrls: ['./set-license.component.scss']
})
export class SetLicenseComponent implements OnInit {
  licenseKey: FormControl = new FormControl();
  formOptions: FormGroup = new FormGroup({
    licenseKey: this.licenseKey,
  });
  loading = false;
  @ViewChild('formErrors') formErrors;

  constructor(
    public dialogRef: MatDialogRef<SetLicenseComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {},
    private licenseApiService: LicenseApiService,
    private notificationService: NotificationService,
  ) {
  }

  ngOnInit() {
  }

  save() {
    if (this.licenseKey.value) {
      this.loading = true;
      this.licenseApiService.setLicense(this.licenseKey.value).subscribe(() => {
        this.dialogRef.close('License set successfully.');
        this.loading = false;
        window.location.reload();
      }, error => {
        this.loading = false;
        this.formErrors.setBackendErrors(error.error.detail);
      });
    } else {
      this.notificationService.showMessage('You need to add a licence key.');
    }
  }
}
