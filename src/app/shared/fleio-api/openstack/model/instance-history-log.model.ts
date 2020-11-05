import { IBaseFleioObjectModel } from '../../base-model/base-fleio-object.model';

export interface IInstanceHistoryLogModel extends IBaseFleioObjectModel {
  start_time: Date;
  message: string | null;
  user_id: string;
  request_id: string;
  action: string;
  project_id: string;
  events: {
    start_time: Date;
    result: string;
    finish_time: Date;
    event: string;
    traceback: string | null;
  }[];
  loading?: boolean; // used only in frontend
}
