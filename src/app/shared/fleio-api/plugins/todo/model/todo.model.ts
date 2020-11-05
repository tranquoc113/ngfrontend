import { FleioId, IBaseFleioObjectModel } from '../../../base-model/base-fleio-object.model';
import { ITodoCommentModel } from './todo-comment.model';

export interface ITodoModel extends IBaseFleioObjectModel {
  created_at: Date;
  created_by: FleioId;
  created_by_display: string;
  assigned_to: any;
  assigned_to_display: string;
  title: string;
  description: string;
  status: string;
  status_display: string;
  comments: ITodoCommentModel[];
}
