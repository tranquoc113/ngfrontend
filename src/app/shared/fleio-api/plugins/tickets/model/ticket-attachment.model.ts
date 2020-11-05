import { FleioId, IBaseFleioObjectModel } from '../../../base-model/base-fleio-object.model';

export interface ITicketAttachmentModel extends IBaseFleioObjectModel {
  content_type: string;
  disk_file: string;
  email_message: string;
  file_name: string;
  id: FleioId;
  ticket_note: FleioId;
  ticket_update: FleioId;
}
