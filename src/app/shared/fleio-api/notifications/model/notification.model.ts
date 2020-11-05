import { IBaseFleioObjectModel } from '../../base-model/base-fleio-object.model';

export interface INotificationModel extends IBaseFleioObjectModel {
  id: number | string;
  title: string;
  generated: Date;
  status: string;
  body: string;
}
