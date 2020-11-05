import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditVolumeSnapshotDialogComponent } from './edit-volume-snapshot-dialog.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatIconModule } from '@angular/material/icon';

describe('EditVolumeSnapshotDialogComponent', () => {
  let component: EditVolumeSnapshotDialogComponent;
  let fixture: ComponentFixture<EditVolumeSnapshotDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditVolumeSnapshotDialogComponent ],
      imports: [
        HttpClientTestingModule, MatSnackBarModule, MatDialogModule, MatCheckboxModule, ReactiveFormsModule,
        MatAutocompleteModule, MatIconModule,
      ],
      providers: [ {provide: MatDialogRef, useValue: {}}, {provide: MAT_DIALOG_DATA, useValue: {}} ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditVolumeSnapshotDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
