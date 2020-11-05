import { ICountry } from '../../misc/model/country';
import { ICustomFieldsModel } from '../../misc/model/custom-fields.model';
import { IConfigurationModel } from '../../configurations/model/configuration.model';

export interface IClientCreateOptions {
  countries: ICountry[];
  // TODO: maybe use currency model here
  currencies: string[];
  default_currency: string;
  custom_fields: ICustomFieldsModel;
  max_email_attachment_size: number;
  email_variables: string[];
  configurations: Array<IConfigurationModel>;
}
