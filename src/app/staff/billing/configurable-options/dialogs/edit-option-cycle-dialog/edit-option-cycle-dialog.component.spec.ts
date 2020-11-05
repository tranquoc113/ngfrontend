import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditOptionCycleDialogComponent } from './edit-option-cycle-dialog.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSelectModule } from '@angular/material/select';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('EditOptionCycleDialogComponent', () => {
  let component: EditOptionCycleDialogComponent;
  let fixture: ComponentFixture<EditOptionCycleDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      declarations: [ EditOptionCycleDialogComponent ],
      imports: [
        MatSnackBarModule, MatDialogModule, ReactiveFormsModule, HttpClientTestingModule, MatCheckboxModule,
        MatSelectModule,
      ],
      providers: [{provide: MatDialogRef, useValue: {}}, {provide: MAT_DIALOG_DATA, useValue: {}}],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditOptionCycleDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
