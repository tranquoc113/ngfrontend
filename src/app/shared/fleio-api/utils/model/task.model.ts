import { FleioId, IBaseFleioObjectModel } from '../../base-model/base-fleio-object.model';
import { IUserModel } from '../../client-user/model/user.model';

export interface ITaskModel extends IBaseFleioObjectModel {
  parent_id: FleioId;
  name: string;
  args: string;
  kwargs: string;
  user: IUserModel;
  state: string;
  created_at: Date;
  resource_id: string;
  resource_type: string;
  description: string;
  has_subtasks: boolean;
  depth: number;
}
