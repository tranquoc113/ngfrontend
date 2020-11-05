import { INetworkModel } from '@fleio-api/openstack/model/network.model';
import { ISubnetPoolModel } from '@fleio-api/openstack/subnet-pools/model/subnet-pool.model';

export interface IAutoCreateNetworkOptionsModel {
  options: {
    networks: INetworkModel[];
    ipv4_subnetpools: ISubnetPoolModel[];
    ipv6_subnetpools: ISubnetPoolModel[];
    config: {
      network: INetworkModel;
      ipv4_subnetpool: ISubnetPoolModel;
      ipv6_subnetpool: ISubnetPoolModel;
    }
  }
}
