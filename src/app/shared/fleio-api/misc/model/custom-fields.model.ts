export interface ICustomFieldsModel {
  [key: string]: {
    category: string;
    label: string;
    optional: boolean;
    required: boolean;
    type: string;
    validator: { };
  }
}
