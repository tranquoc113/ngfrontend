import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { EditOptionChoiceDialogComponent } from './edit-option-choice-dialog.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('EditOptionChoiceDialogComponent', () => {
  let component: EditOptionChoiceDialogComponent;
  let fixture: ComponentFixture<EditOptionChoiceDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      declarations: [EditOptionChoiceDialogComponent],
      imports: [
        MatSnackBarModule, MatDialogModule, ReactiveFormsModule, HttpClientTestingModule, MatCheckboxModule,
      ],
      providers: [{provide: MatDialogRef, useValue: {}}, {provide: MAT_DIALOG_DATA, useValue: {}}],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditOptionChoiceDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
