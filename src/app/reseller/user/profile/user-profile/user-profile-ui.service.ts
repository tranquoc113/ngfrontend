import { Router } from '@angular/router';
import { ConfigService } from '../../../../shared/config/config.service';
import { IPermissionsModel } from '../../../../shared/fleio-api/base-model/IPermissionsModel';
import { DatePipe } from '@angular/common';
import { UserProfileApiService } from '../../../../shared/fleio-api/profile/user-profile/user-profile-api.service';
import { IIcon } from '../../../../shared/ui/common/interfaces/icon';
import { IObjectStatus } from '../../../../shared/ui/objects-view/interfaces/object-status';
import { ITitle } from '../../../../shared/ui/objects-view/interfaces/card-data/card-title';
import { ObjectUIServiceBase } from '../../../../shared/ui/objects-view/object-ui-service-base';
import { IAction } from '../../../../shared/ui/objects-view/interfaces/actions/action';
import { IDataField } from '../../../../shared/ui/objects-view/interfaces/card-data/data-field';
import { IDetailsTab } from '../../../../shared/ui/objects-view/interfaces/details/details-tab';
import { IUserProfileModel } from '../../../../shared/fleio-api/profile/model/user-profile.model';
import { RouterLinkAction } from '../../../../shared/ui/objects-view/actions/router-link-action';
import { CallbackAction } from '../../../../shared/ui/objects-view/actions/callback-action';
import {
  UserProfileEditFormComponent
} from '../../../../shared/common-tabs/profile/user-profile/user-profile-edit-form/user-profile-edit-form.component';
import {
  UserProfileDetailsPanelComponent
} from '../../../../shared/common-tabs/profile/user-profile/user-profile-details-panel/user-profile-details-panel.component';

export class UserProfileUiService extends ObjectUIServiceBase<IUserProfileModel> {
  private readonly router: Router;
  private readonly config: ConfigService;
  private readonly userProfileApiService: UserProfileApiService;
  private readonly datePipe: DatePipe;


  constructor(
    userProfile: IUserProfileModel, permissions: IPermissionsModel, state: string,
    router: Router, config: ConfigService, userProfileApiService: UserProfileApiService
  ) {
    super(userProfile, permissions, state);
    this.router = router;
    this.config = config;
    this.userProfileApiService = userProfileApiService;
    this.datePipe = new DatePipe(this.config.locale);
  }

  getIcon(): IIcon {
    return null;
  }

  getStatus(): IObjectStatus {
    return null;
  }

  getTitle(): ITitle {
    switch (this.state) {
      case 'edit':
        return {
          text: `${this.object.user.username}`,
        };
      case 'details':
        return {
          text: 'My user profile'
        };

      default:
        return {
          text: `${this.object.user.username}`,
          subText: ``,
        };
    }
  }

  getActions(): IAction[] {
    return [];
  }

  getDetailsActions(): IAction[] {
    const actions = [];

    switch (this.state) {
      case 'edit':
        actions.push(new RouterLinkAction({
            name: 'Cancel',
            routerUrl: this.config.getPrevUrl(`user/profile`),
            router: this.router,
          }
        ));
        actions.push(new CallbackAction({name: 'Save'}));
        break;
      default:
        break;
    }

    return actions;
  }

  getCardFields(): IDataField[] {
    return [];
  }

  getTabs(): IDetailsTab[] {
    switch (this.state) {
      case 'edit':
        return [
          {
            tabName: 'Edit',
            component: UserProfileEditFormComponent,
          },
        ];
      case 'details':
        return [
          {
            tabName: 'Details',
            component: UserProfileDetailsPanelComponent,
          }
        ]
    }
  }

  getCardTags(): string[] {
    return [];
  }
}
