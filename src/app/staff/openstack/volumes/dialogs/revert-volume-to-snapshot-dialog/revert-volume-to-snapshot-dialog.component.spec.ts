import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RevertVolumeToSnapshotDialogComponent } from './revert-volume-to-snapshot-dialog.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';

describe('RevertVolumeToSnapshotDialogComponent', () => {
  let component: RevertVolumeToSnapshotDialogComponent;
  let fixture: ComponentFixture<RevertVolumeToSnapshotDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RevertVolumeToSnapshotDialogComponent ],
      imports:  [
        HttpClientTestingModule, MatSnackBarModule, MatDialogModule, MatCheckboxModule, ReactiveFormsModule,
        MatAutocompleteModule,
      ],
      providers: [ {provide: MatDialogRef, useValue: {}}, {provide: MAT_DIALOG_DATA, useValue: {}} ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RevertVolumeToSnapshotDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
