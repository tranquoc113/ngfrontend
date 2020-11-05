import { IBaseFleioObjectModel } from '../../../base-model/base-fleio-object.model';

export interface ITicketDepartmentModel extends IBaseFleioObjectModel {
  created_at: Date;
  name: string;
  email: string;
  ticket_id_format: string;
  notification_on_ticket_open_to_staff: boolean;
  notification_on_staff_user_reply_to_staff: boolean;
  notification_on_user_reply_to_staff: boolean;
  notification_to_user_on_ticket_opened: boolean;
  notification_to_user_on_ticket_closed: boolean;
  notification_on_staff_user_reply_to_user: boolean;
  notify_cc_recipients_on_ticket_open: boolean;
  notify_cc_recipients_on_ticket_close: boolean;
  notify_cc_recipients_on_ticket_reply: boolean;
}
