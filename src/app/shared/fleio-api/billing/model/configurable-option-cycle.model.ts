import { FleioId, IBaseFleioObjectModel } from '../../base-model/base-fleio-object.model';

export interface IConfigurableOptionCycleModel extends IBaseFleioObjectModel {
  display_name: string;
  price: string;
  is_relative_price: boolean;
  cycle: string;
  cycle_multiplier: number;
  setup_fee: string;
  currency: string;
  free: boolean
  option?: FleioId,
  value?: any;
}
