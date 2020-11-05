import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApiUserCreateFormComponent } from './api-user-edit-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('ApiUserCreateFormComponent', () => {
  let component: ApiUserCreateFormComponent;
  let fixture: ComponentFixture<ApiUserCreateFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      declarations: [ ApiUserCreateFormComponent ],
      imports: [ReactiveFormsModule, HttpClientTestingModule, RouterTestingModule, MatAutocompleteModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApiUserCreateFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
