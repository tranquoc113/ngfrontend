import { IBaseFleioObjectModel } from '../../../base-model/base-fleio-object.model';
import { IUserModel } from '../../../client-user/model/user.model';
import { ITicketAttachmentModel } from './ticket-attachment.model';

export interface ITicketReplyModel extends IBaseFleioObjectModel {
  id: string;
  ticket_activity: boolean;
  is_staff_generated: boolean;
  message_type: string;
  message: string;
  attachments: Array<ITicketAttachmentModel>;
  last_edited: Date;
  last_edited_by: IUserModel;
  created_by: IUserModel;
  created_by_display: string;
  created_at: Date;
  email_generated: boolean;
  new_status: string;
  new_internal_status: string;
  new_priority: string;
  new_assignee: {
    id: string;
    display: string;
  };
  new_department: string;
  new_cc: string;
  new_client: string;
  title_changed: boolean;
  description_changed: boolean;
  message_owner_email: string;
}
