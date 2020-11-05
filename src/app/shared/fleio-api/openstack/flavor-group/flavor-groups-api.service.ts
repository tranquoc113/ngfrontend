import { Injectable } from '@angular/core';
import { ConfigService } from '@shared/config/config.service';
import { FleioApiService } from '../../fleio-api.service';
import { HttpClient } from '@angular/common/http';
import { IFlavorGroupModel } from '../model/flavor-group.model';
import { FleioId } from '@fleio-api/base-model/base-fleio-object.model';
import { Observable } from 'rxjs';
import { FleioObjectsList } from '@fleio-api/fleio-objects-list';

@Injectable({
  providedIn: 'root'
})
export class FlavorGroupsApiService extends FleioApiService<IFlavorGroupModel> {
  // noinspection JSUnusedGlobalSymbols
  constructor(protected httpClient: HttpClient, protected config: ConfigService) {
    super();
    this.setEndpoint(config.getPanelApiUrl('openstack/flavorgroups'));
  }

  getAvailableFlavorGroupsForImage(imageId: FleioId): Observable<FleioObjectsList<IFlavorGroupModel>> {
    return this.getAction('get_available_flavor_groups_for_image', {image_id: imageId});
  }

  getFlavorGroupsAssignedToImage(
    imageId: FleioId, page: number, pageSize: number = 5,
  ): Observable<FleioObjectsList<IFlavorGroupModel>> {
    return this.getAction('get_flavor_groups_assigned_to_image', {
      image_id: imageId,
      page,
      page_size: pageSize,
    });
  }

  removeFromImage(flavorGroupId: FleioId, imageId: FleioId): Observable<any> {
    return this.objectPostAction(flavorGroupId, 'remove_from_image', {
      image_id: imageId,
    });
  }

  addToImage(flavorGroupId: FleioId, imageId: FleioId): Observable<any> {
    return this.objectPostAction(flavorGroupId, 'add_to_image', {
      image_id: imageId,
    });
  }
}
