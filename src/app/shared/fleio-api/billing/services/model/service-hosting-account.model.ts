import { FleioId, IBaseFleioObjectModel } from '@fleio-api/base-model/base-fleio-object.model';

export interface IServiceHostingAccountModel extends IBaseFleioObjectModel {
  available_servers: {
    id: FleioId;
    name: string;
  }[];
  package_name: string;
  account_id: string;
  username: string;
  password: string;
  dedicated_ip: string;
  service: FleioId;
  server: FleioId;
}
