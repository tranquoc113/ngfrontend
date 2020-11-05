import { IBaseFleioObjectModel } from '../../base-model/base-fleio-object.model';
import { IServiceModel } from './service.model';

export interface IInvoiceCreateOptionsModel extends IBaseFleioObjectModel {
  invoice_item_types: [];
  invoice_statuses: [];
  services: IServiceModel[];
}
