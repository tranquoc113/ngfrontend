export interface IDepartmentCreateOptionsModel {
  notifications: Array<{
    [notificationName: string]: boolean
  }>;
  ticket_id_default_format: string;
}
