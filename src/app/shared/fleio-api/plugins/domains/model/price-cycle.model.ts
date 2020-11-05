import { ICurrencyModel } from '../../../billing/model/currency.model';

export interface IPriceCyclesModel {
  currency: ICurrencyModel;
  price_type: string;
  price_type_display: string;
  prices_per_years: number[];
  currency_code: string;
  relative_prices: boolean;
}
