import { Component, OnInit, Optional } from '@angular/core';
import { PanelLayoutComponent } from '@shared/layout/panel-layout/panel-layout.component';

@Component({
  selector: 'app-sms-authenticator-details',
  templateUrl: './sms-authenticator-details.component.html',
  styleUrls: ['./sms-authenticator-details.component.scss']
})
export class SmsAuthenticatorDetailsComponent implements OnInit {

  constructor(@Optional() public panelLayout?: PanelLayoutComponent) { }

  ngOnInit(): void {
  }

}
