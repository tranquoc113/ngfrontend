import { Injectable } from '@angular/core';
import { ConfigService } from '@shared/config/config.service';
import { FleioApiService } from '../../fleio-api.service';
import { HttpClient } from '@angular/common/http';
import { IFlavorModel } from '../model/flavor.model';
import { Observable } from 'rxjs';
import { IFlavorsSummary } from '@fleio-api/openstack/summary/model/flavors-summary.model';
import { FleioId } from '@fleio-api/base-model/base-fleio-object.model';
import { FleioObjectsList } from '@fleio-api/fleio-objects-list';
import { IClientGroupModel } from '@fleio-api/client-user/model/client-group.model';

@Injectable({
  providedIn: 'root'
})
export class FlavorsApiService extends FleioApiService<IFlavorModel> {
  constructor(protected httpClient: HttpClient, protected config: ConfigService) {
    super();
    this.setEndpoint(config.getPanelApiUrl('openstack/flavors'));
  }

  getSummary(): Observable<IFlavorsSummary> {
    return this.getAction('summary');
  }

  setProperties(flavorId: FleioId, properties: {}) {
    return this.objectPostAction(flavorId, 'set_properties', {
      new_properties: properties,
    });
  }

  unsetProperty(flavorId: FleioId, propertyKey: string) {
    return this.objectPostAction(flavorId, 'unset_property', {
      property_key: propertyKey,
    });
  }

  assignClientGroupToFlavor(flavorId: FleioId, clientGroupId: FleioId) {
    return this.objectPostAction(flavorId, 'assign_client_group_to_flavor', {
      client_group: clientGroupId,
    });
  }

  removeClientGroupFromFlavor(flavorId: FleioId, clientGroupId: FleioId) {
    return this.objectPostAction(flavorId, 'remove_client_group_from_flavor', {
      client_group: clientGroupId,
    });
  }

  getAvailableClientGroupsToAssign(flavorId: FleioId, search: string): Observable<FleioObjectsList<IClientGroupModel>> {
    return this.getAction('get_available_client_groups_to_assign', {
      flavor_id: flavorId,
      search,
    });
  }

  getAvailableFlavorsForGroup(flavorGroupId: FleioId, search: string): Observable<FleioObjectsList<IFlavorModel>> {
    return this.getAction('get_available_flavors_for_group', {
      group: flavorGroupId,
      search,
    });
  }

  getFlavorsInGroup(flavorGroupId: FleioId, page: number): Observable<FleioObjectsList<IFlavorModel>> {
    return this.getAction('get_flavors_in_group', {
      group_id: flavorGroupId,
      page,
    });
  }

  removeFromGroup(flavorGroupId: FleioId, flavorId: FleioId): Observable<any> {
    return this.objectPostAction(flavorId, 'remove_from_group', {
      group_id: flavorGroupId,
    })
  }

  addToGroup(flavorGroupId: FleioId, flavorId: FleioId) {
    return this.objectPostAction(flavorId, 'add_to_group', {
      group_id: flavorGroupId,
    })
  }

  getAvailableFlavorsForImage(imageId: FleioId): Observable<FleioObjectsList<IFlavorModel>> {
    return this.getAction('get_available_flavors_for_image', {image_id: imageId});
  }

  getFlavorsAssignedToImage(
    imageId: FleioId, page: number, pageSize: number = 5,
  ): Observable<FleioObjectsList<IFlavorModel>> {
    return this.getAction('get_flavors_assigned_to_image', {
      image_id: imageId,
      page,
      page_size: pageSize,
    });
  }

  removeFromImage(flavorId: FleioId, imageId: FleioId): Observable<any> {
    return this.objectPostAction(flavorId, 'remove_from_image', {
      id: flavorId,
      image_id: imageId,
    });
  }

  addToImage(flavorId: FleioId, imageId: FleioId): Observable<any> {
    return this.objectPostAction(flavorId, 'add_to_image', {
      id: flavorId,
      image_id: imageId,
    });
  }
}
