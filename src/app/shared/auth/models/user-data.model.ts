import { IUserProfileDataModel } from './user.model';
import { IVersionModel } from './version.model';
import { IFeatureModel } from './feature.model';

export interface IUserDataModel {
  user: IUserProfileDataModel;
  features: IFeatureModel;
  notifications: number;
  version: IVersionModel;
  is_white_label: boolean;
  impersonated?: boolean;
}
