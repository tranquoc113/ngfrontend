import { Component } from '@angular/core';
import { DetailsBase } from '../../../../../shared/ui/objects-view/details-base';
import { IUserProfileModel } from '../../../../../shared/fleio-api/profile/model/user-profile.model';
import { ActivatedRoute } from '@angular/router';
import { UserProfileListUiService } from '../user-profile-list-ui.service';

@Component({
  selector: 'app-user-profile-details',
  templateUrl: './user-profile-details.component.html',
  styleUrls: ['./user-profile-details.component.scss']
})
export class UserProfileDetailsComponent extends DetailsBase<IUserProfileModel> {
  constructor(route: ActivatedRoute, userProfileListUiService: UserProfileListUiService) {
    super(route, userProfileListUiService, 'details', 'userProfile');
  }
}
