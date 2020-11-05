import { Injectable } from '@angular/core';
import { ConfigService } from '../../../config/config.service';
import { FleioApiService } from '../../fleio-api.service';
import { HttpClient } from '@angular/common/http';
import { IInvoiceModel } from '../model/invoice.model';
import { FleioId } from '../../base-model/base-fleio-object.model';

@Injectable({
  providedIn: 'root'
})
export class InvoicesApiService extends FleioApiService<IInvoiceModel> {
  // noinspection JSUnusedGlobalSymbols
  constructor(protected httpClient: HttpClient, protected config: ConfigService) {
    super();
    this.setEndpoint(config.getPanelApiUrl('billing/invoices'));
  }

  refund(objectId: FleioId, refundData: {
    invoice: FleioId,
    transaction: FleioId,
    refund_to_credit: boolean,
    refund_manually: boolean,
    amount: number,
    external_id?: string,
  }) {
    return this.objectPostAction(objectId, 'perform_refund', refundData);
  }
}
