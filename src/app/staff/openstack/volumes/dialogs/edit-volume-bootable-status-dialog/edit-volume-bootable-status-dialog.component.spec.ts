import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditVolumeBootableStatusDialogComponent } from './edit-volume-bootable-status-dialog.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';

describe('EditVolumeBootableStatusDialogComponent', () => {
  let component: EditVolumeBootableStatusDialogComponent;
  let fixture: ComponentFixture<EditVolumeBootableStatusDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditVolumeBootableStatusDialogComponent ],
      imports:  [
        HttpClientTestingModule, MatSnackBarModule, MatDialogModule, MatCheckboxModule, ReactiveFormsModule,
        MatAutocompleteModule,
      ],
      providers: [ {provide: MatDialogRef, useValue: {}}, {provide: MAT_DIALOG_DATA, useValue: {}} ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditVolumeBootableStatusDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
