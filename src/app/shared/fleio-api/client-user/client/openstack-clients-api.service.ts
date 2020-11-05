import { Injectable } from '@angular/core';
import { ConfigService } from '../../../config/config.service';
import { FleioApiService } from '../../fleio-api.service';
import { HttpClient } from '@angular/common/http';
import { IClientModel } from '../model/client.model';
import { Observable } from 'rxjs';
import { FleioId } from '../../base-model/base-fleio-object.model';

@Injectable({
  providedIn: 'root'
})
export class OpenstackClientsApiService extends FleioApiService<IClientModel> {
  constructor(protected httpClient: HttpClient, protected config: ConfigService) {
    super();
    this.setEndpoint(config.getPanelApiUrl('openstack/clients'));
  }

  openstackServices(clientId: FleioId): Observable<any> {
    return this.objectGetAction(clientId, 'openstack_services', {});
  }

}
