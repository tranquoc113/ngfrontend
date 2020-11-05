import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FleioApiService } from '../fleio-api.service';
import { ConfigService } from '../../config/config.service';
import { INotificationTemplateModel } from './model/notification-template.model';
import { FleioId } from '../base-model/base-fleio-object.model';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class NotificationTemplatesApiService extends FleioApiService<INotificationTemplateModel> {
  constructor(protected httpClient: HttpClient, protected config: ConfigService) {
    super();
    this.setEndpoint(config.getPanelApiUrl('notification_templates'));
  }

  getEditableNotificationTemplate(templateId: FleioId): Observable<INotificationTemplateModel[]> {
    return this.getAction('get_editable_notification_templates', {template_id: templateId});
  }

  createTemplate(templateName: string, languageCode: string): Observable<any> {
    return this.postAction(null, {
      language: languageCode,
      name: templateName,
    })
  }

  updateTemplatesSet(templatesSet: INotificationTemplateModel[]): Observable<any> {
    return this.postAction('update_templates_set', templatesSet);
  }
}
