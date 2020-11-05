import { Component, OnInit } from '@angular/core';
import { DetailsComponentBase } from '../../../../ui/objects-view/details-component-base';
import { IInvoiceModel } from '../../../../fleio-api/billing/model/invoice.model';
import { ConfigService } from '../../../../config/config.service';
import { ITransactionModel } from '../../../../fleio-api/billing/model/transaction.model';
import { RefreshService } from '../../../../ui-api/refresh.service';
import { TransactionsApiService } from '../../../../fleio-api/billing/transaction/transaction-api.service';
import { NotificationService } from '../../../../ui-api/notification.service';

@Component({
  selector: 'app-invoice-details-overview',
  templateUrl: './invoice-details-overview.component.html',
  styleUrls: ['./invoice-details-overview.component.scss']
})
export class InvoiceDetailsOverviewComponent extends DetailsComponentBase<IInvoiceModel> implements OnInit {
  downloadPdfUrl: string;
  displayedJournalColumns: string[] = [
    'date_added', 'source_info', 'destination_info', 'destination_amount', '(actions)'
  ];

  constructor(
    public config: ConfigService,
    private refreshService: RefreshService,
    private transactionApi: TransactionsApiService,
    private notificationService: NotificationService,
  ) {
    super();
  }

  public get object(): IInvoiceModel {
    if (this.objectController) {
      const invoice = Object.assign(this.objectController.object) as IInvoiceModel;
      const distinctClients = invoice.items.reduce(
        (clients, item, currentIndex, items) => {
          clients[item.client_name] = item.client_name;
          return clients;
        }, {});

      invoice.displayClient = Object.keys(distinctClients).length > 1;
      return invoice;
    }
    return null;
  }


  ngOnInit() {
    super.ngOnInit();
    if (this.object) {
      this.downloadPdfUrl = this.config.getPanelApiUrl(
        `billing/invoices/${this.object.id}/download?content_type=pdf`
      );
    }
  }

  deleteTransaction(transaction: ITransactionModel) {
    this.notificationService.confirmDialog(
      {
        title: 'Delete transaction',
        message: 'Are you sure you want to delete transaction?'
      }
    ).subscribe(result => {
      if (result === 'yes') {
        this.transactionApi.delete(transaction.id).subscribe(() => {
          this.refreshService.refresh();
        });
      }
    });
  }
}
