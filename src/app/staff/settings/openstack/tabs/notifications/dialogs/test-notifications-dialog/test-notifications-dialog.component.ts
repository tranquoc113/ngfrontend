import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { IOpenstackNotificationsModel } from '../../../../../../../shared/fleio-api/core/model/openstack-notifications.model';
import { IOpenstackNotificationsTestResultsModel } from '../../../../../../../shared/fleio-api/core/model/openstack-notifications-test-results.model';
import { SettingsOpenstackApiService } from '../../../../../../../shared/fleio-api/core/settings-openstack-api.service';

@Component({
  selector: 'app-test-notifications-dialog',
  templateUrl: './test-notifications-dialog.component.html',
  styleUrls: ['./test-notifications-dialog.component.scss']
})
export class TestNotificationsDialogComponent implements OnInit {
  testResults: IOpenstackNotificationsTestResultsModel;
  testError: string;
  checkingSettings: boolean;

  constructor(
    public dialogRef: MatDialogRef<TestNotificationsDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { notifications: IOpenstackNotificationsModel },
    private settingsOpenstackApi: SettingsOpenstackApiService,
  ) {
  }

  ngOnInit(): void {
    this.checkingSettings = true
    this.settingsOpenstackApi.testNotifications(this.data.notifications).subscribe(
      testResults => {
        this.testResults = testResults;
      },
      error => {
        this.testError = error;
      },
    ).add(()=>{
      this.checkingSettings = false;
    })
  }

  close() {
    this.dialogRef.close();
  }
}
