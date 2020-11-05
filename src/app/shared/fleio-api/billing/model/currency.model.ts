import { IBaseFleioObjectModel } from '../../base-model/base-fleio-object.model';

export interface ICurrencyModel extends IBaseFleioObjectModel {
  code: string;
  rate: number;
  is_default?: boolean;
}
