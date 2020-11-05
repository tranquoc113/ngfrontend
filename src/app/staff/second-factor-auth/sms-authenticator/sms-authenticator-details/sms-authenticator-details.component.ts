import { Component, OnInit } from '@angular/core';
import { IObjectController } from '@objects-view/interfaces/object-controller';
import { StaticObjectController } from '@objects-view/static-object-controller';
import { SmsAuthenticatorDetailsComponent as OverviewComponent } from '@shared/common-tabs/second-factor-authentication/sms-authenticator/sms-authenticator-details/sms-authenticator-details.component';

@Component({
  selector: 'app-sms-authenticator-details',
  templateUrl: './sms-authenticator-details.component.html',
  styleUrls: ['./sms-authenticator-details.component.scss']
})
export class SmsAuthenticatorDetailsComponent implements OnInit {
  public objectController: IObjectController = new StaticObjectController({
    header: {
      title: {
        text: 'SMS authenticator',
      }
    },
    tabs: [
      {
        tabName: 'SMS authenticator',
        component: OverviewComponent,
      },
    ],
  });

  constructor() { }

  ngOnInit(): void {
  }

}
