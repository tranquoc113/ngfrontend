import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmOptionsComponent } from './confirm-options.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { LoginComponent } from '@shared/auth/login/login.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('ConfirmOptionsComponent', () => {
  let component: ConfirmOptionsComponent;
  let fixture: ComponentFixture<ConfirmOptionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
      declarations: [ ConfirmOptionsComponent ],
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([
        { path: 'login', component: LoginComponent}
      ])]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmOptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
