import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { InvoiceListUIService } from '../invoice-list-ui.service';
import { DetailsBase } from '../../../../shared/ui/objects-view/details-base';
import { IInvoiceModel } from '../../../../shared/fleio-api/billing/model/invoice.model';

@Component({
  selector: 'app-invoice-details',
  templateUrl: './invoice-details.component.html',
  styleUrls: ['./invoice-details.component.scss']
})
export class InvoiceDetailsComponent extends DetailsBase<IInvoiceModel> {
  constructor(route: ActivatedRoute, invoiceListUIService: InvoiceListUIService) {
    super(route, invoiceListUIService, 'details', 'invoice');
  }
}
