import { Component } from '@angular/core';
import { DetailsBase } from '../../../../shared/ui/objects-view/details-base';
import { ActivatedRoute } from '@angular/router';
import { ITicketModel } from '../../../../shared/fleio-api/plugins/tickets/model/ticket.model';
import { TicketsListUiService } from '../tickets-list-ui.service';

@Component({
  selector: 'app-tickets-open-new',
  templateUrl: './tickets-open-new.component.html',
  styleUrls: ['./tickets-open-new.component.scss']
})
export class TicketsOpenNewComponent extends DetailsBase<ITicketModel> {
  constructor(route: ActivatedRoute, ticketsListUiService: TicketsListUiService) {
    super(route, ticketsListUiService, 'open-new-ticket', null);
  }
}
