import { Component, OnInit, Optional } from '@angular/core';
import { DetailsComponentBase } from '../../../../ui/objects-view/details-component-base';
import { IClientModel } from '../../../../fleio-api/client-user/model/client.model';
import { PanelLayoutComponent } from '../../../../layout/panel-layout/panel-layout.component';

@Component({
  selector: 'app-client-details-domains',
  templateUrl: './client-details-domains.component.html',
  styleUrls: ['./client-details-domains.component.scss']
})
export class ClientDetailsDomainsComponent extends DetailsComponentBase<IClientModel> implements OnInit {

  constructor(
    @Optional() public panelLayout?: PanelLayoutComponent
  ) {
    super();
  }

  ngOnInit() {
  }

}
