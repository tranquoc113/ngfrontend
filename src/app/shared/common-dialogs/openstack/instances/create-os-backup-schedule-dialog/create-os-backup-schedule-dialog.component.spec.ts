import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateOsBackupScheduleDialogComponent } from './create-os-backup-schedule-dialog.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatSelectModule } from '@angular/material/select';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

xdescribe('CreateOsBackupScheduleDialogComponent', () => {
  let component: CreateOsBackupScheduleDialogComponent;
  let fixture: ComponentFixture<CreateOsBackupScheduleDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      declarations: [ CreateOsBackupScheduleDialogComponent ],
      imports: [ReactiveFormsModule, MatSnackBarModule, MatDialogModule, HttpClientTestingModule,
      MatSelectModule],
      providers: [ {provide: MatDialogRef, useValue: {}}, {provide: MAT_DIALOG_DATA, useValue: {}} ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateOsBackupScheduleDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
