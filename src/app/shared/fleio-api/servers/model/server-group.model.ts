import { IBaseFleioObjectModel } from '../../base-model/base-fleio-object.model';

export interface IServerGroupModel extends IBaseFleioObjectModel {
  name: string;
  description: string;
  placement: number;
}
