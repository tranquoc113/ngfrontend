import { INetworkModel } from '@fleio-api/openstack/model/network.model';
import { IClientModel } from '@fleio-api/client-user/model/client.model';
import { IRegionModel } from '@fleio-api/openstack/model/region.model';

export interface IFloatingIpCreateOptionsModel {
  client: IClientModel;
  networks: INetworkModel[];
  regions: IRegionModel[];
  default_region: string;
}
