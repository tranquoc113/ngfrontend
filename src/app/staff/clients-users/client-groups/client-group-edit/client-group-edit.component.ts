import { Component, OnDestroy, OnInit } from '@angular/core';
import { DetailsBase } from '@objects-view/details-base';
import { ActivatedRoute } from '@angular/router';
import { ClientGroupListUiService } from '../client-group-list-ui.service';
import { IClientGroupModel } from '@fleio-api/client-user/model/client-group.model';

@Component({
  selector: 'app-client-group-edit',
  templateUrl: './client-group-edit.component.html',
  styleUrls: ['./client-group-edit.component.scss']
})
export class ClientGroupEditComponent extends DetailsBase<IClientGroupModel> implements OnInit, OnDestroy {

  constructor(route: ActivatedRoute, clientGroupListUiService: ClientGroupListUiService) {
    super(route, clientGroupListUiService, 'edit', 'clientGroup');
  }
}
