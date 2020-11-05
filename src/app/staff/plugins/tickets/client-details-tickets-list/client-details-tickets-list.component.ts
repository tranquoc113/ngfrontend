import { Component, OnInit } from '@angular/core';
import { ConfigService } from '../../../../shared/config/config.service';
import { IPluginComponent } from '../../../../shared/plugins/interfaces/plugin-component';
import { FleioId } from '../../../../shared/fleio-api/base-model/base-fleio-object.model';
import { TicketsApiService } from '../../../../shared/fleio-api/plugins/tickets/tickets-api.service';
import { ITicketModel } from '../../../../shared/fleio-api/plugins/tickets/model/ticket.model';
import { LineDirection, LineType } from 'src/app/shared/ui/objects-view/status-line/status-line.component';
import { AppColor } from '../../../../shared/ui/common/enums/app-color.enum';
import { TicketUiService } from '../ticket-ui.service';
import { LineColorPipe } from '../../../../shared/ui/objects-view/status-line/line-color.pipe';

@Component({
  selector: 'app-client-details-tickets-list',
  templateUrl: './client-details-tickets-list.component.html',
  styleUrls: ['./client-details-tickets-list.component.scss']
})
export class ClientDetailsTicketsListComponent implements OnInit, IPluginComponent {
  tickets: Array<ITicketModel>;
  public data: {
    clientId: FleioId;
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
  ) {
    this.lineColorPipe = new LineColorPipe();
  }

  changePage(action: string) {
    if (action === 'next') {
      this.currentPage = this.currentPage + 1;
      this.getClientRelatedTickets(this.currentPage);
    }
    if (action === 'previous') {
      this.currentPage = this.currentPage - 1;
      this.getClientRelatedTickets(this.currentPage);
    }
  };

  getClientRelatedTickets(page: number) {
    if (this.data) {
      this.loading = true;
      this.ticketsApiService.getClientRelatedTickets(this.data.clientId, page).subscribe(response => {
        this.tickets = response.objects;
        for (const ticket of this.tickets) {
          ticket.appLineColor = this.lineColorPipe.transform(TicketUiService.getTicketStatus(ticket).value);
        }
        this.nextPage = !!response.next;
        this.previousPage = !!response.previous;
        this.loading = false;
      });
    }
  }

  ngOnInit() {
    this.getClientRelatedTickets(this.currentPage);
  }

}
