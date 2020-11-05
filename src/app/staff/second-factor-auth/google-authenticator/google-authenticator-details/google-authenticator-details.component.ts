import { Component, OnInit } from '@angular/core';
import { IObjectController } from '@objects-view/interfaces/object-controller';
import { StaticObjectController } from '@objects-view/static-object-controller';
import { GoogleAuthenticatorDetailsComponent as OverviewComponent } from '@shared/common-tabs/second-factor-authentication/google-authenticator/google-authenticator-details/google-authenticator-details.component';


@Component({
  selector: 'app-google-authenticator-details',
  templateUrl: './google-authenticator-details.component.html',
  styleUrls: ['./google-authenticator-details.component.scss']
})
export class GoogleAuthenticatorDetailsComponent implements OnInit {
  public objectController: IObjectController = new StaticObjectController({
    header: {
      title: {
        text: 'Google authenticator',
      }
    },
    tabs: [
      {
        tabName: 'Google authenticator',
        component: OverviewComponent,
      },
    ],
  });

  constructor() { }

  ngOnInit(): void {
  }

}
