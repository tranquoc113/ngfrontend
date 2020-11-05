import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AppLocalStorageService } from '../../ui-api/app-local-storage.service';
import { ConfigService } from '../../config/config.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-license-warning-dialog',
  templateUrl: './license-warning-dialog.component.html',
  styleUrls: ['./license-warning-dialog.component.scss']
})
export class LicenseWarningDialogComponent implements OnInit {
  permanentlyHideWasSet: boolean;

  constructor(
    public dialogRef: MatDialogRef<LicenseWarningDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {
      licenseDaysLeft: number,
      coreDaysLeft: number,
      maxCores: number,
      coresInUse: number
    },
    private appLocalStorageService: AppLocalStorageService,
    private config: ConfigService, private router: Router,
    ) {
  }

  permanentlyHide() {
    this.appLocalStorageService.setLicenseWarningHide(true);
    this.dialogRef.close(true);
  };

  close() {
    this.dialogRef.close(true);
  };

  goToLicense() {
    this.router.navigateByUrl('settings/general#license').then(() => {
      this.close();
    })
  }

  ngOnInit() {
    // used to hide warning button if dialog was manually opened and auto show is disabled
    this.permanentlyHideWasSet = this.appLocalStorageService.getLicenseWarningHide();
  }
}
