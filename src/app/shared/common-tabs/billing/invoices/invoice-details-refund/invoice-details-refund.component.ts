import { Component, OnInit } from '@angular/core';
import { DetailsFormBase } from '../../../../ui/objects-view/details-form-base';
import { IInvoiceModel } from '../../../../fleio-api/billing/model/invoice.model';
import { FormBuilder, Validators } from '@angular/forms';
import { IInvoicePaymentOptionsModel } from '../../../../fleio-api/billing/model/invoice-payment-options.model';
import { ActivatedRoute, Router } from '@angular/router';
import { InvoicesApiService } from '../../../../fleio-api/billing/invoices/invoices-api.service';
import { NotificationService } from '../../../../ui-api/notification.service';
import { RefreshService } from '../../../../ui-api/refresh.service';
import { Observable } from 'rxjs';
import { ITransactionActionModel } from '../../../../fleio-api/billing/model/transaction-action.model';
import { ITransactionModel } from '../../../../fleio-api/billing/model/transaction.model';
import { IJournalEntryModel } from '../../../../fleio-api/billing/model/journal-entry.model';
import { ConfigService } from '../../../../config/config.service';
import { GatewayApiService } from '../../../../fleio-api/billing/gateways/gateway-api.service';

@Component({
  selector: 'app-invoice-details-refund',
  templateUrl: './invoice-details-refund.component.html',
  styleUrls: ['./invoice-details-refund.component.scss']
})
export class InvoiceDetailsRefundComponent extends DetailsFormBase<IInvoiceModel> implements OnInit {
  refundForm = this.formBuilder.group({
    transactionIndex: ['', Validators.required],
    refundMethod: ['', Validators.required],
    externalTransactionId: [''],
  });
  public paymentOptions: IInvoicePaymentOptionsModel;
  transactions = [];
  refundMethods = {
    refundThroughGateway: '1',
    refundManually: '2',
    refundToCredit: '3'
  };
  transaction: ITransactionModel;
  refundDetails: {
    transactionInfo: string;
    transactionAmount: string;
    journalEntries: IJournalEntryModel[];
    canRefundToCredit: boolean;
    action: any;
  };

  constructor(
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private invoicesApi: InvoicesApiService,
    private notificationService: NotificationService,
    private refreshService: RefreshService,
    private config: ConfigService,
    private gatewayApiService: GatewayApiService,
    private invoicesApiService: InvoicesApiService,
  ) {
    super();
  }

  updateRefundDetails() {
    const transactionIndex = this.refundForm.controls.transactionIndex.value;
    const transaction = this.transactions[transactionIndex];
    const refundDetails = {
      transactionInfo: transaction.external_id + ' - ' + transaction.gateway.display_name,
      transactionAmount: transaction.amount + ' ' + transaction.currency,
      journalEntries: [],
      canRefundToCredit: false,
      action: null,
    };
    const selectedRefundMethod = this.refundForm.controls.refundMethod.value;
    for (const journalEntry of this.object.journal) {
      if (journalEntry.transaction) {
        if (journalEntry.transaction.id === transaction.id) {
          if (selectedRefundMethod !== this.refundMethods.refundToCredit) {
            refundDetails.journalEntries.push(journalEntry);
            if (journalEntry.destination !== 'cr') {
              refundDetails.canRefundToCredit = true;
            }
          }
          else {
            refundDetails.canRefundToCredit = true;
            if (journalEntry.destination !== 'cr') {
              refundDetails.journalEntries.push(journalEntry);
            }
          }
        }
      }
      else {
        if (this.object.is_add_credit && journalEntry.destination === 'cr' && journalEntry.source === 'iv') {
          refundDetails.journalEntries.push(journalEntry);
        }
      }
    }

    if (this.object.is_add_credit) {
      refundDetails.canRefundToCredit = false;
    }

    for (const action of transaction.actions) {
      if (action.name === 'refund') {
        // @ts-ignore
        refundDetails.action = action;
      }
    }

    this.refundDetails = refundDetails;
    this.transaction = transaction;
  };

  getTransactionAction(transaction, actionName): ITransactionActionModel {
    // Returns the action if present in a transaction
    let action = null;
    let actionsMatched;

    if (transaction && transaction.actions && transaction.actions.length) {
      actionsMatched = transaction.actions.filter((filAction) => {
        return filAction.name === actionName;
      });
      if (actionsMatched && actionsMatched.length > 0) {
        action = actionsMatched[0]; // NOTE(tomo): Retrieve first action matched. There should not be more than one.
        if (actionsMatched.length > 1) {
          console.warn('More than one transaction action matched "' + actionName + '"')
        }
      }
    }
    return action
  }

  getRefundableTransactions(invoice: IInvoiceModel) {
    let transactions = [];
    if (invoice && invoice.transactions && invoice.transactions.length) {
      transactions = invoice.transactions.filter((transaction: ITransactionModel) => {
        const actionFound = this.getTransactionAction(transaction, 'refund');
        return !!actionFound && transaction.is_refundable;
      })
    }
    return transactions;
  }

  ngOnInit() {
    this.paymentOptions = this.activatedRoute.snapshot.data.paymentOptions;
    this.transactions = this.getRefundableTransactions(this.object);
    if (this.object) {
    }
  }

  callGatewayRefund() {
    if (this.refundDetails.action.redirect) {
      const query = 'invoice=' + this.object.id + '&transaction=' + this.transaction.id;
      let redirectUrl = this.config.getPanelApiUrl('billing/gateway/');
      redirectUrl += this.refundDetails.action.gateway + '/' + this.refundDetails.action.name + '?' + query;
      window.location.href = redirectUrl;
    } else {
      this.gatewayApiService.callAction(
        this.refundDetails.action,
        this.object.id,
        this.transaction.id,
      ).subscribe(response => {
        this.notificationService.showMessage('Transaction refund initiated.');
      }, error => {
        this.setErrors(error.error);
      });
    }
  }

  public refund() {
    this.validate();
    if (this.refundForm.invalid) {
      Object.keys(this.formGroup.controls).map(name => {
        const control = this.formGroup.controls[name];
        if (control.invalid) {
          control.markAsTouched();
        }
      });
    } else {
      const value = this.refundForm.value;

      let dialogResult$: Observable<string>;
      dialogResult$ = this.notificationService.confirmDialog({
          title: `Refund transaction ${this.transaction.external_id}`,
          message: 'Are you sure?',
        });
      dialogResult$.subscribe(dialogResult => {
        if (dialogResult === 'yes') {
          if (value.refundMethod === this.refundMethods.refundThroughGateway) {
            this.callGatewayRefund()
          } else {
            const selectedRefundMethod = this.refundForm.controls.refundMethod.value;
            if (selectedRefundMethod === this.refundMethods.refundManually ||
              selectedRefundMethod === this.refundMethods.refundToCredit) {
              let amount = 0;
              for (const journalEntry of this.refundDetails.journalEntries) {
                if (journalEntry.transaction) {
                  amount = amount + Number(journalEntry.destination_amount)
                }
              }
              const refundData = {
                invoice: this.object.id,
                transaction: this.transaction.id,
                refund_to_credit: selectedRefundMethod === this.refundMethods.refundToCredit,
                refund_manually: selectedRefundMethod === this.refundMethods.refundManually,
                amount,
                external_id: value.externalTransactionId
              };
              this.invoicesApiService.refund(this.object.id, refundData).subscribe(response => {
                this.notificationService.showMessage('Transaction refund initiated.');
                this.refreshService.refresh();
              }, error => {
                this.setErrors(error.error);
              });
            }
          }
        }
      });
    }
  }
}
