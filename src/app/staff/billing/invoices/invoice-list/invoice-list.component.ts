import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RefreshService } from '../../../../shared/ui-api/refresh.service';
import { InvoiceListUIService } from '../invoice-list-ui.service';
import { ListBase } from '../../../../shared/ui/objects-view/list-base';
import { IInvoiceModel } from '../../../../shared/fleio-api/billing/model/invoice.model';

@Component({
  selector: 'app-invoice-list',
  templateUrl: './invoice-list.component.html',
  styleUrls: ['./invoice-list.component.scss']
})
export class InvoiceListComponent extends ListBase<IInvoiceModel> implements OnInit {
  constructor(
    private route: ActivatedRoute, private invoiceListUIService: InvoiceListUIService,
    private refreshService: RefreshService,
  ) {
    super(route, invoiceListUIService, refreshService, 'invoices');
  }

  ngOnInit() {
    super.ngOnInit();
  }
}
