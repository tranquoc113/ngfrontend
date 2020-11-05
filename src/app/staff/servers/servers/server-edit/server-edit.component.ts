import { Component, OnDestroy, OnInit } from '@angular/core';
import { DetailsBase } from '../../../../shared/ui/objects-view/details-base';
import { IServerModel } from '../../../../shared/fleio-api/servers/model/server.model';
import { ActivatedRoute } from '@angular/router';
import { ServerListUiService } from '../server-list-ui.service';

@Component({
  selector: 'app-server-edit',
  templateUrl: './server-edit.component.html',
  styleUrls: ['./server-edit.component.scss']
})
export class ServerEditComponent extends DetailsBase<IServerModel> implements OnInit, OnDestroy {

  constructor(route: ActivatedRoute, serverListUiService: ServerListUiService) {
    super(route, serverListUiService, 'edit', 'server', ['createOptions']);
  }
}
