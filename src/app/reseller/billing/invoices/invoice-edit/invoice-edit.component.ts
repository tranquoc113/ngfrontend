import { Component, OnInit } from '@angular/core';
import { DetailsBase } from '../../../../shared/ui/objects-view/details-base';
import { IInvoiceModel } from '../../../../shared/fleio-api/billing/model/invoice.model';
import { ActivatedRoute } from '@angular/router';
import { InvoiceListUIService } from '../invoice-list-ui.service';

@Component({
  selector: 'app-invoice-edit',
  templateUrl: './invoice-edit.component.html',
  styleUrls: ['./invoice-edit.component.scss']
})
export class InvoiceEditComponent extends DetailsBase<IInvoiceModel> {
  constructor(route: ActivatedRoute, invoiceListUIService: InvoiceListUIService) {
    super(route, invoiceListUIService, 'edit', 'invoice');
  }
}
