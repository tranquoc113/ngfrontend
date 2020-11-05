import { Component, OnDestroy, OnInit } from '@angular/core';
import { DetailsComponentBase } from '../../../../../shared/ui/objects-view/details-component-base';
import { IBaseFleioObjectModel } from '../../../../../shared/fleio-api/base-model/base-fleio-object.model';
import { LicenseApiService } from '../../../../../shared/fleio-api/core/license-api.service';
import { MatDialog } from '@angular/material/dialog';
import { NotificationService } from '../../../../../shared/ui-api/notification.service';
import { SetLicenseComponent } from '../../../../../shared/fleio-data-controls/set-license/set-license.component';

@Component({
  selector: 'app-license',
  templateUrl: './license.component.html',
  styleUrls: ['./license.component.scss']
})
export class LicenseComponent
  extends DetailsComponentBase<IBaseFleioObjectModel> implements OnInit, OnDestroy {

  public licenseInfo: { [key: string]: any; } = null;
  public loadingLicenseInfo: boolean;

  constructor(
    private licenseApiService: LicenseApiService, private matDialog: MatDialog,
    private notificationService: NotificationService,
  ) {
    super()
  }

  protected initTabData() {
    this.loadingLicenseInfo = true;
    this.licenseApiService.getLicenseInfo().subscribe(licenseInfo => {
      this.licenseInfo = licenseInfo;
      this.loadingLicenseInfo = false;
    })
  }

  ngOnInit(): void {
    super.ngOnInit();
    this.initTabData();
  }

  ngOnDestroy(): void {
  }

  licenseInfoKeys(): string[] {
    return Object.keys(this.licenseInfo)
  }

  refreshLicense() {
    this.notificationService.confirmDialog({
      title: 'Refresh license',
      message: 'Do you want to refresh license?',
    }).subscribe(result => {
      if (result === 'yes') {
        this.notificationService.showMessage('License refresh in progress');
        this.licenseApiService.refreshLicense().subscribe(() => {
          this.notificationService.showMessage('License refreshed')
        }, error => {
          this.notificationService.showMessage(`Failed to refresh license: ${error.error.detail}`)
        });
      }
    })
  }

  setNewLicense() {
    this.matDialog.open(
      SetLicenseComponent, {
        data: {}
      });
  }
}
