import { Component, OnInit } from '@angular/core';
import { IPluginComponent } from '../../../../shared/plugins/interfaces/plugin-component';
import { ITicketModel } from '../../../../shared/fleio-api/plugins/tickets/model/ticket.model';
import { FleioId } from '../../../../shared/fleio-api/base-model/base-fleio-object.model';
import { ConfigService } from '../../../../shared/config/config.service';
import { TicketsApiService } from '../../../../shared/fleio-api/plugins/tickets/tickets-api.service';
import { NotificationService } from '../../../../shared/ui-api/notification.service';
import { LineColorPipe } from '../../../../shared/ui/objects-view/status-line/line-color.pipe';
import { TicketUiService } from '../ticket-ui.service';
import { LineDirection, LineType } from 'src/app/shared/ui/objects-view/status-line/status-line.component';

@Component({
  selector: 'app-user-details-tickets-list',
  templateUrl: './user-details-tickets-list.component.html',
  styleUrls: ['./user-details-tickets-list.component.scss']
})
export class UserDetailsTicketsListComponent implements OnInit, IPluginComponent {
  tickets: Array<ITicketModel>;
  public data: {
    userId: FleioId;
  };
  displayedColumns = ['id', 'title', 'created_at'];
  currentPage = 1;
  nextPage = false;
  previousPage = false;
  loading = false;
  public LineDirection = LineDirection;
  public LineType = LineType;
  private lineColorPipe: LineColorPipe;

  constructor(
    public config: ConfigService,
    private ticketsApiService: TicketsApiService,
    private notificationService: NotificationService,
  ) {
    this.lineColorPipe = new LineColorPipe();
  }

  changePage(action: string) {
    if (action === 'next') {
      this.currentPage = this.currentPage + 1;
      this.getUserRelatedTickets(this.currentPage);
    }
    if (action === 'previous') {
      this.currentPage = this.currentPage - 1;
      this.getUserRelatedTickets(this.currentPage);
    }
  };

  getUserRelatedTickets(page: number) {
    if (this.data) {
      this.loading = true;
      this.ticketsApiService.getUserRelatedTickets(this.data.userId, page).subscribe(response => {
        this.tickets = response.objects;
        for (const ticket of this.tickets) {
          ticket.appLineColor = this.lineColorPipe.transform(TicketUiService.getTicketStatus(ticket).value);
        }
        this.nextPage = !!response.next;
        this.previousPage = !!response.previous;
        this.loading = false;
      }, error => {
        this.loading = false;
        this.notificationService.showMessage('Could not load tickets');
      });
    }
  }

  ngOnInit() {
    this.getUserRelatedTickets(this.currentPage);
  }

}
