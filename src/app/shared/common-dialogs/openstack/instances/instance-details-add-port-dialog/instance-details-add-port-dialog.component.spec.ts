import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InstanceDetailsAddPortDialogComponent } from './instance-details-add-port-dialog.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatSelectModule } from '@angular/material/select';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('InstanceDetailsAddPortDialogComponent', () => {
  let component: InstanceDetailsAddPortDialogComponent;
  let fixture: ComponentFixture<InstanceDetailsAddPortDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      declarations: [ InstanceDetailsAddPortDialogComponent ],
      imports: [ReactiveFormsModule, MatSnackBarModule, MatDialogModule, HttpClientTestingModule, MatSelectModule,
        BrowserAnimationsModule],
      providers: [ {provide: MatDialogRef, useValue: {}}, {provide: MAT_DIALOG_DATA, useValue: {}} ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InstanceDetailsAddPortDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
