import { FleioId, IBaseFleioObjectModel } from '../../base-model/base-fleio-object.model';
import { IFixedIpModel } from '@fleio-api/openstack/model/fixed-ip.model';
import { INetworkInterfaceModel } from '@fleio-api/openstack/model/network-interface.model';
import { IClientModel } from '@fleio-api/client-user/model/client.model';

export interface IRouterModel extends IBaseFleioObjectModel {
  routes: any[];
  availability_zones: string[];
  availability_hints: any[];
  external_fixed_ips: IFixedIpModel[];
  network_name: string;
  interfaces: INetworkInterfaceModel[];
  name: string;
  status: string;
  admin_state_up: boolean;
  description: string;
  project_id: string;
  external_network_id: string;
  enable_snat: boolean;
  distributed: boolean;
  ha: boolean;
  region: string;
  client?: FleioId | IClientModel
}
