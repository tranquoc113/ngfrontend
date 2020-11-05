import { ITemplateLanguageModel } from './template-language.model';

export interface INotificationTemplateCreateOptionsModel {
  languages: ITemplateLanguageModel[];
  help_text_map: {
    [notificationType: string]: {
      variables: string[];
      detail: string;
    }
  };
}
