import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SmsAuthenticatorConfirmComponent } from './sms-authenticator-confirm.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('SmsAuthenticatorConfirmComponent', () => {
  let component: SmsAuthenticatorConfirmComponent;
  let fixture: ComponentFixture<SmsAuthenticatorConfirmComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
      declarations: [ SmsAuthenticatorConfirmComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SmsAuthenticatorConfirmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
