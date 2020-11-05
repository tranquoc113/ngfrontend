import { Component, OnInit } from '@angular/core';
import { IObjectController } from '../../../../shared/ui/objects-view/interfaces/object-controller';
import { UsersAuthorizationComponent } from '../tabs/users-authorization/users-authorization.component';
import { UserGroupsAuthorizationComponent } from '../tabs/user-groups-authorization/user-groups-authorization.component';
import { StaticObjectController } from '../../../../shared/ui/objects-view/static-object-controller';

@Component({
  selector: 'app-authorization-edit',
  templateUrl: './authorization-edit.component.html',
  styleUrls: ['./authorization-edit.component.scss']
})
export class AuthorizationEditComponent implements OnInit {

  public objectController: IObjectController = new StaticObjectController({
    header: {
      title: {
        text: 'Authorization settings',
      }
    },
    tabs: [
      {
        tabName: 'Users',
        component: UsersAuthorizationComponent,
      },
      {
        tabName: 'User groups',
        component: UserGroupsAuthorizationComponent,
      }
    ],
  });

  constructor() { }

  ngOnInit(): void {
  }

}
