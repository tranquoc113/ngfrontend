import { Component, OnInit, Optional, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { LogoLinkOptions } from '@shared/ui/logo/logo.component';
import { FormErrorsComponent } from '@shared/error-handling/form-errors/form-errors.component';
import { AuthService } from '@shared/auth/auth.service';
import { ConfigService } from '@shared/config/config.service';
import { SFALoginDataService } from '@fleio-api/second-factor-authentication/sfa-login-data.service';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { CookiesHelper } from '@shared/ui-api/helpers/cookies-helper';
import { SmsAuthenticatorAnonymousApiService } from '@fleio-api/plugins/sms-authenticator/sms-authenticator-anonymous-api.service';
import { NotificationService } from '@shared/ui-api/notification.service';
import { PanelLayoutComponent } from '@shared/layout/panel-layout/panel-layout.component';

@Component({
  selector: 'app-sms-authenticator-confirm',
  templateUrl: './sms-authenticator-confirm.component.html',
  styleUrls: ['./sms-authenticator-confirm.component.scss']
})
export class SmsAuthenticatorConfirmComponent implements OnInit {

  constructor(@Optional() public panelLayout?: PanelLayoutComponent) { }

  ngOnInit(): void {
  }

}
