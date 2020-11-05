export interface ICustomFieldDefinitionModel {
  label: string;
  type: string;
  required_for_domain?: boolean;
  optional?: boolean;
  required?: boolean;
  choices? : string[][];
  category?: string;
}
