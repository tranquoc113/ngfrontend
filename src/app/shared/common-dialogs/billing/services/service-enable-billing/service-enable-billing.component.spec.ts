import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceEnableBillingComponent } from './service-enable-billing.component';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatSnackBarModule } from '@angular/material/snack-bar';

describe('ServiceEnableBillingComponent', () => {
  let component: ServiceEnableBillingComponent;
  let fixture: ComponentFixture<ServiceEnableBillingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ServiceEnableBillingComponent ],
      imports: [HttpClientTestingModule, MatSnackBarModule, MatDialogModule],
      providers: [ {provide: MatDialogRef, useValue: {}}, {provide: MAT_DIALOG_DATA, useValue: {}} ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ServiceEnableBillingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
