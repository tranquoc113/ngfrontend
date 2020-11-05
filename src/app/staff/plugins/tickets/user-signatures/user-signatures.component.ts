import { Component, OnInit } from '@angular/core';
import { DetailsBase } from '@objects-view/details-base';
import { ITicketModel } from '@fleio-api/plugins/tickets/model/ticket.model';
import { ActivatedRoute } from '@angular/router';
import { TicketsListUiService } from '../tickets-list-ui.service';

@Component({
  selector: 'app-user-signatures',
  templateUrl: './user-signatures.component.html',
  styleUrls: ['./user-signatures.component.scss']
})
export class UserSignaturesComponent extends DetailsBase<ITicketModel> {
  constructor(route: ActivatedRoute, ticketsListUiService: TicketsListUiService) {
    super(route, ticketsListUiService, 'user-signatures', 'signatures');
  }
}
