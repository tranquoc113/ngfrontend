import { IBaseFleioObjectModel } from '../../base-model/base-fleio-object.model';

export interface IRegionModel extends IBaseFleioObjectModel {
  description: string;
  enabled: boolean;
  enable_volumes: boolean;
  enable_snapshots: boolean;
}
