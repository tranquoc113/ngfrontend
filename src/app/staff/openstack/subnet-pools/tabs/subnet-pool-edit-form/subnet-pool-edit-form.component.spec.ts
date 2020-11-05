import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubnetPoolEditFormComponent } from './subnet-pool-edit-form.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule } from '@angular/material/dialog';

describe('SubnetPoolEditFormComponent', () => {
  let component: SubnetPoolEditFormComponent;
  let fixture: ComponentFixture<SubnetPoolEditFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubnetPoolEditFormComponent ],
      imports: [
        HttpClientTestingModule, RouterTestingModule, ReactiveFormsModule, MatSnackBarModule, MatInputModule,
        MatFormFieldModule, MatAutocompleteModule, MatSelectModule, MatCheckboxModule, MatDialogModule,
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubnetPoolEditFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
