import { Component, OnInit } from '@angular/core';
import { GoogleAuthenticatorApiService } from '@fleio-api/plugins/google-authenticator/google-authenticator-api.service';
import { ConfigService } from '@shared/config/config.service';
import { NotificationService } from '@shared/ui-api/notification.service';
import { EMPTY, Observable } from 'rxjs';
import { FormBuilder, Validators } from '@angular/forms';
import { DetailsFormBase } from '@objects-view/details-form-base';
import { Router } from '@angular/router';

@Component({
  selector: 'app-google-authenticator-details-tab',
  templateUrl: './google-authenticator-details-tab.component.html',
  styleUrls: ['./google-authenticator-details-tab.component.scss']
})
export class GoogleAuthenticatorDetailsTabComponent extends DetailsFormBase<any> implements OnInit {
  gaForm = this.formBuilder.group({
    code: ['', [Validators.required]]
  });
  backendErrors = {};
  status: {
    enabled: boolean;
    default: boolean;
  };
  secretKey: string;
  imageLocation: string;
  loading = false;
  constructor(
    private googleAuthenticatorApiService: GoogleAuthenticatorApiService,
    public config: ConfigService,
    private notificationService: NotificationService,
    private formBuilder: FormBuilder,
    private router: Router,
  ) {
    super();
  }

  getGAData() {
    this.loading = true;
    this.googleAuthenticatorApiService.getStatus().subscribe(response => {
      this.status = response;
      this.loading = false;
      this.getSecretKey();
    }, error => {
      if (error.status === 403) {
        this.notificationService.showMessage('You need to confirm password');
        this.router.navigateByUrl(this.config.getPanelUrl('sfa/confirm-password'));
        this.loading = false;
      } else {
        this.notificationService.showMessage('Failed to get second factor auth method status');
        this.loading = false;
      }
    });
  }

  getSecretKey() {
    this.loading = true;
    this.googleAuthenticatorApiService.getCode().subscribe(response => {
      this.secretKey = response.secret_key;
      this.loading = false;
    }, error => {
      if (error.status === 403) {
        this.notificationService.showMessage('You need to confirm password');
        this.router.navigateByUrl(this.config.getPanelUrl('sfa/confirm-password'));
        this.loading = false;
      } else {
        this.notificationService.showMessage('Failed to get secret key');
        this.loading = false;
      }
    });
  }

  refreshData() {
    this.imageLocation = this.config.getPanelApiUrl('plugins/google_authenticator/api/get_qr_code');
    this.getGAData();
  }

  ngOnInit(): void {
    this.refreshData();
  }

  enable() {
    this.validate();
    if (this.gaForm.invalid) {
      this.displayControlErrors();
      return EMPTY;
    }

    const value = this.gaForm.value;

    this.googleAuthenticatorApiService.enable(value.code).subscribe(response => {
      this.refreshData();
    }, error => {
      if (error.error) {
        this.setErrors(error.error);
      }
      this.refreshData();
    });
  }

  disable() {
    let dialogResult$: Observable<string>;
    dialogResult$ = this.notificationService.confirmDialog({
        title: 'Disable google authenticator?',
        message: 'Are you sure?',
      });
    dialogResult$.subscribe(dialogResult => {
      if (dialogResult === 'yes') {
        this.googleAuthenticatorApiService.disable().subscribe(response => {
          this.refreshData();
        }, error => {
          this.notificationService.showMessage('Failed to disable second factor auth method.')
        })
      }
    });
  }

  regenerate() {
    let dialogResult$: Observable<string>;
    dialogResult$ = this.notificationService.confirmDialog({
        title: 'Regenerate code',
        message: 'Are you sure?',
        importantMessage: 'You will need to re-enable google authenticator.',
      });
    dialogResult$.subscribe(dialogResult => {
      if (dialogResult === 'yes') {
        this.googleAuthenticatorApiService.regenerate().subscribe(response => {
          window.location.reload();
        }, error => {
          this.notificationService.showMessage('Failed to regenerate code for google authenticator.')
        })
      }
    });
  }

  makeDefault() {
    let dialogResult$: Observable<string>;
    dialogResult$ = this.notificationService.confirmDialog({
        title: 'Set google authenticator as default',
        message: 'Are you sure?',
      });
    dialogResult$.subscribe(dialogResult => {
      if (dialogResult === 'yes') {
        this.googleAuthenticatorApiService.makeDefault().subscribe(response => {
          this.refreshData();
        }, error => {
          this.notificationService.showMessage(
            'Failed to make google authenticator the default second factor auth method.'
          );
        })
      }
    });
  }

}
