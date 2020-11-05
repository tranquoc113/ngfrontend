import { IRegionModel } from '@fleio-api/openstack/model/region.model';

export interface ISubnetPoolCreateOptionsModel {
  regions: IRegionModel[];
  selected_region: string;
}
