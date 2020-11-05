import { IUserProfileDataModel } from '@shared/auth/models/user.model';
import { IBaseFleioObjectModel } from '../../base-model/base-fleio-object.model';

export interface IUserProfileModel extends IBaseFleioObjectModel {
  user: IUserProfileDataModel;
}
