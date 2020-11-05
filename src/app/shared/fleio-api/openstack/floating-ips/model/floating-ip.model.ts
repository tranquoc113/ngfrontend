import { FleioId, IBaseFleioObjectModel } from '../../../base-model/base-fleio-object.model';
import { INetworkModel } from '@fleio-api/openstack/model/network.model';
import { IClientModel } from '@fleio-api/client-user/model/client.model';
import { IPortModel } from '@fleio-api/openstack/model/port.model';
import { IRouterModel } from '@fleio-api/openstack/model/router.model';

export interface IFloatingIpModel extends IBaseFleioObjectModel {
  floating_network: INetworkModel;
  port: IPortModel;
  router: IRouterModel;
  associated_object: {
    id: FleioId;
    name: string;
    device_type: string;
  };
  client: any;
  floating_ip_address: string;
  status: string;
  description: string;
  fixed_ip_address: string;
  created_at: Date;
  updated_at: Date;
  project: FleioId;
}
