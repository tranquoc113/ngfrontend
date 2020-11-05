import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NetworkEditFormComponent } from './network-edit-form.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('NetworkEditFormComponent', () => {
  let component: NetworkEditFormComponent;
  let fixture: ComponentFixture<NetworkEditFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NetworkEditFormComponent ],
      imports: [
        RouterTestingModule, HttpClientTestingModule, ReactiveFormsModule, MatInputModule, MatFormFieldModule,
        MatSnackBarModule, MatDialogModule, MatCheckboxModule, NoopAnimationsModule,
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NetworkEditFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
