import { INotificationTemplateModel } from './notification-template.model';
import { ISignupSettingsModel } from './signup-settings.model';

export interface ISignupInfoModel {
  notification_templates: INotificationTemplateModel[];
  signup_settings: ISignupSettingsModel;
}
