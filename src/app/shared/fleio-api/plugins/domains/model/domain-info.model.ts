import { ICustomFieldDefinitionModel } from '../../../custom-fields/model/custom-field-definition.model';
import { IDomainActionModel } from './domain-action.model';

export interface IDomainInfoModel {
  actions: IDomainActionModel[];
  custom_fields: {[fieldName: string]: ICustomFieldDefinitionModel}
}
