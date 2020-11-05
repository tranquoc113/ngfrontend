import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InstanceMoveDialogComponent } from './instance-move-dialog.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import {  ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';

describe('InstanceMoveDialogComponent', () => {
  let component: InstanceMoveDialogComponent;
  let fixture: ComponentFixture<InstanceMoveDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InstanceMoveDialogComponent ],
      imports: [HttpClientTestingModule, ReactiveFormsModule, MatAutocompleteModule],
      providers: [ {provide: MatDialogRef, useValue: {}}, {provide: MAT_DIALOG_DATA, useValue: {}} ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InstanceMoveDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
