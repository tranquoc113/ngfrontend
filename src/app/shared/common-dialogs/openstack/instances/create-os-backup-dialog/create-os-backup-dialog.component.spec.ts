import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateOsBackupDialogComponent } from './create-os-backup-dialog.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('CreateOsBackupDialogComponent', () => {
  let component: CreateOsBackupDialogComponent;
  let fixture: ComponentFixture<CreateOsBackupDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateOsBackupDialogComponent ],
      imports: [ReactiveFormsModule, MatSnackBarModule, MatDialogModule, HttpClientTestingModule],
      providers: [ {provide: MatDialogRef, useValue: {}}, {provide: MAT_DIALOG_DATA, useValue: {}} ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateOsBackupDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
