import { Injectable } from '@angular/core';
import { ConfigService } from '@shared/config/config.service';
import { FleioApiService } from '../../fleio-api.service';
import { HttpClient } from '@angular/common/http';
import { IClusterModel } from '@fleio-api/openstack/model/cluster.model';
import { FleioId } from '@fleio-api/base-model/base-fleio-object.model';

@Injectable({
  providedIn: 'root'
})
export class ClustersApiService extends FleioApiService<IClusterModel> {
  constructor(protected httpClient: HttpClient, protected config: ConfigService) {
    super();
    this.setEndpoint(config.getPanelApiUrl('openstack/clusters'));
  }

  resizeCluster(objectId: FleioId, params: {
    node_count: number;
    nodes_to_remove: string;
  }) {
    return this.objectPostAction(objectId, 'resize_cluster', params);
  }

  upgradeCluster(objectId: FleioId, clusterTemplate: string) {
    return this.objectPostAction(objectId, 'upgrade', {
      cluster_template: clusterTemplate
    });
  }
}
