import { Component, OnInit } from '@angular/core';
import { InvoicesApiService } from '../../../../shared/fleio-api/billing/invoices/invoices-api.service';

export interface IInvoicesSummaryResponse {
  paid: number;
  unpaid: number;
  cancelled: number;
  refunded: number;
}

@Component({
  selector: 'app-invoices-panel',
  templateUrl: './invoices-panel.component.html',
  styleUrls: ['./invoices-panel.component.scss']
})
export class InvoicesPanelComponent implements OnInit {
  tableData: {
    description: string;
    number: number;
  }[] = [];
  displayedColumns: string[] = ['description', 'number'];
  constructor(private invoicesApi: InvoicesApiService) { }

  ngOnInit() {
    this.invoicesApi.getAction('summary').subscribe((response: IInvoicesSummaryResponse) => {
      this.tableData.push({
        description: 'Paid',
        number: response.paid
      });
      this.tableData.push({
        description: 'Unpaid',
        number: response.unpaid
      });
      this.tableData.push({
        description: 'Cancelled',
        number: response.cancelled
      });
      this.tableData.push({
        description: 'Refunded',
        number: response.refunded
      });
    });
  }

}
