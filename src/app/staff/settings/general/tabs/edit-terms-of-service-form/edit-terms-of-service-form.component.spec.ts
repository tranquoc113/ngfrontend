import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditTermsOfServiceFormComponent } from './edit-terms-of-service-form.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';
import { MatCheckboxModule } from '@angular/material/checkbox';

describe('EditTermsOfServiceFormComponent', () => {
  let component: EditTermsOfServiceFormComponent;
  let fixture: ComponentFixture<EditTermsOfServiceFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditTermsOfServiceFormComponent ],
      imports: [
        HttpClientTestingModule, RouterTestingModule, ReactiveFormsModule, MatSnackBarModule, MatDialogModule,
        MatCheckboxModule,
      ],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditTermsOfServiceFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
