import { Component, OnInit, Optional } from '@angular/core';
import { DetailsComponentBase } from '../../../../ui/objects-view/details-component-base';
import { PanelLayoutComponent } from '../../../../layout/panel-layout/panel-layout.component';
import { IUserModel } from '../../../../fleio-api/client-user/model/user.model';

@Component({
  selector: 'app-user-details-tickets',
  templateUrl: './user-details-tickets.component.html',
  styleUrls: ['./user-details-tickets.component.scss']
})
export class UserDetailsTicketsComponent extends DetailsComponentBase<IUserModel> implements OnInit {

  constructor(
    @Optional() public panelLayout?: PanelLayoutComponent
  ) {
    super();
  }

  ngOnInit() {
  }

}
