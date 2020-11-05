import { Component } from '@angular/core';
import { DetailsBase } from '../../../../shared/ui/objects-view/details-base';
import { IClientModel } from '../../../../shared/fleio-api/client-user/model/client.model';
import { ActivatedRoute } from '@angular/router';
import { ClientListUIService } from '../client-list-ui.service';

@Component({
  selector: 'app-client-create',
  templateUrl: './client-create.component.html',
  styleUrls: ['./client-create.component.scss']
})
export class ClientCreateComponent extends DetailsBase<IClientModel> {
  constructor(route: ActivatedRoute, clientListUIService: ClientListUIService) {
    super(route, clientListUIService, 'create', null, ['createOptions']);
  }
}
