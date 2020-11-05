import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientGroupEditComponent } from './client-group-edit.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSelectModule } from '@angular/material/select';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('ClientGroupEditComponent', () => {
  let component: ClientGroupEditComponent;
  let fixture: ComponentFixture<ClientGroupEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      declarations: [ ClientGroupEditComponent ],
      imports: [ReactiveFormsModule, HttpClientTestingModule, RouterTestingModule, MatAutocompleteModule,
        MatCheckboxModule, MatSelectModule],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientGroupEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
