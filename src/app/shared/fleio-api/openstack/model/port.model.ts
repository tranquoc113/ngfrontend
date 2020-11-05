import { FleioId, IBaseFleioObjectModel } from '../../base-model/base-fleio-object.model';
import { IFloatingIpModel } from '../floating-ips/model/floating-ip.model';
import { IClientModel } from '@fleio-api/client-user/model/client.model';
import { IProjectModel } from '@fleio-api/openstack/model/project.model';
import { INetworkModel } from '@fleio-api/openstack/model/network.model';

export interface IPortModel extends IBaseFleioObjectModel {
  ipv4s: {
    ip_address: string;
    subnet_id: string;
    new?;
  }[];
  ipv6s: {
    ip_address: string;
    subnet_id: string;
    new?;
  }[];
  fixed_ips: {
    subnet_id: string;
    ip_address: string;
  }[];
  floating_ips: IFloatingIpModel[];
  client: IClientModel;
  created_at: Date;
  name: string;
  description: string;
  admin_state_up: boolean;
  device_id: string;
  device_owner: string;
  mac_address: string;
  security_groups: string;
  port_security_enabled: boolean;
  extra: string;
  status: string;
  network?: FleioId;
  project: FleioId;
}
