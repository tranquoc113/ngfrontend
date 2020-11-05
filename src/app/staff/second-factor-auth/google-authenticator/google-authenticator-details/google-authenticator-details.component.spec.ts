import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GoogleAuthenticatorDetailsComponent } from './google-authenticator-details.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('GoogleAuthenticatorDetailsComponent', () => {
  let component: GoogleAuthenticatorDetailsComponent;
  let fixture: ComponentFixture<GoogleAuthenticatorDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      declarations: [ GoogleAuthenticatorDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GoogleAuthenticatorDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
