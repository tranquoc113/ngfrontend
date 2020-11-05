import { Component } from '@angular/core';
import { DetailsBase } from '../../../../shared/ui/objects-view/details-base';
import { IClientModel } from '../../../../shared/fleio-api/client-user/model/client.model';
import { ActivatedRoute } from '@angular/router';
import { ClientListUIService } from '../client-list-ui.service';

@Component({
  selector: 'app-client-edit',
  templateUrl: './client-edit.component.html',
  styleUrls: ['./client-edit.component.scss']
})
export class ClientEditComponent extends DetailsBase<IClientModel> {
  constructor(route: ActivatedRoute, clientListUIService: ClientListUIService) {
    super(route, clientListUIService, 'edit', 'client', ['createOptions']);
  }
}
