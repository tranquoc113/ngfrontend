import { IBaseFleioObjectModel } from '../../base-model/base-fleio-object.model';
import { IFixedIpModel } from '@fleio-api/openstack/model/fixed-ip.model';

export interface INetworkInterfaceModel extends IBaseFleioObjectModel {
  network_name: string;
  fixed_ips: IFixedIpModel[];
  admin_state_up: boolean;
}
