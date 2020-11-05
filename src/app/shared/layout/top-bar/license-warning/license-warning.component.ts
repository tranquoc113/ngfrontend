import { ChangeDetectorRef, Component, NgZone, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from '@shared/auth/auth.service';
import { AppLocalStorageService } from '@shared/ui-api/app-local-storage.service';
import { RefreshTimer } from '@shared/ui-api/helpers/refresh-timer';
import { LicenseWarningDialogComponent } from '@shared/fleio-data-controls/license-warning-dialog/license-warning-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { ConfigService } from '@shared/config/config.service';

@Component({
  selector: 'app-license-warning',
  templateUrl: './license-warning.component.html',
  styleUrls: ['./license-warning.component.scss']
})
export class LicenseWarningComponent implements OnInit, OnDestroy {
  opened = false;
  showWarn = false;
  licenseExpiringText = 'test';
  licenseDaysLeft: number;
  warningLevel: number;
  coreDaysLeft: number;
  maxCores: number;
  coresInUse: number;
  coresExceededText = 'You are using more CPU cores than your license allows.';
  intervalDisplayWarning = null as null | RefreshTimer;
  millisecondInterval = 3600 * 1000; // 1 hour

  constructor(public authService: AuthService, private appLocalStorageService: AppLocalStorageService,
              private readonly matDialog: MatDialog, private configService: ConfigService,
              private ngZone: NgZone, private changeDetectorRef: ChangeDetectorRef,) { }

  handleWarning() {
    if (this.opened === false) {
      this.opened = true;
      this.matDialog.open(
        LicenseWarningDialogComponent, {
          data: {
            licenseDaysLeft: this.licenseDaysLeft,
            coreDaysLeft: this.coreDaysLeft,
            maxCores: this.maxCores,
            coresInUse: this.coresInUse
          }
        }).afterClosed().subscribe(() => {
        this.opened = false;
      })
    }
  }

  displayWarning() {
    if (this.appLocalStorageService.getLicenseWarningHide() === true) {
      if (this.intervalDisplayWarning) {
        this.intervalDisplayWarning.stop();
        this.intervalDisplayWarning = null;
      }
    } else {
      this.appLocalStorageService.setLicenseLastWarningTime();
      this.handleWarning();
    }
  }

  displayWarningAndInitTimer() {
    this.displayWarning();
    if (this.intervalDisplayWarning) {
      // we need to stop old timer because it may have been shorter than millisecondInterval
      // (e.g. due to refreshing browser and having to re-init faster)
      this.intervalDisplayWarning.stop();
      this.intervalDisplayWarning = null;
    }
    this.intervalDisplayWarning = new RefreshTimer(this.millisecondInterval, () => {
      this.displayWarning();
    }, this.configService, this.ngZone, this.changeDetectorRef, true);
  };

  ngOnInit(): void {
    this.authService.observableUserData.subscribe(() => {
      this.initWarningData();
    });
  }

  initWarningData() {
    if (this.authService.userData && this.authService.userData.user) {
      if (this.authService.userData.user.license_expiring || this.authService.userData.user.cores_exceeded) {
        this.showWarn = true;

        if (this.authService.userData.user.license_expiring) {
          this.licenseDaysLeft = this.authService.userData.user.license_expiring.warning_days;
          this.warningLevel = this.authService.userData.user.license_expiring.warning_level;
          if (this.licenseDaysLeft === 1) {
            this.licenseExpiringText = 'You have 1 day left from your license.';
          } else {
            this.licenseExpiringText = `You have ${this.licenseDaysLeft} days left from your license.`;
          }
        }
        if (this.authService.userData.user.cores_exceeded) {
          this.coreDaysLeft = this.authService.userData.user.cores_exceeded.grace_days;
          this.maxCores = this.authService.userData.user.cores_exceeded.max_cores;
          this.coresInUse = this.authService.userData.user.cores_exceeded.cores_in_use;
        }

        // popup warning dialog hourly
        if (this.warningLevel === 2 &&
          this.appLocalStorageService.getLicenseWarningHide() === false) {
          const lastWarning = this.appLocalStorageService.getLicenseLastWarningTime();
          if (lastWarning !== null) {
            // if interval was killed (browser refresh or closed tab)
            if (this.intervalDisplayWarning === null) {
              // @ts-ignore
              if (new Date() - new Date(lastWarning) > this.millisecondInterval) {
                // hidden time passed, show dialog and init timer
                this.displayWarningAndInitTimer();
              } else {
                // display warning and init timer only after the "hidden" millisecond interval finishes
                this.intervalDisplayWarning = new RefreshTimer(
                  // @ts-ignore
                  this.millisecondInterval - (new Date() - new Date(lastWarning)),
                  () => {
                  this.displayWarningAndInitTimer();
                }, this.configService, this.ngZone,this.changeDetectorRef,true);
              }
            }
          } else {
            this.displayWarningAndInitTimer();
          }
        } else if (this.warningLevel === 1) {
          this.appLocalStorageService.setLicenseWarningHide(false);
        }
      }
    }
  }

  ngOnDestroy() {
    if (this.intervalDisplayWarning) {
      this.intervalDisplayWarning.stop();
      this.intervalDisplayWarning = null;
    }
  }

}
