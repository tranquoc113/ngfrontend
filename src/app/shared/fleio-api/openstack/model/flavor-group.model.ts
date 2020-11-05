import { IBaseFleioObjectModel } from '../../base-model/base-fleio-object.model';

export interface IFlavorGroupModel extends IBaseFleioObjectModel {
  flavor_count: number;
  created_at: Date;
  name: string;
  description: string;
  is_default: boolean;
  priority: number;
  reseller: number;
}
