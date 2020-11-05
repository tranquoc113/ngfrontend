import { Injectable } from '@angular/core';
import { ConfigService } from '@shared/config/config.service';
import { FleioApiService } from '../../fleio-api.service';
import { HttpClient } from '@angular/common/http';
import { IApiUserModel } from '../model/api-user.model';
import { IListQueryParams } from '@fleio-api/base-model/list-query-params';
import { Observable } from 'rxjs';
import { FleioObjectsList } from '@fleio-api/fleio-objects-list';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiUsersApiService extends FleioApiService<IApiUserModel> {
  constructor(protected httpClient: HttpClient, protected config: ConfigService) {
    super();
    this.setEndpoint(config.getPanelApiUrl('openstack/users'));
  }

  list(queryParams: IListQueryParams = {}, action: string = null): Observable<FleioObjectsList<IApiUserModel>> {
    return super.list(queryParams, action).pipe(map(apiUsers => {
      const apiUsersList = apiUsers as unknown as IApiUserModel[];
      const fleioObjectsList = new FleioObjectsList<IApiUserModel>();

      fleioObjectsList.objects = apiUsersList;
      fleioObjectsList.count = apiUsersList.length;
      fleioObjectsList.pageNumber = 1;
      fleioObjectsList.totalCount = apiUsersList.length;

      return fleioObjectsList;
    }));
  }
}
