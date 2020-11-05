import { Injectable } from '@angular/core';
import { IObjectListUIService } from '../../../../shared/ui/objects-view/interfaces/object-list-ui-service';
import { Router } from '@angular/router';
import { ConfigService } from '../../../../shared/config/config.service';
import { IBaseFleioObjectModel } from '../../../../shared/fleio-api/base-model/base-fleio-object.model';
import { IPermissionsModel } from '../../../../shared/fleio-api/base-model/IPermissionsModel';
import { IObjectUIService } from '../../../../shared/ui/objects-view/interfaces/object-ui-service';
import { FleioObjectsList } from '../../../../shared/fleio-api/fleio-objects-list';
import { IAction } from '../../../../shared/ui/objects-view/interfaces/actions/action';
import { UserProfileApiService } from '../../../../shared/fleio-api/profile/user-profile/user-profile-api.service';
import { UserProfileUiService } from './user-profile-ui.service';
import { ITableData } from '../../../../shared/ui/objects-view/interfaces/table-data/table-data';
import { IUserProfileModel } from '../../../../shared/fleio-api/profile/model/user-profile.model';

@Injectable({
  providedIn: 'root'
})
export class UserProfileListUiService implements IObjectListUIService {
  constructor(
    private router: Router, private config: ConfigService,
    private userProfileApiService: UserProfileApiService,
  ) {
  }

  getTableData(objectList: FleioObjectsList<IBaseFleioObjectModel>): ITableData {
    return {
      header: {
        columns: [],
        columnNames: [],
      },
      rows: []
    };
  }

  getObjectUIService(
    object: IBaseFleioObjectModel, permissions: IPermissionsModel, state: string
  ): IObjectUIService {
    return new UserProfileUiService(
      object as IUserProfileModel, permissions, state, this.router, this.config, this.userProfileApiService,
    );
  }

  getActions(objectList: FleioObjectsList<IBaseFleioObjectModel>): IAction[] {
    return [];
  }

  getRefreshInterval(): number {
    if (this.config && this.config.current && this.config.current.settings &&
      this.config.current.settings.refreshIntervals) {
      return this.config.current.settings.refreshIntervals.defaultInterval;
    }
    return 10000;
  }
}
