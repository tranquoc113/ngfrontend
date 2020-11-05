import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DomainRegisterFormComponent } from './domain-register-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { RouterTestingModule } from '@angular/router/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('DomainRegisterFormComponent', () => {
  let component: DomainRegisterFormComponent;
  let fixture: ComponentFixture<DomainRegisterFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      declarations: [ DomainRegisterFormComponent ],
      imports: [
        ReactiveFormsModule, HttpClientTestingModule, MatSnackBarModule, MatDialogModule, MatAutocompleteModule,
        RouterTestingModule,
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DomainRegisterFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
