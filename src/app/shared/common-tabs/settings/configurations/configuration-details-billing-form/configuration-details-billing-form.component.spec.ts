import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigurationDetailsBillingFormComponent } from './configuration-details-billing-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';

describe('ConfigurationDetailsBillingFormComponent', () => {
  let component: ConfigurationDetailsBillingFormComponent;
  let fixture: ComponentFixture<ConfigurationDetailsBillingFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfigurationDetailsBillingFormComponent ],
      imports: [ReactiveFormsModule, HttpClientTestingModule, MatSnackBarModule, MatDialogModule, MatCheckboxModule,
        MatCheckboxModule, MatSelectModule, MatRadioModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfigurationDetailsBillingFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
