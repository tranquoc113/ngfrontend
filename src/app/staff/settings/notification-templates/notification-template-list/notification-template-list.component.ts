import { Component, OnInit } from '@angular/core';
import { ListBase } from '../../../../shared/ui/objects-view/list-base';
import { ActivatedRoute } from '@angular/router';
import { RefreshService } from '../../../../shared/ui-api/refresh.service';
import { INotificationTemplateModel } from '../../../../shared/fleio-api/notification-templates/model/notification-template.model';
import { NotificationTemplateListUIService } from '../notification-template-list-ui.service';

@Component({
  selector: 'app-notification-template-list',
  templateUrl: './notification-template-list.component.html',
  styleUrls: ['./notification-template-list.component.scss']
})
export class NotificationTemplateListComponent extends ListBase<INotificationTemplateModel> implements OnInit {

  constructor(
    private route: ActivatedRoute, private notificationTemplateListUIService: NotificationTemplateListUIService,
    private refreshService: RefreshService,
  ) {
    super(route, notificationTemplateListUIService, refreshService, 'notificationTemplates');
  }

  ngOnInit() {
    super.ngOnInit();
  }

}
