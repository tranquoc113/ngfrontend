import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SfaConfirmPasswordFormComponent } from './sfa-confirm-password-form.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ReactiveFormsModule } from '@angular/forms';

describe('SfaConfirmPasswordFormComponent', () => {
  let component: SfaConfirmPasswordFormComponent;
  let fixture: ComponentFixture<SfaConfirmPasswordFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SfaConfirmPasswordFormComponent ],
      imports: [HttpClientTestingModule, RouterTestingModule, ReactiveFormsModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SfaConfirmPasswordFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
