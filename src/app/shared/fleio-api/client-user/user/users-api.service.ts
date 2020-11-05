import { Injectable } from '@angular/core';
import { ConfigService } from '@shared/config/config.service';
import { FleioApiService } from '../../fleio-api.service';
import { HttpClient } from '@angular/common/http';
import { IUserModel } from '../model/user.model';
import { FleioId } from '../../base-model/base-fleio-object.model';
import { IPermission } from '../../core/model/permission.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersApiService extends FleioApiService<IUserModel> {
  // noinspection JSUnusedGlobalSymbols
  constructor(protected httpClient: HttpClient, protected config: ConfigService) {
    super();
    this.setEndpoint(config.getPanelApiUrl('users'));
  }

  generatePermissionsSet(
    objectId: FleioId,
    permissions: {
      implicitly_granted: boolean;
      objects: IPermission[];
    }): Observable<any> {
    return this.objectPostAction(objectId, 'generate_permission_set', permissions);
  }

  addToGroup(
    objectId: FleioId,
    groupId: FleioId
  ): Observable<any> {
    return this.objectPostAction(objectId, `add_user_to_group?group_id=${groupId}`, {});
  }

  removeFromGroup(
    objectId: FleioId,
    groupId: FleioId
  ): Observable<any> {
    return this.objectPostAction(objectId, `remove_user_from_group?group_id=${groupId}`, {});
  }

  getUsersInGroup(groupId: FleioId, page: number): Observable<any> {
    return this.getAction('get_users_in_group', {
      group_id: groupId,
      page
    });
  }

  getAvailableUsersForGroup(groupId: FleioId, search: string): Observable<any> {
    return this.getAction('get_available_users_for_group', {
      group: groupId,
      search,
    });
  }
}
