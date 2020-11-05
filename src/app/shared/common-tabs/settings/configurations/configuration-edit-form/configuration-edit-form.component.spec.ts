import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigurationEditFormComponent } from './configuration-edit-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('ConfigurationEditFormComponent', () => {
  let component: ConfigurationEditFormComponent;
  let fixture: ComponentFixture<ConfigurationEditFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      declarations: [ ConfigurationEditFormComponent ],
      imports: [ReactiveFormsModule, HttpClientTestingModule, RouterTestingModule, MatCheckboxModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfigurationEditFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
