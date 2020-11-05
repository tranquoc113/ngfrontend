import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { ConfigService } from '../../config/config.service';
import { IAuthResultModel } from '../models/auth-result.model';
import { LogoLinkOptions } from '../../ui/logo/logo.component';
import { SFALoginDataService } from '@fleio-api/second-factor-authentication/sfa-login-data.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm = this.formBuilder.group({
    username: ['', Validators.required],
    password: ['', Validators.required],
    rememberMe: [false]
  });
  usernameInputLabel = 'Username';
  logoLinkOptions = new LogoLinkOptions(false);
  navigationUrl: string;

  @ViewChild('formErrors') formErrors;

  constructor(
    private formBuilder: FormBuilder, private router: Router,
    public auth: AuthService, public config: ConfigService,
    private sfaLoginDataService: SFALoginDataService
  ) {
  }

  ngOnInit() {
    if (this.config && this.config.current && this.config.current.settings &&
      this.config.current.settings.usernameInputLabel) {
      this.usernameInputLabel = this.config.current.settings.usernameInputLabel;
    }
    const prevUrl = this.config.getPrevUrl();
    this.navigationUrl = prevUrl
    if (this.config.getPanelUrl('logout') === prevUrl) {
      this.navigationUrl = this.config.getPanelHomeUrl();
    }
  }

  login() {
    const username = this.loginForm.controls.username.value;
    const password = this.loginForm.controls.password.value;
    const rememberMe = this.loginForm.controls.rememberMe.value;
    this.auth.login(
      username,
      password,
      rememberMe,
    ).subscribe(
      (authResult: IAuthResultModel) => {
        if (authResult.success) {
          if (authResult.sfaRequired) {
            let i = 0;
            for (const SFAMethod of authResult.sfaMethods) {
              i += 1;
              if (SFAMethod.default || i === authResult.sfaMethods.length) {
                const methodPath = SFAMethod.name.replace('_', '-');
                this.sfaLoginDataService.setLoginData(
                  username,
                  password,
                  rememberMe,
                  this.navigationUrl,
                  authResult.sfaMethods
                );
                return this.router.navigateByUrl(
                  this.config.getPanelUrl(`sfa/${methodPath}/confirm`)
                ).then(() => {
                });
              }
            }
          }
          this.router.navigateByUrl(this.navigationUrl).then(() => {
          });
        } else {
          this.formErrors.showError(authResult.errorMessage);
        }
      }
    );
  }
}
