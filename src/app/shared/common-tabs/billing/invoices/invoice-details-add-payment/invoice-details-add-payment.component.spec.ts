import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InvoiceDetailsAddPaymentComponent } from './invoice-details-add-payment.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('InvoiceDetailsAddPaymentComponent', () => {
  let component: InvoiceDetailsAddPaymentComponent;
  let fixture: ComponentFixture<InvoiceDetailsAddPaymentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
      declarations: [ InvoiceDetailsAddPaymentComponent ],
      imports: [ReactiveFormsModule, RouterTestingModule, HttpClientTestingModule, MatSnackBarModule, MatDialogModule,
      MatSelectModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InvoiceDetailsAddPaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
