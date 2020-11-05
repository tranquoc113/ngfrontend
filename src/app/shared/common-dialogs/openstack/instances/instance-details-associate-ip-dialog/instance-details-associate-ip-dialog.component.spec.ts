import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InstanceDetailsAssociateIpDialogComponent } from './instance-details-associate-ip-dialog.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatSelectModule } from '@angular/material/select';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('InstanceDetailsAssociateIpDialogComponent', () => {
  let component: InstanceDetailsAssociateIpDialogComponent;
  let fixture: ComponentFixture<InstanceDetailsAssociateIpDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      declarations: [ InstanceDetailsAssociateIpDialogComponent ],
      imports: [ReactiveFormsModule, MatSnackBarModule, MatDialogModule, HttpClientTestingModule, MatSelectModule,
      BrowserAnimationsModule],
      providers: [ {provide: MatDialogRef, useValue: {}}, {provide: MAT_DIALOG_DATA, useValue: {}} ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InstanceDetailsAssociateIpDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
