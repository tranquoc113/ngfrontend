import { Component, OnInit } from '@angular/core';
import { IPluginComponent } from '../../../../shared/plugins/interfaces/plugin-component';
import { IPluginNotificationCountModel } from '../../../../shared/fleio-api/core/model/plugin-notification-count.model';
import { ConfigService } from '../../../../shared/config/config.service';
import { OrderingService } from '../../../../shared/ui-api/ordering.service';
import { FilteringService } from '../../../../shared/ui-api/filtering.service';

@Component({
  selector: 'app-plugin-notifications',
  templateUrl: './todo-plugin-notifications.component.html',
  styleUrls: ['./todo-plugin-notifications.component.scss']
})
export class TodoPluginNotificationsComponent implements OnInit, IPluginComponent {
  constructor(public config: ConfigService, private orderingService: OrderingService,
              private filteringService: FilteringService) {
  }
  todoQP = {};

  public data: IPluginNotificationCountModel;

  ngOnInit(): void {
    this.todoQP = this.orderingService.getQueryParams('plugins/todo');
    this.todoQP = this.filteringService.updateQueryParams('plugins/todo', this.todoQP);
  }
}
