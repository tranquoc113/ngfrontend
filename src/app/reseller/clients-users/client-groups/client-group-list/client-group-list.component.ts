import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RefreshService } from '../../../../shared/ui-api/refresh.service';
import { ClientGroupListUIService } from '../client-group-list-ui.service';
import { ListBase } from '../../../../shared/ui/objects-view/list-base';
import { IClientGroupModel } from '../../../../shared/fleio-api/client-user/model/client-group.model';

@Component({
  selector: 'app-client-group-list',
  templateUrl: './client-group-list.component.html',
  styleUrls: ['./client-group-list.component.scss']
})
export class ClientGroupListComponent extends ListBase<IClientGroupModel> implements OnInit {

  constructor(
    private route: ActivatedRoute, private clientGroupListUIService: ClientGroupListUIService,
    private refreshService: RefreshService,
  ) {
    super(route, clientGroupListUIService, refreshService, 'clientGroups');
  }

  ngOnInit() {
    super.ngOnInit();
  }
}
