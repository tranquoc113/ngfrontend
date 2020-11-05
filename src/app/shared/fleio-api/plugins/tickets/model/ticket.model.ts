import { IBaseFleioObjectModel } from '../../../base-model/base-fleio-object.model';
import { IUserModel } from '../../../client-user/model/user.model';
import { IServiceModel } from '../../../billing/model/service.model';
import { ITicketAttachmentModel } from './ticket-attachment.model';
import { ITicketReplyModel } from './ticket-reply.model';
import { AppColor } from '../../../../ui/common/enums/app-color.enum';

export interface ITicketModel extends IBaseFleioObjectModel {
  created_at: Date;
  last_reply_at: Date;
  created_by: IUserModel;
  created_by_display: string;
  client: number;
  client_display: string;
  assigned_to: IUserModel;
  assigned_to_display: string;
  title: string;
  description: string;
  department: number;
  department_display: string;
  priority: string;
  priority_display: string;
  status: string;
  status_display: string;
  internal_status: string;
  internal_status_display: string;
  cc_recipients: string;
  linked_tickets: Array<string>;
  created_by_email: string;
  service: IServiceModel;
  main_attachments: Array<ITicketAttachmentModel>;
  replies_and_notes: Array<ITicketReplyModel>;
  unread: boolean;
  is_staff_generated: boolean;
  ticket_owner_email: string;
  ticket_activity: boolean;
  appLineColor?: AppColor;
}
