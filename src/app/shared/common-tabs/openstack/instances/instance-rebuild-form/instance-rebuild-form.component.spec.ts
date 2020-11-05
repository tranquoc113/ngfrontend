import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InstanceRebuildFormComponent } from './instance-rebuild-form.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('InstanceRebuildFormComponent', () => {
  let component: InstanceRebuildFormComponent;
  let fixture: ComponentFixture<InstanceRebuildFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      declarations: [ InstanceRebuildFormComponent ],
      imports: [RouterTestingModule, HttpClientTestingModule, ReactiveFormsModule, MatSnackBarModule, MatDialogModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InstanceRebuildFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
