import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NetworkConfigAutoCreateFormComponent } from './network-config-auto-create-form.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatSelectModule } from '@angular/material/select';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('NetworkConfigAutoCreateFormComponent', () => {
  let component: NetworkConfigAutoCreateFormComponent;
  let fixture: ComponentFixture<NetworkConfigAutoCreateFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
      declarations: [ NetworkConfigAutoCreateFormComponent ],
      imports: [
        RouterTestingModule, HttpClientTestingModule, ReactiveFormsModule, MatInputModule, MatFormFieldModule,
        MatSnackBarModule, MatDialogModule, MatCheckboxModule, NoopAnimationsModule, MatSelectModule,
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NetworkConfigAutoCreateFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
