import { IBaseFleioObjectModel } from '../../base-model/base-fleio-object.model';
import { ITransactionModel } from './transaction.model';
import { IClientModel } from '../../client-user/model/client.model';
import { IUserModel } from '../../client-user/model/user.model';
import { IJournalSourceModel } from './journal-source.model';

export interface IJournalEntryModel extends IBaseFleioObjectModel {
  transaction: ITransactionModel;
  needs_capture: boolean;
  client: IClientModel;
  is_refund: boolean;
  user: IUserModel;
  date_added: Date;
  source: string;
  destination: string;
  source_amount: string;
  destination_amount: string;
  partial: boolean;
  exchange_rate: string;
  client_credit_left: string;
  client_credit: object;
  invoice: number;
  source_currency: string;
  destination_currency: string;
  client_credit_left_currency: string;
  source_info: IJournalSourceModel;
  destination_info: IJournalSourceModel;
  direction: string;
  source_name: string;
  destination_name: string;
}
