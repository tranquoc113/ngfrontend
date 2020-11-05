import { IBaseFleioObjectModel } from '../../base-model/base-fleio-object.model';
import { IGatewayModel } from './gateway.model';
import { ITransactionActionModel } from './transaction-action.model';

export interface ITransactionModel extends IBaseFleioObjectModel {
  extra: string;
  gateway: IGatewayModel;
  is_refundable: boolean;
  external_id: string;
  date_initiated: Date;
  status: string;
  amount: string;
  fee: string;
  invoice: number;
  currency: string;
  refunded_transaction: number;
  gateway_display_name: string;
  actions?: Array<ITransactionActionModel>;
}
