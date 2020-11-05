import { Component, OnInit, Optional } from '@angular/core';
import { PanelLayoutComponent } from '../../../../layout/panel-layout/panel-layout.component';
import { DetailsComponentBase } from '../../../../ui/objects-view/details-component-base';
import { IClientModel } from '../../../../fleio-api/client-user/model/client.model';

@Component({
  selector: 'app-client-details-tickets',
  templateUrl: './client-details-tickets.component.html',
  styleUrls: ['./client-details-tickets.component.scss']
})
export class ClientDetailsTicketsComponent extends DetailsComponentBase<IClientModel> implements OnInit {

  constructor(
    @Optional() public panelLayout?: PanelLayoutComponent
  ) {
    super();
  }

  ngOnInit() {
  }

}
