import { IBaseFleioObjectModel } from '../../base-model/base-fleio-object.model';

export interface IProductCycleModel extends IBaseFleioObjectModel {
  name?: string;
  display_name: string;
  cycle: string;
  cycle_multiplier: string;
  fixed_price: string;
  setup_fee: string;
  setup_fee_entire_quantity: boolean;
  is_relative_price: boolean;
  status: string;
  product: number;
  currency: string;
}
