import { Component } from '@angular/core';
import { ListBase } from '@objects-view/list-base';
import { ActivatedRoute } from '@angular/router';
import { RefreshService } from '@shared/ui-api/refresh.service';
import { IServerGroupModel } from '@fleio-api/servers/model/server-group.model';
import { ServerGroupListUiService } from '../server-group-list-ui.service';

@Component({
  selector: 'app-server-group-list',
  templateUrl: './server-group-list.component.html',
  styleUrls: ['./server-group-list.component.scss']
})
export class ServerGroupListComponent extends ListBase<IServerGroupModel> {

  constructor(
    private route: ActivatedRoute, private serverGroupListUiService: ServerGroupListUiService,
    private refreshService: RefreshService,
  ) {
    super(route, serverGroupListUiService, refreshService, 'serverGroups');
  }
}
