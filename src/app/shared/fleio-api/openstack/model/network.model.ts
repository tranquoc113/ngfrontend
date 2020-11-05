import { FleioId, IBaseFleioObjectModel } from '@fleio-api/base-model/base-fleio-object.model';
import { ISubnetModel } from '@fleio-api/openstack/model/subnet.model';

export interface INetworkModel extends IBaseFleioObjectModel {
  extra: { [key: string]: any; };
  subnets: ISubnetModel[];
  allowedActions: string[];
  client_id: FleioId;
  client_full_name: string;
  name: string;
  description: string;
  region: string;
  project: string;
  shared: boolean;
  router_external: boolean;
  is_default: boolean;
  status: string;
  admin_state_up: boolean;
  created_at: Date;
  updated_at: Date;
}
