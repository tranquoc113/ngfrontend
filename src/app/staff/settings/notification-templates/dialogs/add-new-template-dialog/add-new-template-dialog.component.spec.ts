import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNewTemplateDialogComponent } from './add-new-template-dialog.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('AddNewTemplateDialogComponent', () => {
  let component: AddNewTemplateDialogComponent;
  let fixture: ComponentFixture<AddNewTemplateDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
      declarations: [ AddNewTemplateDialogComponent ],
      imports: [
        HttpClientTestingModule, MatSnackBarModule, MatDialogModule, ReactiveFormsModule, MatAutocompleteModule,
      ],
      providers: [ {provide: MatDialogRef, useValue: {}}, {provide: MAT_DIALOG_DATA, useValue: {}} ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddNewTemplateDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
