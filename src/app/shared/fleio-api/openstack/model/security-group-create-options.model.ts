import { IRegionModel } from '@fleio-api/openstack/model/region.model';

export interface ISecurityGroupCreateOptionsModel {
  regions: Array<IRegionModel>;
  selected_region: string;
}
