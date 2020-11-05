export interface ITicketCreateOptionsModel {
  statuses: {
    [key: string]: string;
  };
  internal_statuses: {
    [key: string]: string;
  };
  priorities: {
    [key: string]: string;
  };
  MAX_TICKET_ATTACHMENT_SIZE: number;
  user_signature: string;
}
