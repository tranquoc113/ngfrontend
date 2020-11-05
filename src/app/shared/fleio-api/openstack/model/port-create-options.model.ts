import { IBaseFleioObjectModel } from '../../base-model/base-fleio-object.model';
import { IRegionModel } from '@fleio-api/openstack/model/region.model';

export interface IPortCreateOptionsModel extends IBaseFleioObjectModel {
  regions: IRegionModel[];
  vnic_types: string[][];
}
