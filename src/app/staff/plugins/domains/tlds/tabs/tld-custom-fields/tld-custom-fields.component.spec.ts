import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TldCustomFieldsComponent } from './tld-custom-fields.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { RouterTestingModule } from '@angular/router/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('TldCustomFieldsComponent', () => {
  let component: TldCustomFieldsComponent;
  let fixture: ComponentFixture<TldCustomFieldsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      declarations: [ TldCustomFieldsComponent ],
      imports: [
        ReactiveFormsModule, HttpClientTestingModule, MatSnackBarModule, MatDialogModule, MatAutocompleteModule,
        RouterTestingModule,
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TldCustomFieldsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
