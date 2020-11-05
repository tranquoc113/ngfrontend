import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GoogleAuthenticatorDetailsComponent } from './google-authenticator-details.component';

describe('GoogleAuthenticatorDetailsComponent', () => {
  let component: GoogleAuthenticatorDetailsComponent;
  let fixture: ComponentFixture<GoogleAuthenticatorDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
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
