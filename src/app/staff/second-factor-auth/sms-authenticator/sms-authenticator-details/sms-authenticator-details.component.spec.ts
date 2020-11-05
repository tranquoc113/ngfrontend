import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SmsAuthenticatorDetailsComponent } from './sms-authenticator-details.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('SmsAuthenticatorDetailsComponent', () => {
  let component: SmsAuthenticatorDetailsComponent;
  let fixture: ComponentFixture<SmsAuthenticatorDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      declarations: [ SmsAuthenticatorDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SmsAuthenticatorDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
