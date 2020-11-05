import { Component, OnInit } from '@angular/core';
import { DetailsBase } from '../../../../shared/ui/objects-view/details-base';
import { IClientModel } from '../../../../shared/fleio-api/client-user/model/client.model';
import { ActivatedRoute } from '@angular/router';
import { ClientListUIService } from '../client-list-ui.service';

@Component({
  selector: 'app-client-send-mass-email',
  templateUrl: './client-send-mass-email.component.html',
  styleUrls: ['./client-send-mass-email.component.scss']
})
export class ClientSendMassEmailComponent extends DetailsBase<IClientModel> {
  constructor(route: ActivatedRoute, clientListUIService: ClientListUIService) {
    super(route, clientListUIService, 'send-mass-email', null);
  }
}
