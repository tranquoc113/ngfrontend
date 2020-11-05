import { IBaseFleioObjectModel } from '../../../base-model/base-fleio-object.model';

export interface ICustomFieldsStatusModel extends IBaseFleioObjectModel {
  missing_fields: boolean;
  missing_fields_labels: string[];
}
