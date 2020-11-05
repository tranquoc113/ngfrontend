import { Component, OnInit } from '@angular/core';
import { IPluginComponent } from '../../../../shared/plugins/interfaces/plugin-component';
import { IPluginNotificationCountModel } from '../../../../shared/fleio-api/core/model/plugin-notification-count.model';
import { ConfigService } from '../../../../shared/config/config.service';
import { OrderingService } from '../../../../shared/ui-api/ordering.service';
import { FilteringService } from '../../../../shared/ui-api/filtering.service';

@Component({
  selector: 'app-plugin-notifications',
  templateUrl: './tickets-plugin-notifications.component.html',
  styleUrls: ['./tickets-plugin-notifications.component.scss']
})
export class TicketsPluginNotificationsComponent implements OnInit, IPluginComponent {
  constructor(public config: ConfigService, private orderingService: OrderingService,
              private filteringService: FilteringService) {
  }
  ticketsQP = {};

  public data: IPluginNotificationCountModel;

  ngOnInit(): void {
    this.ticketsQP = this.orderingService.getQueryParams('plugins/tickets');
    this.ticketsQP = this.filteringService.updateQueryParams('plugins/tickets', this.ticketsQP);
  }
}
