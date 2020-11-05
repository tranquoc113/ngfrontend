import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NetworkAutoCreateFormComponent } from './network-auto-create-form.component';
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
import { MatAutocompleteModule } from '@angular/material/autocomplete';

describe('NetworkAutoCreateFormComponent', () => {
  let component: NetworkAutoCreateFormComponent;
  let fixture: ComponentFixture<NetworkAutoCreateFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NetworkAutoCreateFormComponent ],
      imports: [
        RouterTestingModule, HttpClientTestingModule, ReactiveFormsModule, MatInputModule, MatFormFieldModule,
        MatSnackBarModule, MatDialogModule, MatCheckboxModule, NoopAnimationsModule, MatSelectModule,
        MatAutocompleteModule,
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NetworkAutoCreateFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
