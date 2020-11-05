import { Component, OnInit } from '@angular/core';
import { IInvoiceModel } from '../../../../fleio-api/billing/model/invoice.model';
import { DetailsFormBase } from '../../../../ui/objects-view/details-form-base';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { IInvoicePaymentOptionsModel } from '../../../../fleio-api/billing/model/invoice-payment-options.model';
import { EMPTY } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { InvoicesApiService } from '../../../../fleio-api/billing/invoices/invoices-api.service';
import { NotificationService } from '../../../../ui-api/notification.service';
import { RefreshService } from '../../../../ui-api/refresh.service';

@Component({
  selector: 'app-invoice-details-add-payment',
  templateUrl: './invoice-details-add-payment.component.html',
  styleUrls: ['./invoice-details-add-payment.component.scss']
})
export class InvoiceDetailsAddPaymentComponent extends DetailsFormBase<IInvoiceModel> implements OnInit {
  addPaymentForm = this.formBuilder.group({
    external_id: [''],
    extra_info: [''],
    date_initiated: [Validators.required],
    gateway: ['', Validators.required],
    currency: [{value: '', disabled: true}, Validators.required],
    amount: [0, Validators.required],
    fee: [0, Validators.required],
  });

  public paymentOptions: IInvoicePaymentOptionsModel;

  constructor(
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private invoicesApi: InvoicesApiService,
    private notification: NotificationService,
    private refreshService: RefreshService,
  ) {
    super();
  }

  ngOnInit() {
    super.ngOnInit();
    this.paymentOptions = this.activatedRoute.snapshot.data.paymentOptions;
    if (this.object && this.paymentOptions && this.paymentOptions.gateways.length) {
      this.addPaymentForm.patchValue({
        date_initiated: new Date(),
        amount: this.object.balance,
        currency: this.object.currency,
        gateway: this.paymentOptions.gateways[0].id,
      });
    }
  }

  public addPayment() {
    this.validate();
    if (this.addPaymentForm.invalid) {
      Object.keys(this.formGroup.controls).map(name => {
        const control = this.formGroup.controls[name];
        if (control.invalid) {
          control.markAsTouched();
        }
      });
    } else {
      const value = this.addPaymentForm.value;
      value.invoice = this.object.id;
      const request = this.invoicesApi.objectPostAction(
        this.object.id, 'add_payment_to_invoice', value
      );

      request.pipe(catchError((error) => {
        if (error.error) {
          this.setErrors(error.error);
          return EMPTY;
        } else {
          throw error;
        }
      })).subscribe(() => {
        this.notification.showMessage('Payment added');
        this.refreshService.refresh();
      });
    }
  }
}
