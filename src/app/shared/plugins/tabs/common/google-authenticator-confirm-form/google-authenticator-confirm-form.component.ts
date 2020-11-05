import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { LogoLinkOptions } from '@shared/ui/logo/logo.component';
import { FormErrorsComponent } from '@shared/error-handling/form-errors/form-errors.component';
import { AuthService } from '@shared/auth/auth.service';
import { ConfigService } from '@shared/config/config.service';
import { SFALoginDataService } from '@fleio-api/second-factor-authentication/sfa-login-data.service';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { CookiesHelper } from '@shared/ui-api/helpers/cookies-helper';

@Component({
  selector: 'app-google-authenticator-confirm-form',
  templateUrl: './google-authenticator-confirm-form.component.html',
  styleUrls: ['./google-authenticator-confirm-form.component.scss']
})
export class GoogleAuthenticatorConfirmFormComponent implements OnInit {
  confirmLoginForm = this.formBuilder.group({
    code: ['', Validators.required],
    rememberSFA: [false]
  });
  logoLinkOptions = new LogoLinkOptions(false);

  @ViewChild('formErrors') formErrors: FormErrorsComponent;

  constructor(
    private formBuilder: FormBuilder, public auth: AuthService, public config: ConfigService,
    private sfaLoginDataService: SFALoginDataService, private router: Router
  ) {
  }

  goToConfirmOptions() {
    // prevent user from opening page in new tab
    this.router.navigateByUrl(this.config.getPanelUrl('sfa/confirm-options'));
  }

  ngOnInit() {
    if (!this.sfaLoginDataService.username) {
      this.router.navigateByUrl(this.config.getPanelUrl('login'));
    }
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
        sfa_method_name: 'google_authenticator',
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
