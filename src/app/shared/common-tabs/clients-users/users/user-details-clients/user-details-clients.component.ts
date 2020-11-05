import { Component, OnInit } from '@angular/core';
import { DetailsComponentBase } from '../../../../ui/objects-view/details-component-base';
import { IUserModel } from '../../../../fleio-api/client-user/model/user.model';
import { ConfigService } from '../../../../config/config.service';

@Component({
  selector: 'app-user-details-clients',
  templateUrl: './user-details-clients.component.html',
  styleUrls: ['./user-details-clients.component.scss']
})
export class UserDetailsClientsComponent extends DetailsComponentBase<IUserModel> {
  displayedColumns: string[] = ['id', 'name'];

  constructor(
    public config: ConfigService,
  ) {
    super();
  }
}
