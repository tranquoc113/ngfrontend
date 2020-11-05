import { FleioId, IBaseFleioObjectModel } from '../../base-model/base-fleio-object.model';

export interface IServiceConfigOptionModel extends IBaseFleioObjectModel {
  description: string;
  display: string;
  has_price: boolean;
  id: FleioId;
  is_free: boolean;
  option: FleioId;
  option_value: string;
  price: string;
  quantity: number;
  setup_fee: string;
  unit_price: string;
}
