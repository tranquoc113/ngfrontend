import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GoogleAuthenticatorConfirmComponent } from './google-authenticator-confirm.component';

describe('GoogleAuthenticatorConfirmComponent', () => {
  let component: GoogleAuthenticatorConfirmComponent;
  let fixture: ComponentFixture<GoogleAuthenticatorConfirmComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GoogleAuthenticatorConfirmComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GoogleAuthenticatorConfirmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
