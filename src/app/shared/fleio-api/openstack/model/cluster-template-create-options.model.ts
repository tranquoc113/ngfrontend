import { IImageModel } from '@fleio-api/openstack/model/image.model';
import { IPublicKeyModel } from '@fleio-api/public-key/model/public-key.model';
import { IFlavorModel } from '@fleio-api/openstack/model/flavor.model';
import { IRegionModel } from '@fleio-api/openstack/model/region.model';
import { ISubnetModel } from '@fleio-api/openstack/model/subnet.model';

export interface IClusterTemplateCreateOptionsModel {
  coe: {
    [key: string]: string;
  };
  docker_storage_driver_opts: {
    [key: string]: string
  };
  network_driver_opts: {
    [key: string]: Array<string>;
  };
  network_driver_defaults: {
    [key: string]: string
  };
  docker_storage_driver_default: string;
  // {coe}_images: Array<IImageModel>;
  keypairs: Array<IPublicKeyModel>;
  flavors: Array<IFlavorModel>;
  regions: Array<IRegionModel>;
  external_networks: Array<any>;
  private_networks: Array<any>;
  fixed_subnets: Array<ISubnetModel>;
}
