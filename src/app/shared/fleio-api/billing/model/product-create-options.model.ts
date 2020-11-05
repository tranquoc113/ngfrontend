import { IBillingModuleModel } from './billing-module.model';
import { IProductGroupModel } from '@fleio-api/billing/model/product-group.model';

export interface IProductCreateOptions {
  groups: Array<IProductGroupModel>;
  modules: {
    [key: string]: IBillingModuleModel;
  };
  product_types: Array<Array<string>>;
  statuses: Array<Array<string>>;
  price_models: Array<Array<string>>;
  auto_setups: Array<Array<string>>;
  billing_types: Array<Array<string>>;
}
