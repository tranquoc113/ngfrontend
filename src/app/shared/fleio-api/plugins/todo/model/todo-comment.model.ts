import { FleioId } from '../../../base-model/base-fleio-object.model';

export interface ITodoCommentModel {
  created_at: Date;
  created_by: FleioId;
  created_by_display: string;
  comment_text: string;
  new_assignee: FleioId;
  new_assignee_display: string;
  new_status: string;
  new_status_display: string;
  description_changed: boolean;
  title_changed: boolean;
}
