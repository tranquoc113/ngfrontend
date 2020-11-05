import { Component, OnInit } from '@angular/core';
import { IClientGroupModel } from '../../../../../shared/fleio-api/client-user/model/client-group.model';
import { DetailsComponentBase } from '../../../../../shared/ui/objects-view/details-component-base';

@Component({
  selector: 'app-client-group-details-overview',
  templateUrl: './client-group-details-overview.component.html',
  styleUrls: ['./client-group-details-overview.component.scss']
})
export class ClientGroupDetailsOverviewComponent extends DetailsComponentBase<IClientGroupModel> {
  constructor() {
    super();
  }
}
