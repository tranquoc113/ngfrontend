import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SmsAuthenticatorDetailsComponent } from './sms-authenticator-details.component';

describe('SmsAuthenticatorDetailsComponent', () => {
  let component: SmsAuthenticatorDetailsComponent;
  let fixture: ComponentFixture<SmsAuthenticatorDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
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
