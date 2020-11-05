import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FleioId } from '../../../../fleio-api/base-model/base-fleio-object.model';
import { InvoicesApiService } from '../../../../fleio-api/billing/invoices/invoices-api.service';
import { NotificationService } from '../../../../ui-api/notification.service';
import { IInvoiceModel } from '../../../../fleio-api/billing/model/invoice.model';

@Component({
  selector: 'app-invoice-delete-dialog',
  templateUrl: './invoice-delete-dialog.component.html',
  styleUrls: ['./invoice-delete-dialog.component.scss']
})
export class InvoiceDeleteDialogComponent implements OnInit {
  invoice: IInvoiceModel;
  allowDelete: boolean;

  constructor(
    public dialogRef: MatDialogRef<InvoiceDeleteDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {
      invoiceID: FleioId,
    },
    private invoicesApiService: InvoicesApiService,
    private notificationService: NotificationService,
    ) {
  }

  ngOnInit() {
    if (this.data && this.data.invoiceID) {
      this.invoicesApiService.get(this.data.invoiceID).subscribe(response => {
        this.invoice = response;
        this.allowDelete = !(this.invoice && this.invoice.transactions && Array.isArray(this.invoice.transactions) &&
          this.invoice.transactions.length > 0);
      });
    }
  }

  close() {
    this.dialogRef.close(false);
  }

  delete() {
    this.invoicesApiService.delete(this.invoice.id).subscribe(response => {
      this.dialogRef.close(true);
    }, error => {
      this.notificationService.showMessage('Failed to delete invoice.');
      this.dialogRef.close(false);
    });
  }
}
