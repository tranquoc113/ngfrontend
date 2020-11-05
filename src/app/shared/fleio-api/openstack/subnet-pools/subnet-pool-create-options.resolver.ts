import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ISubnetPoolCreateOptionsModel } from '@fleio-api/openstack/subnet-pools/model/subnet-pool-create-options.model';
import { SubnetPoolsApiService } from '@fleio-api/openstack/subnet-pools/subnet-pools-api.service';

@Injectable({
  providedIn: 'root'
})
export class SubnetPoolCreateOptionsResolver implements Resolve<ISubnetPoolCreateOptionsModel> {
  constructor(private subnetPoolsApiService: SubnetPoolsApiService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
    Observable<ISubnetPoolCreateOptionsModel> | Promise<ISubnetPoolCreateOptionsModel> | ISubnetPoolCreateOptionsModel {
    return this.subnetPoolsApiService.createOptions()
      .pipe(catchError(() => of(null))) as unknown as ISubnetPoolCreateOptionsModel;
  }
}
