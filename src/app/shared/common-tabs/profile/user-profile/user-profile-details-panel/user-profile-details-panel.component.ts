import { Component, OnInit, Optional } from '@angular/core';
import { DetailsFormBase } from '../../../../ui/objects-view/details-form-base';
import { IUserProfileModel } from '../../../../fleio-api/profile/model/user-profile.model';
import { ConfigService } from '../../../../config/config.service';
import { AuthService } from '../../../../auth/auth.service';
import { PanelLayoutComponent } from '../../../../layout/panel-layout/panel-layout.component';
import { ThemingService } from '../../../../ui/theming/theming.service';

@Component({
  selector: 'app-user-profile-details-panel',
  templateUrl: './user-profile-details-panel.component.html',
  styleUrls: ['./user-profile-details-panel.component.scss']
})
export class UserProfileDetailsPanelComponent extends DetailsFormBase<IUserProfileModel> implements OnInit {

  constructor(public authService: AuthService, public config: ConfigService, public themingService: ThemingService,
              @Optional() public panelLayout?: PanelLayoutComponent) {
    super();
  }

  ngOnInit(): void {
  }

}
