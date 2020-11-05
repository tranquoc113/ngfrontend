import { Component, OnInit, Optional, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { LogoLinkOptions } from '../../../../ui/logo/logo.component';
import { FormErrorsComponent } from '../../../../error-handling/form-errors/form-errors.component';
import { AuthService } from '../../../../auth/auth.service';
import { ConfigService } from '../../../../config/config.service';
import { of } from 'rxjs';
import { SFALoginDataService } from '../../../../fleio-api/second-factor-authentication/sfa-login-data.service';
import { Router } from '@angular/router';
import { CookiesHelper } from '../../../../ui-api/helpers/cookies-helper';
import { PanelLayoutComponent } from '@shared/layout/panel-layout/panel-layout.component';

@Component({
  selector: 'app-google-authenticator-confirm',
  templateUrl: './google-authenticator-confirm.component.html',
  styleUrls: ['./google-authenticator-confirm.component.scss']
})
export class GoogleAuthenticatorConfirmComponent implements OnInit {

  constructor(@Optional() public panelLayout?: PanelLayoutComponent) { }

  ngOnInit(): void {
  }

}
