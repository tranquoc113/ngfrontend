import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ClientListUIService } from '../client-list-ui.service';
import { DetailsBase } from '../../../../shared/ui/objects-view/details-base';
import { IClientModel } from '../../../../shared/fleio-api/client-user/model/client.model';

@Component({
  selector: 'app-client-details',
  templateUrl: './client-details.component.html',
  styleUrls: ['./client-details.component.scss']
})
export class ClientDetailsComponent extends DetailsBase<IClientModel> {
  constructor(route: ActivatedRoute, clientListUIService: ClientListUIService) {
    super(route, clientListUIService, 'details', 'client');
  }
}
