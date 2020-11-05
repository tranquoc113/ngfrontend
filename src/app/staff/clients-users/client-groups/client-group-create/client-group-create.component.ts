import { Component, OnDestroy, OnInit } from '@angular/core';
import { DetailsBase } from '@objects-view/details-base';
import { IClientGroupModel } from '@fleio-api/client-user/model/client-group.model';
import { ActivatedRoute } from '@angular/router';
import { ClientGroupListUiService } from '../client-group-list-ui.service';

@Component({
  selector: 'app-client-group-create',
  templateUrl: './client-group-create.component.html',
  styleUrls: ['./client-group-create.component.scss']
})
export class ClientGroupCreateComponent extends DetailsBase<IClientGroupModel> implements OnInit, OnDestroy {

  constructor(route: ActivatedRoute, clientGroupListUiService: ClientGroupListUiService) {
    super(route, clientGroupListUiService, 'create', null);
  }
}
