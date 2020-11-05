import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InstanceMigrateDialogComponent } from './instance-migrate-dialog.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ReactiveFormsModule } from '@angular/forms';

describe('InstanceMigrateDialogComponent', () => {
  let component: InstanceMigrateDialogComponent;
  let fixture: ComponentFixture<InstanceMigrateDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InstanceMigrateDialogComponent ],
      imports: [ HttpClientTestingModule, ReactiveFormsModule ],
      providers: [ {provide: MatDialogRef, useValue: {}}, {provide: MAT_DIALOG_DATA, useValue: {}} ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InstanceMigrateDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
