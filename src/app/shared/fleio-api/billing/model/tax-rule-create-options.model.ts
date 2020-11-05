import { IBaseFleioObjectModel } from '../../base-model/base-fleio-object.model';

export interface ITaxRuleCreateOptionsModel extends IBaseFleioObjectModel {
  countries: Array<string>;
  levels: Array<Array<any>>
}
