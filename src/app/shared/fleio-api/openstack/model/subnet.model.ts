import { IBaseFleioObjectModel } from '../../base-model/base-fleio-object.model';

export interface ISubnetModel extends IBaseFleioObjectModel {
  ipv6_address_mode?: string;
  ipv6_ra_mode?: string;
  name: string;
  network_name?: string;
  cidr: string;
  ip_version: number;
  gateway_ip: string;
  project_id: string;
  enable_dhcp: boolean;
  extra: any;
  allocation_pools: { start: string; end: string }[];
  dns_nameservers: string[];
  host_routes: { destination: string; nexthop: string }[];
}
