import { Component, OnInit } from '@angular/core';
import { DetailsBase } from '../../../../shared/ui/objects-view/details-base';
import { ActivatedRoute } from '@angular/router';
import { INotificationTemplateModel } from '../../../../shared/fleio-api/notification-templates/model/notification-template.model';
import { NotificationTemplateListUIService } from '../notification-template-list-ui.service';

@Component({
  selector: 'app-notification-template-edit',
  templateUrl: './notification-template-edit.component.html',
  styleUrls: ['./notification-template-edit.component.scss']
})
export class NotificationTemplateEditComponent extends DetailsBase<INotificationTemplateModel> {
  constructor(route: ActivatedRoute, notificationTemplateListUIService: NotificationTemplateListUIService) {
    super(route, notificationTemplateListUIService, 'edit', 'notificationTemplate');
  }
}
