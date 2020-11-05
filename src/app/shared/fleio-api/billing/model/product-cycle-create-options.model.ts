import { IProductModel } from '@fleio-api/billing/model/product.model';
import { ICurrencyModel } from '@fleio-api/billing/model/currency.model';

export interface IProductCycleCreateOptionsModel {
  products: Array<IProductModel>;
  cycles: Array<Array<string>>;
  currencies: Array<ICurrencyModel>;
  statuses: Array<Array<string>>;
}
