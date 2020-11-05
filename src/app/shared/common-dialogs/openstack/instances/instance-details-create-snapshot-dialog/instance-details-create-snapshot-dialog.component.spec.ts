import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InstanceDetailsCreateSnapshotDialogComponent } from './instance-details-create-snapshot-dialog.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('InstanceDetailsCreateSnapshotDialogComponent', () => {
  let component: InstanceDetailsCreateSnapshotDialogComponent;
  let fixture: ComponentFixture<InstanceDetailsCreateSnapshotDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      declarations: [ InstanceDetailsCreateSnapshotDialogComponent ],
      imports: [MatDialogModule, HttpClientTestingModule, MatSnackBarModule],
      providers: [ {provide: MatDialogRef, useValue: {}}, {provide: MAT_DIALOG_DATA, useValue: {}} ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InstanceDetailsCreateSnapshotDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
