import { IBaseFleioObjectModel } from '../../base-model/base-fleio-object.model';

export interface IHostingServerSettingsModel extends IBaseFleioObjectModel {
  hostname: string;
  username: string;
  password: string;
  api_token: string;
  secure: boolean;
  port: number;
  max_accounts: number;
  quality: number;
  assigned_ips: string;
  status_url: string;
  location: string;
}
