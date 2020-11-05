import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InstanceDetailsAttachVolumeDialogComponent } from './instance-details-attach-volume-dialog.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('InstanceDetailsAttachVolumeDialogComponent', () => {
  let component: InstanceDetailsAttachVolumeDialogComponent;
  let fixture: ComponentFixture<InstanceDetailsAttachVolumeDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      declarations: [ InstanceDetailsAttachVolumeDialogComponent ],
      imports: [MatSnackBarModule, MatDialogModule, HttpClientTestingModule],
      providers: [ {provide: MatDialogRef, useValue: {}}, {provide: MAT_DIALOG_DATA, useValue: {}} ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InstanceDetailsAttachVolumeDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
