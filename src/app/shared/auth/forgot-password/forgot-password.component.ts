import { Component, OnInit, ViewChild } from '@angular/core';
import { LogoLinkOptions } from '../../ui/logo/logo.component';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { ConfigService } from '../../config/config.service';
import { FormErrorsComponent } from '../../error-handling/form-errors/form-errors.component';
import { of } from 'rxjs';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {
  forgotPassForm = this.formBuilder.group({
    username_or_email: ['', Validators.required],
  });
  usernameInputLabel = 'Username';
  logoLinkOptions = new LogoLinkOptions(false);
  resetRequested = false;

  @ViewChild('formErrors') formErrors: FormErrorsComponent;

  constructor(
    private formBuilder: FormBuilder, private router: Router,
    public auth: AuthService, public config: ConfigService,
  ) {
  }

  ngOnInit() {
  }

  submit() {
    if (this.forgotPassForm.invalid) {
      return of(null);
    }
    const value = this.forgotPassForm.value;
    this.auth.resetPassword(
      value.username_or_email
    ).subscribe(response => {
      this.resetRequested = true;
    }, error => {
      this.formErrors.setBackendErrors(error.error);
    });
  }
}
