import { Component, OnInit } from '@angular/core';
import { DetailsBase } from '@objects-view/details-base';
import { ITicketModel } from '@fleio-api/plugins/tickets/model/ticket.model';
import { ActivatedRoute } from '@angular/router';
import { TicketsListUiService } from '../tickets-list-ui.service';

@Component({
  selector: 'app-ticket-edit',
  templateUrl: './ticket-edit.component.html',
  styleUrls: ['./ticket-edit.component.scss']
})
export class TicketEditComponent extends DetailsBase<ITicketModel> {
  constructor(route: ActivatedRoute, ticketsListUiService: TicketsListUiService) {
    super(route, ticketsListUiService, 'edit', 'ticket', ['createOptions']);
  }
}
