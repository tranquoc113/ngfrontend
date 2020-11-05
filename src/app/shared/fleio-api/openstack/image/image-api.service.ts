import { Injectable } from '@angular/core';
import { ConfigService } from '@shared/config/config.service';
import { FleioApiService } from '../../fleio-api.service';
import { HttpClient } from '@angular/common/http';
import { IImageModel } from '../model/image.model';
import { FleioId } from '@fleio-api/base-model/base-fleio-object.model';
import { Observable } from 'rxjs';
import { FleioObjectsList } from '@fleio-api/fleio-objects-list';
import { IFlavorModel } from '@fleio-api/openstack/model/flavor.model';

@Injectable({
  providedIn: 'root'
})
export class ImagesApiService extends FleioApiService<IImageModel> {
  // noinspection JSUnusedGlobalSymbols
  constructor(protected httpClient: HttpClient, protected config: ConfigService) {
    super();
    this.setEndpoint(config.getPanelApiUrl('openstack/images'));
  }

  deactivate(imageId: FleioId): Observable<any> {
    return this.objectPostAction(imageId, 'deactivate', {});
  }

  reactivate(imageId: FleioId): Observable<any> {
    return this.objectPostAction(imageId, 'reactivate', {});
  }

  availableToClient(imageId: FleioId, clientId: FleioId): Observable<{
    needsSharing: boolean;
  }> {
    return this.objectPostAction(imageId, 'available_to_client', {client: clientId});
  }
}
