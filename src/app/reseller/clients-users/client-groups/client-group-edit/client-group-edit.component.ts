import { Component, OnInit } from '@angular/core';
import { DetailsBase } from '../../../../shared/ui/objects-view/details-base';
import { IClientGroupModel } from '../../../../shared/fleio-api/client-user/model/client-group.model';
import { ActivatedRoute } from '@angular/router';
import { ClientGroupListUIService } from '../client-group-list-ui.service';

@Component({
  selector: 'app-client-group-edit',
  templateUrl: './client-group-edit.component.html',
  styleUrls: ['./client-group-edit.component.scss']
})
export class ClientGroupEditComponent extends DetailsBase<IClientGroupModel> implements OnInit {

  constructor(private activatedRoute: ActivatedRoute, clientGroupListUIService: ClientGroupListUIService) {
    super(activatedRoute, clientGroupListUIService, 'edit', 'clientGroup');
  }

  ngOnInit() {
    super.ngOnInit();
  }

}
