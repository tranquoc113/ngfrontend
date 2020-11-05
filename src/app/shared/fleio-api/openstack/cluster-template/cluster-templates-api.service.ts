import { Injectable } from '@angular/core';
import { ConfigService } from '@shared/config/config.service';
import { FleioApiService } from '../../fleio-api.service';
import { HttpClient } from '@angular/common/http';
import { IClusterTemplateModel } from '@fleio-api/openstack/model/cluster-template.model';
import { FleioId } from '@fleio-api/base-model/base-fleio-object.model';
import { Observable } from 'rxjs';
import { FleioObjectsList } from '@fleio-api/fleio-objects-list';
import { IFlavorModel } from '@fleio-api/openstack/model/flavor.model';

@Injectable({
  providedIn: 'root'
})
export class ClusterTemplatesApiService extends FleioApiService<IClusterTemplateModel> {
  constructor(protected httpClient: HttpClient, protected config: ConfigService) {
    super();
    this.setEndpoint(config.getPanelApiUrl('openstack/cluster-templates'));
  }

  assignFlavorToClusterTemplate(clusterTemplateId: FleioId, flavorId: FleioId) {
    return this.objectPostAction(clusterTemplateId, 'assign_flavor_to_cluster_template', {
      flavor_id: flavorId
    });
  }

  removeFlavorFromClusterTemplate(clusterTemplateId: FleioId, flavorId: FleioId) {
    return this.objectPostAction(clusterTemplateId, 'remove_flavor_from_cluster_template', {
      flavor_id: flavorId
    });
  }

  getAvailableFlavorsToAssign(clusterTemplateId: FleioId, search: string): Observable<FleioObjectsList<IFlavorModel>> {
    return this.getAction( 'get_available_flavors_to_assign', {
      cluster_template_id: clusterTemplateId,
      search
    });
  }
}
