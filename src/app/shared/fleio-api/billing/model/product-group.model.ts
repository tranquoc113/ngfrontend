import { IBaseFleioObjectModel } from '../../base-model/base-fleio-object.model';
import { IProductModel } from '@fleio-api/billing/model/product.model';

export interface IProductGroupModel extends IBaseFleioObjectModel {
  products: Array<IProductModel>;
  name: string;
  description: string;
  visible: boolean;
}
