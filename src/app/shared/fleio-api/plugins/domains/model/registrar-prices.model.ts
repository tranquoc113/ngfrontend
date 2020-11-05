import { IBaseFleioObjectModel } from '../../../base-model/base-fleio-object.model';

export interface IRegistrarPricesModel extends IBaseFleioObjectModel {
  tld_name: string;
  register_price: number;
  renew_price: number;
  transfer_price: number;
  promo_price: number;
  currency: string;
  years: number;
  updated_at: Date;
}
