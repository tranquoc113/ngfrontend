import { IBaseFleioObjectModel } from '../../base-model/base-fleio-object.model';
import { IProductCycleModel } from './product-cycle.model';
import { IBillingModuleModel } from './billing-module.model';

export interface IProductModel extends IBaseFleioObjectModel {
  cycles: IProductCycleModel[];
  module: IBillingModuleModel;
  price_model_display: string;
  auto_setup_display: string;
  name: string;
  description: string;
  code: string;
  product_type: string;
  status: string;
  price_model: string;
  auto_setup: string;
  taxable: boolean;
  requires_domain: boolean;
  hide_services: boolean;
  group: {id: string, name?: string, description?: string};
  reseller: number;
  configurable_options: [];
  upgrades: [];
}
