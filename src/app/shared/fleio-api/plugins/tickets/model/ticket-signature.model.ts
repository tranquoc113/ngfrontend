import { IBaseFleioObjectModel } from '../../../base-model/base-fleio-object.model';

export interface ITicketSignatureModel extends IBaseFleioObjectModel {
  content: string;
  user: number;
  department_display: string;
  department: number;
}
