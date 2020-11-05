import { IBaseFleioObjectModel } from '../../../base-model/base-fleio-object.model';
import { IRegistrarPricesModel } from './registrar-prices.model';

export interface IRegistrarConnectorModel extends IBaseFleioObjectModel {
  name: string;
  created_at: Date;
  update_at: Date;
  class_name: string;
  prices?: IRegistrarPricesModel[];
}
