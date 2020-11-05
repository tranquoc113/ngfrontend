import { Injectable } from '@angular/core';
import { ConfigService } from '../../../config/config.service';
import { FleioApiService } from '../../fleio-api.service';
import { HttpClient } from '@angular/common/http';
import { IUserGroupModel } from '../model/user-group.model';
import { IPermission } from '../../core/model/permission.model';
import { Observable } from 'rxjs';
import { FleioId } from '../../base-model/base-fleio-object.model';

@Injectable({
  providedIn: 'root'
})
export class UserGroupsApiService extends FleioApiService<IUserGroupModel> {
  // noinspection JSUnusedGlobalSymbols
  constructor(protected httpClient: HttpClient, protected config: ConfigService) {
    super();
    this.setEndpoint(config.getPanelApiUrl('usergroups'));
  }

  generatePermissionsSet(
    objectId: FleioId,
    permissions: {
      implicitly_granted: boolean;
      objects: IPermission[];
    }): Observable<any> {
      return this.objectPostAction(objectId, 'generate_permission_set', permissions);
  }

  getGroupsAvailableForUser(
    userId: FleioId,
    search: string,
  ): Observable<any> {
      const params = {
        user_id: userId
      }
      if (search) {
        // @ts-ignore
        params.search = search;
      }
      return this.getAction('get_groups_available_for_user', params);
  }

}
