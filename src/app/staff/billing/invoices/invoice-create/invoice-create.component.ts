import { Component, OnInit } from '@angular/core';
import { DetailsBase } from '../../../../shared/ui/objects-view/details-base';
import { IInvoiceModel } from '../../../../shared/fleio-api/billing/model/invoice.model';
import { ActivatedRoute } from '@angular/router';
import { InvoiceListUIService } from '../invoice-list-ui.service';

@Component({
  selector: 'app-invoice-create',
  templateUrl: './invoice-create.component.html',
  styleUrls: ['./invoice-create.component.scss']
})
export class InvoiceCreateComponent extends DetailsBase<IInvoiceModel> {
  constructor(route: ActivatedRoute, invoiceListUIService: InvoiceListUIService) {
    super(route, invoiceListUIService, 'create', null);
  }
}
