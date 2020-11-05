import { IBaseFleioObjectModel } from '../../base-model/base-fleio-object.model';
import { IUserModel } from '../../client-user/model/user.model';

export interface IPublicKeyModel extends IBaseFleioObjectModel {
  name: string;
  public_key: string;
  created_at: Date;
  fingerprint: string;
  user: IUserModel;
}
