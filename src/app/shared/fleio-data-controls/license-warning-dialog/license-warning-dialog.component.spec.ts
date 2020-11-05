import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LicenseWarningDialogComponent } from './license-warning-dialog.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';

describe('LicenseWarningDialogComponent', () => {
  let component: LicenseWarningDialogComponent;
  let fixture: ComponentFixture<LicenseWarningDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LicenseWarningDialogComponent ],
      imports: [HttpClientTestingModule, RouterTestingModule],
      providers: [ {provide: MatDialogRef, useValue: {}}, {provide: MAT_DIALOG_DATA, useValue: {}} ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LicenseWarningDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
