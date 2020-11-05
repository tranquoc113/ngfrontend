import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { LogoLinkOptions } from '../../ui/logo/logo.component';
import { FormErrorsComponent } from '../../error-handling/form-errors/form-errors.component';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { ConfigService } from '../../config/config.service';
import { of } from 'rxjs';

@Component({
  selector: 'app-new-password',
  templateUrl: './new-password.component.html',
  styleUrls: ['./new-password.component.scss']
})
export class NewPasswordComponent implements OnInit {
  newPassForm = this.formBuilder.group({
    new_password: ['', Validators.required],
    confirm_password: ['', Validators.required],
    user_id: ['', Validators.required],
    token: ['', Validators.required],
  });
  usernameInputLabel = 'Username';
  logoLinkOptions = new LogoLinkOptions(false);
  resetRequested = false;
  stateParams: {
    userid?: any;
    token?: any;
  }

  @ViewChild('formErrors') formErrors: FormErrorsComponent;

  constructor(
    private formBuilder: FormBuilder, private activatedRoute: ActivatedRoute,
    public auth: AuthService, public config: ConfigService,
  ) {
  }

  ngOnInit() {
    this.stateParams = this.activatedRoute.snapshot.params;
    this.newPassForm.controls.user_id.setValue(this.stateParams.userid);
    this.newPassForm.controls.token.setValue(this.stateParams.token);
  }

  submit() {
    if (this.newPassForm.invalid) {
      return of(null);
    }
    const value = this.newPassForm.value;
    this.auth.setNewPassword(
      value
    ).subscribe(response => {
      this.resetRequested = true;
    }, error => {
      this.formErrors.setBackendErrors(error.error);
    });
  }
}
