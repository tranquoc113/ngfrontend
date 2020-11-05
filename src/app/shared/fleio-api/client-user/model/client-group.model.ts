import { IBaseFleioObjectModel } from '../../base-model/base-fleio-object.model';

export interface IClientGroupModel extends IBaseFleioObjectModel {
  client_count?: number;
  created_at?: Date;
  name: string;
  description: string;
  is_default: boolean;
  reseller?: string;
}
