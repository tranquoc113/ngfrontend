import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ClustersApiService } from '@fleio-api/openstack/cluster/clusters-api.service';
import { IClusterCreateOptionsModel } from '@fleio-api/openstack/model/cluster-create-options.model';

@Injectable({
  providedIn: 'root'
})
export class ClusterCreateOptionsResolver implements Resolve<IClusterCreateOptionsModel> {
  constructor(private clustersApiService: ClustersApiService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
    Observable<IClusterCreateOptionsModel> | Promise<IClusterCreateOptionsModel> | IClusterCreateOptionsModel {
    return this.clustersApiService.createOptions()
      .pipe(catchError(() => of(null))) as unknown as IClusterCreateOptionsModel;
  }
}
