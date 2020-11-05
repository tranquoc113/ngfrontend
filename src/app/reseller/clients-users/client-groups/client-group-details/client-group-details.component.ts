import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ClientGroupListUIService } from '../client-group-list-ui.service';
import { DetailsBase } from '../../../../shared/ui/objects-view/details-base';
import { IClientGroupModel } from '../../../../shared/fleio-api/client-user/model/client-group.model';

@Component({
  selector: 'app-client-group-details',
  templateUrl: './client-group-details.component.html',
  styleUrls: ['./client-group-details.component.scss']
})
export class ClientGroupDetailsComponent extends DetailsBase<IClientGroupModel> implements OnInit {
  constructor(private activatedRoute: ActivatedRoute, private clientGroupListUIService: ClientGroupListUIService) {
    super(activatedRoute, clientGroupListUIService, 'details', 'clientGroup');
  }

  ngOnInit() {
    super.ngOnInit();
  }
}
