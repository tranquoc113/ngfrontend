import { IBaseFleioObjectModel } from '../../base-model/base-fleio-object.model';
import { IUserModel } from '../../client-user/model/user.model';

export interface IOperationModel extends IBaseFleioObjectModel {
  created_at: Date;
  status: string;
  initiating_user: IUserModel;
  operation_type: string;
  primary_object_id: string;
  progress: {
    completed_steps: number;
    total_steps: number;
    steps_details: Array<{
      display: string;
      status: string;
      error_message?: string;
    }>;
  };
  completed: boolean;
  params: string;
}
