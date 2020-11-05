import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InstanceResizeFormComponent } from './instance-resize-form.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('InstanceResizeFormComponent', () => {
  let component: InstanceResizeFormComponent;
  let fixture: ComponentFixture<InstanceResizeFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      declarations: [ InstanceResizeFormComponent ],
      imports: [RouterTestingModule, HttpClientTestingModule, MatSnackBarModule, MatDialogModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InstanceResizeFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
