import { ICustomCodeDefinitionModel } from './custom-code-definition.model';

export interface ICustomCodeModel {
  insertion_points: string[];
  custom_code: { [insertionPoint: string] : ICustomCodeDefinitionModel };
}
