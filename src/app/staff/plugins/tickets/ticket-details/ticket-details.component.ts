import { Component } from '@angular/core';
import { DetailsBase } from '@objects-view/details-base';
import { ActivatedRoute } from '@angular/router';
import { ITicketModel } from '@fleio-api/plugins/tickets/model/ticket.model';
import { TicketsListUiService } from '../tickets-list-ui.service';

@Component({
  selector: 'app-ticket-details',
  templateUrl: './ticket-details.component.html',
  styleUrls: ['./ticket-details.component.scss']
})
export class TicketDetailsComponent extends DetailsBase<ITicketModel> {
  constructor(route: ActivatedRoute, ticketsListUiService: TicketsListUiService) {
    super(route, ticketsListUiService, 'details', 'ticket', ['createOptions']);
  }
}
