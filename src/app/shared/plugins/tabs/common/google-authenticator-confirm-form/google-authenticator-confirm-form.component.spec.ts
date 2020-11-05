import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GoogleAuthenticatorConfirmFormComponent } from './google-authenticator-confirm-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { LoginComponent } from '@shared/auth/login/login.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('GoogleAuthenticatorConfirmFormComponent', () => {
  let component: GoogleAuthenticatorConfirmFormComponent;
  let fixture: ComponentFixture<GoogleAuthenticatorConfirmFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
      declarations: [ GoogleAuthenticatorConfirmFormComponent ],
      imports: [ReactiveFormsModule, HttpClientTestingModule, RouterTestingModule.withRoutes([
        { path: 'login', component: LoginComponent}
      ]), MatCheckboxModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GoogleAuthenticatorConfirmFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
