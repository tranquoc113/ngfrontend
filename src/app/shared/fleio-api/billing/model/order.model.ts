import { IBaseFleioObjectModel } from '../../base-model/base-fleio-object.model';
import { IUserModel } from '../../client-user/model/user.model';
import { IClientModel } from '../../client-user/model/client.model';
import { IInvoiceModel } from './invoice.model';
import { IOrderItemModel } from '@fleio-api/billing/model/order-item.model';

export interface IOrderModel extends IBaseFleioObjectModel {
  user: IUserModel;
  client: IClientModel;
  invoice: IInvoiceModel;
  fraud_check_result: any;
  items: IOrderItemModel[];
  total: string;
  order_date: Date;
  status: string;
  client_notes: string;
  staff_nodes: string;
  metadata: string;
  currency: string;
}
