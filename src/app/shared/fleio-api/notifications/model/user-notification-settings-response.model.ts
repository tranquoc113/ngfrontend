import { IBaseFleioObjectModel } from '../../base-model/base-fleio-object.model';

export interface IUserNotificationSettingsResponseModel extends IBaseFleioObjectModel{
  detail: {
    [key: string]: {
      name: string;
      display_name: string;
      enabled: boolean;
    };
  };
}
