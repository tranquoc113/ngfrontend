import { Component, OnInit } from '@angular/core';
import { ListBase } from '../../../../shared/ui/objects-view/list-base';
import { ActivatedRoute } from '@angular/router';
import { RefreshService } from '../../../../shared/ui-api/refresh.service';
import { ITicketModel } from '../../../../shared/fleio-api/plugins/tickets/model/ticket.model';
import { TicketsListUiService } from '../tickets-list-ui.service';

@Component({
  selector: 'app-tickets-list',
  templateUrl: './tickets-list.component.html',
  styleUrls: ['./tickets-list.component.scss']
})
export class TicketsListComponent extends ListBase<ITicketModel> implements OnInit {
  constructor(
    private route: ActivatedRoute, private ticketsListUiService: TicketsListUiService,
    private refreshService: RefreshService,
  ) {
    super(route, ticketsListUiService, refreshService, 'tickets');
  }

  ngOnInit() {
    super.ngOnInit();
  }
}
