import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { FleioObjectsList } from '@fleio-api/fleio-objects-list';
import { IListQueryParams } from '@fleio-api/base-model/list-query-params';
import { ClusterTemplatesApiService } from '@fleio-api/openstack/cluster-template/cluster-templates-api.service';
import { IClusterTemplateModel } from '@fleio-api/openstack/model/cluster-template.model';

@Injectable({
  providedIn: 'root'
})
export class ClusterTemplateListResolver implements Resolve<FleioObjectsList<IClusterTemplateModel>> {
  constructor(private clusterTemplatesApiService: ClusterTemplatesApiService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
    Observable<FleioObjectsList<IClusterTemplateModel>> | Promise<FleioObjectsList<IClusterTemplateModel>> |
    FleioObjectsList<IClusterTemplateModel> {
    return this.clusterTemplatesApiService.list(
      route.queryParams as IListQueryParams
    ).pipe(catchError(() => of(null)));
  }
}
