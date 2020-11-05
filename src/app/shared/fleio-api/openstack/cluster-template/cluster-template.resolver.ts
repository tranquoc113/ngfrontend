import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { IClusterTemplateModel } from '@fleio-api/openstack/model/cluster-template.model';
import { ClusterTemplatesApiService } from '@fleio-api/openstack/cluster-template/cluster-templates-api.service';

@Injectable({
  providedIn: 'root'
})
export class ClusterTemplateResolver implements Resolve<IClusterTemplateModel> {
  constructor(private clusterTemplatesApiService: ClusterTemplatesApiService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
    Observable<IClusterTemplateModel> | Promise<IClusterTemplateModel> | IClusterTemplateModel {
    return this.clusterTemplatesApiService.get(route.params.id).pipe(catchError(() => of(null)));
  }
}
