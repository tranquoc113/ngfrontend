import { IBaseFleioObjectModel } from '../../base-model/base-fleio-object.model';

export interface IBillingModuleModel extends IBaseFleioObjectModel {
  id: string;
  config?: string;
  name: string;
  description: string;
  path?: string;
  plugin?: any;
}
