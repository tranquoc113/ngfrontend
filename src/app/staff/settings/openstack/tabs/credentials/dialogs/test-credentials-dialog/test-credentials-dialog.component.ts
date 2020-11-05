import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { SettingsOpenstackApiService } from '../../../../../../../shared/fleio-api/core/settings-openstack-api.service';
import { IOpenstackCredentialsModel } from '../../../../../../../shared/fleio-api/core/model/openstack-credentials.model';
import { IResponseWithDetailModel } from '../../../../../../../shared/fleio-api/base-model/response-with-detail.model';
import { IErrorResponseModel } from '../../../../../../../shared/fleio-api/base-model/error-response.model';

@Component({
  selector: 'app-test-credentials-dialog',
  templateUrl: './test-credentials-dialog.component.html',
  styleUrls: ['./test-credentials-dialog.component.scss']
})
export class TestCredentialsDialogComponent implements OnInit {
  testResults: IResponseWithDetailModel;
  testError: IErrorResponseModel;
  testingCredentials: boolean;

  constructor(
    public dialogRef: MatDialogRef<TestCredentialsDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { credentials: IOpenstackCredentialsModel },
    private settingsOpenstackApi: SettingsOpenstackApiService,
  ) {
  }

  ngOnInit(): void {
    this.testingCredentials = true
    this.settingsOpenstackApi.testCredentials(this.data.credentials).subscribe(
      testResults => {
        this.testResults = testResults;
      },
      error => {
        this.testError = error.error as IErrorResponseModel;
      },
    ).add(() => {
      this.testingCredentials = false;
    })
  }

  close() {
    this.dialogRef.close();
  }

  saveAndSync() {
    if (this.testError) {
      this.dialogRef.close();
    } else {
      this.dialogRef.close('save')
    }
  }
}
