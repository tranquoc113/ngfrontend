import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { LogoLinkOptions } from '@shared/ui/logo/logo.component';
import { FormErrorsComponent } from '@shared/error-handling/form-errors/form-errors.component';
import { AuthService } from '@shared/auth/auth.service';
import { ConfigService } from '@shared/config/config.service';
import { SFALoginDataService } from '@fleio-api/second-factor-authentication/sfa-login-data.service';
import { Router } from '@angular/router';
import { SmsAuthenticatorAnonymousApiService } from '@fleio-api/plugins/sms-authenticator/sms-authenticator-anonymous-api.service';
import { NotificationService } from '@shared/ui-api/notification.service';
import { of } from 'rxjs';
import { CookiesHelper } from '@shared/ui-api/helpers/cookies-helper';

@Component({
  selector: 'app-sms-authenticator-confirm-form',
  templateUrl: './sms-authenticator-confirm-form.component.html',
  styleUrls: ['./sms-authenticator-confirm-form.component.scss']
})
export class SmsAuthenticatorConfirmFormComponent implements OnInit {
  confirmLoginForm = this.formBuilder.group({
    code: ['', Validators.required],
    rememberSFA: [false]
  });
  logoLinkOptions = new LogoLinkOptions(false);
  receiver: string;
  verificationCodeTimeout = false;

  @ViewChild('formErrors') formErrors: FormErrorsComponent;

  constructor(
    private formBuilder: FormBuilder, public auth: AuthService, public config: ConfigService,
    private sfaLoginDataService: SFALoginDataService, private router: Router,
    private smsAuthenticatorAnonymousApiService: SmsAuthenticatorAnonymousApiService,
    private notificationService: NotificationService,
  ) {
  }

  goToConfirmOptions() {
    // prevent user from opening page in new tab
    this.router.navigateByUrl(this.config.getPanelUrl('sfa/confirm-options'));
  }

  sendCode(resend=false) {
    this.smsAuthenticatorAnonymousApiService.sendCode({
      username: this.sfaLoginDataService.username,
      password: this.sfaLoginDataService.password,
    }).subscribe(response => {
      this.receiver = response.receiver;
      if (!this.verificationCodeTimeout) {
        setTimeout(() => {
          this.verificationCodeTimeout = true;
        }, 15000);
      }
      if (resend) {
        this.notificationService.showMessage('Code was sent again.');
      }
    }, error => {
      this.verificationCodeTimeout = true;
      this.notificationService.showMessage('Failed to send SMS message.');
    });
  }

  ngOnInit() {
    if (!this.sfaLoginDataService.username) {
      return this.router.navigateByUrl(this.config.getPanelUrl('login'));
    }
    if (this.sfaLoginDataService.initializedAuthenticators.sms_authenticator) {
      this.verificationCodeTimeout = true;
    } else {
      this.sendCode();
    }
    this.sfaLoginDataService.initAuthenticator('sms_authenticator');
  }

  submit() {
    if (this.confirmLoginForm.invalid) {
      return of(null);
    }
    const value = this.confirmLoginForm.value;
    this.auth.login(
      this.sfaLoginDataService.username,
      this.sfaLoginDataService.password,
      this.sfaLoginDataService.rememberMe, {
        sfa_method_name: 'sms_authenticator',
          rememberSFA: value.rememberSFA,
          args: {
            code: value.code
          }
      }
    ).subscribe(response => {
      if (response.rememberSFAToken) {
        CookiesHelper.setCookie('rSFA', response.rememberSFAToken, 365);
      }
      this.router.navigateByUrl(this.sfaLoginDataService.nextPath).then(() => {});
    }, error => {
      this.formErrors.setBackendErrors(error.error);
    });
  }
}
