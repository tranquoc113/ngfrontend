import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InstanceRescueFormComponent } from './instance-rescue-form.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('InstanceRescueFormComponent', () => {
  let component: InstanceRescueFormComponent;
  let fixture: ComponentFixture<InstanceRescueFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      declarations: [ InstanceRescueFormComponent ],
      imports: [RouterTestingModule, HttpClientTestingModule, MatSnackBarModule, MatDialogModule, ReactiveFormsModule,
        FormsModule, MatSelectModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InstanceRescueFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
