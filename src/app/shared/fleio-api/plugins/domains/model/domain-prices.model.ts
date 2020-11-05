import { ICurrencyModel } from '../../../billing/model/currency.model';
import { IPriceCyclesModel } from './price-cycle.model';

export interface IDomainPricesModel {
  default_currency: ICurrencyModel;
  price_types: { [type: string]: string };
  price_cycles_list: IPriceCyclesModel[];
  price_cycles_by_currency: { [currencyCode: string]: { [priceType: string]: number; } };
  price_cycles_by_type: { [priceType: string]: { [currency: string]: number; } };
  default_price_types: { [priceType: string]: number; };
}
