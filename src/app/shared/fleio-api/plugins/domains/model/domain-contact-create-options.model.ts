import { ICountry } from '../../../misc/model/country';
import { ICustomFieldDefinitionModel } from '../../../custom-fields/model/custom-field-definition.model';

export interface IDomainContactCreateOptionsModel {
  countries: ICountry[];
  custom_fields: { [name: string]: ICustomFieldDefinitionModel };
}
