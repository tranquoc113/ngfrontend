import { IBaseFleioObjectModel } from '../../../base-model/base-fleio-object.model';
import { IRegionModel } from '@fleio-api/openstack/model/region.model';

export interface IZoneCreateOptionsModel extends IBaseFleioObjectModel {
  regions: IRegionModel[];
  selected_region: string;
  types: string[][];
}
