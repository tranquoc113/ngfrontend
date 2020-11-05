import { IBaseFleioObjectModel } from '../../base-model/base-fleio-object.model';
import { ICurrencyModel } from '@fleio-api/billing/model/currency.model';

export interface IConfigurableOptionCreateOptionsModel extends IBaseFleioObjectModel {
  widgets: {
    label: string;
    value: string;
  }[];
  currencies: ICurrencyModel[];
  default_currency: ICurrencyModel[];
  status_choices: string[][];
  cycles: string[][];
}
