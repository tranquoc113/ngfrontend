import { IBaseFleioObjectModel } from '../../base-model/base-fleio-object.model';
import { IUserModel } from '../../client-user/model/user.model';

export interface IActivityLogModel extends IBaseFleioObjectModel {
  created_at: Date;
  user: IUserModel | null;
  ip: string | null;
  type: string;
  parameters: {};
  log: string;
  tasks_count: number;
}
