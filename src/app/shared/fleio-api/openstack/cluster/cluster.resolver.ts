import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { IClusterModel } from '@fleio-api/openstack/model/cluster.model';
import { ClustersApiService } from '@fleio-api/openstack/cluster/clusters-api.service';

@Injectable({
  providedIn: 'root'
})
export class ClusterResolver implements Resolve<IClusterModel> {
  constructor(private clustersApiService: ClustersApiService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
    Observable<IClusterModel> | Promise<IClusterModel> | IClusterModel {
    return this.clustersApiService.get(route.params.id).pipe(catchError(() => of(null)));
  }
}
