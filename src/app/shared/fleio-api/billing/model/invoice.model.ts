import { FleioId, IBaseFleioObjectModel } from '../../base-model/base-fleio-object.model';
import { IClientModel } from '../../client-user/model/client.model';
import { IInvoiceItemModel } from './invoice-item.model';
import { IInvoiceTaxModel } from './invoice-tax.model';
import { IJournalEntryModel } from './journal-entry.model';

export interface IInvoiceModel extends IBaseFleioObjectModel {
  displayClient?: boolean;
  status: string;
  issue_date: Date;
  due_date: Date;
  total: number;
  currency: string;
  first_name: string;
  last_name: string;
  company: string;
  address1: string;
  address2: string;
  city: string;
  country: string;
  state: string;
  zip_code: string;
  phone: string;
  fax: string;
  email: string;
  items: IInvoiceItemModel[];
  fleio_info: string;
  journal: IJournalEntryModel[];
  balance: number;
  client: any;  // IClientModel | FleioId
  taxes: IInvoiceTaxModel[];
  transactions: [];
  statuses: string[];
  display_number: string;
  is_add_credit: boolean;
  is_fiscal: boolean;
  fiscal_date: Date;
  fiscal_due_date: Date;
  name: string;
  subtotal: number;
  groupedItems?: { [resourceType: string]: IInvoiceItemModel[]; };
  resourceTypes?: string[];
  detailed_invoice: boolean;
}
