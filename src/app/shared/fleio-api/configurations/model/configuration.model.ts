import { IBaseFleioObjectModel } from '../../base-model/base-fleio-object.model';

export interface IConfigurationModel extends IBaseFleioObjectModel {
  client_count: number;
  description: string;
  name: string;
  is_default: boolean;
  reseller: number;
  reseller_resources: number;
  reseller_client: number;
}
