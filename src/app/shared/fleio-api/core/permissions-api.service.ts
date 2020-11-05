import { Injectable } from '@angular/core';
import { ConfigService } from '../../config/config.service';
import { FleioApiService } from '../fleio-api.service';
import { HttpClient } from '@angular/common/http';
import { IPermission } from './model/permission.model';
import { Observable } from 'rxjs';
import { FleioId } from '../base-model/base-fleio-object.model';

@Injectable({
  providedIn: 'root'
})
export class PermissionsApiService extends FleioApiService<any> {
  constructor(protected httpClient: HttpClient, protected config: ConfigService) {
    super();
    this.setEndpoint(config.getPanelApiUrl('permissionsset'));
  }

  updatePermissionsForSet(
    objectId: FleioId,
    permissions: {
      implicitly_granted: boolean;
      objects: IPermission[];
    }): Observable<any> {
      return this.objectPostAction(objectId, 'update_objects', permissions);
  }

}
