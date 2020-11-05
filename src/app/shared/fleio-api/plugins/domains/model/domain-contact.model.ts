import { FleioId, IBaseFleioObjectModel } from '../../../base-model/base-fleio-object.model';
import { ICustomFieldModel } from '../../../custom-fields/model/custom-field.model';

export interface IDomainContactModel extends IBaseFleioObjectModel {
  custom_fields: ICustomFieldModel[];
  name?: string;
  created_at: string;
  first_name: string;
  last_name: string;
  company: string;
  address1: string;
  address2: string;
  city: string;
  country: string;
  state: string;
  zip_code: string;
  phone: string;
  fax: string;
  email: string;
  date_created: Date;
  vat_id: string;
  client: FleioId | any;
  details?: string;
}
