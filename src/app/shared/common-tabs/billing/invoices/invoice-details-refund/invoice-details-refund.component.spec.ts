import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InvoiceDetailsRefundComponent } from './invoice-details-refund.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('StaffInvoiceDetailsRefundComponent', () => {
  let component: InvoiceDetailsRefundComponent;
  let fixture: ComponentFixture<InvoiceDetailsRefundComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
      declarations: [ InvoiceDetailsRefundComponent ],
      imports: [ReactiveFormsModule, RouterTestingModule, HttpClientTestingModule, MatSnackBarModule, MatDialogModule,
      MatSelectModule, BrowserAnimationsModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InvoiceDetailsRefundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
