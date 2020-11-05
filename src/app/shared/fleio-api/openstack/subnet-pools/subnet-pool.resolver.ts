import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { SubnetPoolsApiService } from '@fleio-api/openstack/subnet-pools/subnet-pools-api.service';
import { ISubnetPoolModel } from '@fleio-api/openstack/subnet-pools/model/subnet-pool.model';

@Injectable({
  providedIn: 'root'
})
export class SubnetPoolResolver implements Resolve<ISubnetPoolModel> {
  constructor(private subnetPoolsApiService: SubnetPoolsApiService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
    Observable<ISubnetPoolModel> | Promise<ISubnetPoolModel> | ISubnetPoolModel {
    return this.subnetPoolsApiService.get(route.params.id).pipe(catchError(() => of(null)));
  }
}
