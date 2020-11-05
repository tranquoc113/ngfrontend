import { Component } from '@angular/core';
import { ListBase } from '@objects-view/list-base';
import { ActivatedRoute } from '@angular/router';
import { RefreshService } from '@shared/ui-api/refresh.service';
import { IClientGroupModel } from '@fleio-api/client-user/model/client-group.model';
import { ClientGroupListUiService } from '../client-group-list-ui.service';

@Component({
  selector: 'app-client-group-list',
  templateUrl: './client-group-list.component.html',
  styleUrls: ['./client-group-list.component.scss']
})
export class ClientGroupListComponent extends ListBase<IClientGroupModel> {

  constructor(
    private route: ActivatedRoute, private clientGroupListUiService: ClientGroupListUiService,
    private refreshService: RefreshService,
  ) {
    super(route, clientGroupListUiService, refreshService, 'clientGroups');
  }
}
