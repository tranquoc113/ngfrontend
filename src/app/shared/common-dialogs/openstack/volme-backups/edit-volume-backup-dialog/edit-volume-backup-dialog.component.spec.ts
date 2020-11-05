import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditVolumeBackupDialogComponent } from './edit-volume-backup-dialog.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('EditBackupDialogComponent', () => {
  let component: EditVolumeBackupDialogComponent;
  let fixture: ComponentFixture<EditVolumeBackupDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
      declarations: [ EditVolumeBackupDialogComponent ],
      imports:  [
        HttpClientTestingModule, MatSnackBarModule, MatDialogModule, MatCheckboxModule, ReactiveFormsModule,
        MatAutocompleteModule,
      ],
      providers: [ {provide: MatDialogRef, useValue: {}}, {provide: MAT_DIALOG_DATA, useValue: {}} ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditVolumeBackupDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
