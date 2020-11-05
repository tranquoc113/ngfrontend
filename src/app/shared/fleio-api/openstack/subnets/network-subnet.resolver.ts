import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ISubnetModel } from '@fleio-api/openstack/model/subnet.model';
import { SubnetsApiService } from '@fleio-api/openstack/subnets/subnets-api.service';

@Injectable({
  providedIn: 'root'
})
export class NetworkSubnetResolver implements Resolve<ISubnetModel> {
  constructor(private subnetsApiService: SubnetsApiService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
    Observable<ISubnetModel> | Promise<ISubnetModel> | ISubnetModel {
    return this.subnetsApiService.get(route.params.subnetId).pipe(catchError(() => of(null)));
  }
}
