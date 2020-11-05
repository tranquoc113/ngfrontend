import { Component, OnDestroy, OnInit } from '@angular/core';
import { DetailsBase } from '../../../../shared/ui/objects-view/details-base';
import { ActivatedRoute } from '@angular/router';
import { IServerGroupModel } from '../../../../shared/fleio-api/servers/model/server-group.model';
import { ServerGroupListUiService } from '../server-group-list-ui.service';

@Component({
  selector: 'app-server-group-edit',
  templateUrl: './server-group-edit.component.html',
  styleUrls: ['./server-group-edit.component.scss']
})
export class ServerGroupEditComponent extends DetailsBase<IServerGroupModel> implements OnInit, OnDestroy {

  constructor(route: ActivatedRoute, serverGroupListUiService: ServerGroupListUiService) {
    super(route, serverGroupListUiService, 'edit', 'serverGroup');
  }
}
