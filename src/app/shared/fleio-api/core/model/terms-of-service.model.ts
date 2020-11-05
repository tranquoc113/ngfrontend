import { IBaseFleioObjectModel } from '../../base-model/base-fleio-object.model';

export interface ITermsOfServiceModel extends IBaseFleioObjectModel {
  title: string;
  version: string;
  draft: boolean;
  content: string;
}
