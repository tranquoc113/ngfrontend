import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InstanceDetailsAddIpDialogComponent } from './instance-details-add-ip-dialog.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('InstanceDetailsAddIpDialogComponent', () => {
  let component: InstanceDetailsAddIpDialogComponent;
  let fixture: ComponentFixture<InstanceDetailsAddIpDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      declarations: [ InstanceDetailsAddIpDialogComponent ],
      imports: [ReactiveFormsModule, MatSnackBarModule, MatDialogModule, HttpClientTestingModule, MatSelectModule,
        MatFormFieldModule, MatInputModule, BrowserAnimationsModule],
      providers: [ {provide: MatDialogRef, useValue: {}}, {provide: MAT_DIALOG_DATA, useValue: {}} ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InstanceDetailsAddIpDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
