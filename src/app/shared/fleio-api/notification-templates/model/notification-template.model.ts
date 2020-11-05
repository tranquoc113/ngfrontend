import { IBaseFleioObjectModel } from '../../base-model/base-fleio-object.model';

export interface INotificationTemplateModel extends IBaseFleioObjectModel {
  id: number | string;
  name: string;
  content: string;
  title: string;
  category: number;
  category_display: string;
  language: string;
  template_languages: string[];
  language_display: string;
  has_all_available_languages: boolean;
  disable_notification: boolean;
}
