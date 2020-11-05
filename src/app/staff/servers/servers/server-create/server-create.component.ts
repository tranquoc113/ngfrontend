import { Component, OnDestroy, OnInit } from '@angular/core';
import { DetailsBase } from '../../../../shared/ui/objects-view/details-base';
import { ActivatedRoute } from '@angular/router';
import { IServerModel } from '../../../../shared/fleio-api/servers/model/server.model';
import { ServerListUiService } from '../server-list-ui.service';

@Component({
  selector: 'app-server-create',
  templateUrl: './server-create.component.html',
  styleUrls: ['./server-create.component.scss']
})
export class ServerCreateComponent extends DetailsBase<IServerModel> implements OnInit, OnDestroy {

  constructor(route: ActivatedRoute, serverListUiService: ServerListUiService) {
    super(route, serverListUiService, 'create', null, ['createOptions']);
  }
}
