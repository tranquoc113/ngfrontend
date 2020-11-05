import { IConfigOptionModel } from './config-option.model';

export interface IInvoiceItemModel {
  usage: any;
  resource_type: string | undefined;
  amount: string;
  description: string;
  service: number;
  item_type: string;
  taxed: boolean;
  taxes: [];
  configurable_options: IConfigOptionModel[];
  quantity: string;
  unit_price: number;
  client_name?: string;
}
