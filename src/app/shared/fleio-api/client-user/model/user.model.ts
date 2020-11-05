import { FleioId, IBaseFleioObjectModel } from '../../base-model/base-fleio-object.model';
import { IPermissionsModel } from '../../base-model/IPermissionsModel';
import { IClientModel } from './client.model';
import { IUserGroupModel } from '@fleio-api/client-user/model/user-group.model';

export interface IUserModel extends IBaseFleioObjectModel {
  username: string;
  email: string;
  first_name: string;
  last_name: string;
  date_joined: Date;
  last_login: Date;
  is_active: boolean;
  is_reseller: boolean;
  clients: Array<IClientModel>;
  external_billing_id: string;
  full_name: string;
  is_staff: boolean;
  is_superuser: boolean;
  permissions: IPermissionsModel;
  user_groups: IUserGroupModel[];
  language: string;
  email_verified: boolean;
  reseller: IUserModel;
  reseller_client_details: IClientModel;
  reseller_client?: FleioId;
  password?: string;
}
