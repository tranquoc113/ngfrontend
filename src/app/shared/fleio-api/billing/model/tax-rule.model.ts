import { IBaseFleioObjectModel } from '../../base-model/base-fleio-object.model';

export interface ITaxRuleModel extends IBaseFleioObjectModel {
  rate: number;
  level: number;
  name: string;
  state: string;
  country: string;
  start_date: Date;
  end_date: Date;
}
