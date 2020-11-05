import { IFlavorModel } from '@fleio-api/openstack/model/flavor.model';
import { IPublicKeyModel } from '@fleio-api/public-key/model/public-key.model';

export interface IClusterCreateOptionsModel {
  OS_ENDUSER_API_FOR_CLUSTER_CREATION: boolean;
  flavors: Array<IFlavorModel>;
  keypairs: Array<IPublicKeyModel>;
}
