import { IBaseFleioObjectModel } from '../../base-model/base-fleio-object.model';
import { IRegionModel } from '@fleio-api/openstack/model/region.model';

export interface IRouterCreateOptionsModel extends IBaseFleioObjectModel {
  regions: IRegionModel[];
  external_networks: {
    name: string;
    id: string;
    region: string;
  }[];
  selected_region: string;
}
