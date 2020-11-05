import { ISubnetPoolModel } from '@fleio-api/openstack/subnet-pools/model/subnet-pool.model';

export interface ISubnetCreateOptionsModel {
  pools: ISubnetPoolModel[];
  ipv6_modes: string[];
}
