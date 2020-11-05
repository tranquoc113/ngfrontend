import { Component } from '@angular/core';
import { ListBase } from '../../../../shared/ui/objects-view/list-base';
import { ActivatedRoute } from '@angular/router';
import { RefreshService } from '../../../../shared/ui-api/refresh.service';
import { IServerModel } from '../../../../shared/fleio-api/servers/model/server.model';
import { ServerListUiService } from '../server-list-ui.service';

@Component({
  selector: 'app-server-list',
  templateUrl: './server-list.component.html',
  styleUrls: ['./server-list.component.scss']
})
export class ServerListComponent extends ListBase<IServerModel> {

  constructor(
    private route: ActivatedRoute, private serverListUiService: ServerListUiService,
    private refreshService: RefreshService,
  ) {
    super(route, serverListUiService, refreshService, 'servers');
  }
}
