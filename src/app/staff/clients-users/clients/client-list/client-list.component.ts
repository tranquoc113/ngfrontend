import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RefreshService } from '../../../../shared/ui-api/refresh.service';
import { ClientListUIService } from '../client-list-ui.service';
import { ListBase } from '../../../../shared/ui/objects-view/list-base';
import { IClientModel } from '../../../../shared/fleio-api/client-user/model/client.model';

@Component({
  selector: 'app-client-list',
  templateUrl: './client-list.component.html',
  styleUrls: ['./client-list.component.scss']
})
export class ClientListComponent extends ListBase<IClientModel> implements OnInit {
  constructor(
    private route: ActivatedRoute, private clientListUIService: ClientListUIService,
    private refreshService: RefreshService,
  ) {
    super(route, clientListUIService, refreshService, 'clients');
  }

  ngOnInit() {
    super.ngOnInit();
  }
}
