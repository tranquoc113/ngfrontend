import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeCreditDialogComponent } from './change-credit-dialog.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatRadioModule } from '@angular/material/radio';

describe('ChangeCreditDialogComponent', () => {
  let component: ChangeCreditDialogComponent;
  let fixture: ComponentFixture<ChangeCreditDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChangeCreditDialogComponent ],
      imports: [ReactiveFormsModule, HttpClientTestingModule, MatRadioModule],
      providers: [ {provide: MatDialogRef, useValue: {}}, {provide: MAT_DIALOG_DATA, useValue: {}} ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangeCreditDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
