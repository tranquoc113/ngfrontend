import { IUserModel } from '@fleio-api/client-user/model/user.model';

export interface IUserProfileDataModel extends IUserModel {
  mobile_phone_number: string | null;
  old_password?: string | null;
  license_expiring?: {
    warning_days: number;
    warning_level: number;
  };
  cores_exceeded?: {
    grace_days: number;
    max_cores: number;
    cores_in_use: number;
  };
}
