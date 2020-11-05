import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ClusterTemplatesApiService } from '@fleio-api/openstack/cluster-template/cluster-templates-api.service';
import { IClusterTemplateCreateOptionsModel } from '@fleio-api/openstack/model/cluster-template-create-options.model';

@Injectable({
  providedIn: 'root'
})
export class ClusterTemplateCreateOptionsResolver implements Resolve<IClusterTemplateCreateOptionsModel> {
  constructor(private clusterTemplatesApiService: ClusterTemplatesApiService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
    Observable<IClusterTemplateCreateOptionsModel> | Promise<IClusterTemplateCreateOptionsModel> |
    IClusterTemplateCreateOptionsModel {
    return this.clusterTemplatesApiService.createOptions()
      .pipe(catchError(() => of(null))) as unknown as IClusterTemplateCreateOptionsModel;
  }
}
