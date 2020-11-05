import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { FleioObjectsList } from '@fleio-api/fleio-objects-list';
import { IListQueryParams } from '@fleio-api/base-model/list-query-params';
import { IClusterModel } from '@fleio-api/openstack/model/cluster.model';
import { ClustersApiService } from '@fleio-api/openstack/cluster/clusters-api.service';

@Injectable({
  providedIn: 'root'
})
export class ClusterListResolver implements Resolve<FleioObjectsList<IClusterModel>> {
  constructor(private clustersApiService: ClustersApiService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
    Observable<FleioObjectsList<IClusterModel>> | Promise<FleioObjectsList<IClusterModel>> |
    FleioObjectsList<IClusterModel> {
    return this.clustersApiService.list(
      route.queryParams as IListQueryParams
    ).pipe(catchError(() => of(null)));
  }
}
