import { Component } from '@angular/core';
import { DetailsBase } from '../../../../../shared/ui/objects-view/details-base';
import { ActivatedRoute } from '@angular/router';
import { UserProfileListUiService } from '../user-profile-list-ui.service';
import { IUserProfileModel } from '../../../../../shared/fleio-api/profile/model/user-profile.model';

@Component({
  selector: 'app-user-profile-edit',
  templateUrl: './user-profile-edit.component.html',
  styleUrls: ['./user-profile-edit.component.scss']
})
export class UserProfileEditComponent extends DetailsBase<IUserProfileModel> {
  constructor(route: ActivatedRoute, userProfileListUiService: UserProfileListUiService) {
    super(route, userProfileListUiService, 'edit', 'userProfile');
  }
}
