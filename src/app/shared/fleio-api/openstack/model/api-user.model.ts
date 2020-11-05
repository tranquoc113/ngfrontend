import { IBaseFleioObjectModel } from '../../base-model/base-fleio-object.model';

export interface IApiUserModel extends IBaseFleioObjectModel {
  default_project_id: string;
  domain_id: string;
  description: string;
  name: string;
  email: string | null;
  enabled: boolean;
  password_expires_at: Date;
  project_name: string;
}
