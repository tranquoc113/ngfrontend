import { Component, OnInit, Optional } from '@angular/core';
import { PanelLayoutComponent } from '@shared/layout/panel-layout/panel-layout.component';

@Component({
  selector: 'app-google-authenticator-details',
  templateUrl: './google-authenticator-details.component.html',
  styleUrls: ['./google-authenticator-details.component.scss']
})
export class GoogleAuthenticatorDetailsComponent implements OnInit {

  constructor(@Optional() public panelLayout?: PanelLayoutComponent) { }

  ngOnInit(): void {
  }

}
