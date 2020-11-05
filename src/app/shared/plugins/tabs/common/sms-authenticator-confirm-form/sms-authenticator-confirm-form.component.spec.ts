import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SmsAuthenticatorConfirmFormComponent } from './sms-authenticator-confirm-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { LoginComponent } from '@shared/auth/login/login.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('SmsAuthenticatorConfirmFormComponent', () => {
  let component: SmsAuthenticatorConfirmFormComponent;
  let fixture: ComponentFixture<SmsAuthenticatorConfirmFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
      declarations: [ SmsAuthenticatorConfirmFormComponent ],
      imports: [ReactiveFormsModule, HttpClientTestingModule, RouterTestingModule.withRoutes([
        { path: 'login', component: LoginComponent}
      ]), MatSnackBarModule, MatDialogModule,
        MatCheckboxModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SmsAuthenticatorConfirmFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
