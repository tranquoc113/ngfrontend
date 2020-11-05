import { IBaseFleioObjectModel } from '../../base-model/base-fleio-object.model';
import { IPermissionsModel } from '../../base-model/IPermissionsModel';
import { IUserModel } from './user.model';

export interface IUserGroupModel extends IBaseFleioObjectModel {
  users_count: number;
  name: string;
  created_at: Date;
  description: string;
  is_default: boolean;
  permissions: any;
  reseller: IUserModel;
}
