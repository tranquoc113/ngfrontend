import { IBaseFleioObjectModel } from '@fleio-api/base-model/base-fleio-object.model';

export interface ISFAMethod extends IBaseFleioObjectModel{
  default: boolean;
  display_name: string;
  help_text: string;
  name: string;
}
