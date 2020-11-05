import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ISubnetCreateOptionsModel } from '@fleio-api/openstack/subnets/model/subnet-create-options.model';
import { SubnetsApiService } from '@fleio-api/openstack/subnets/subnets-api.service';

@Injectable({
  providedIn: 'root'
})
export class NetworkSubnetCreateOptionsResolver implements Resolve<ISubnetCreateOptionsModel> {
  constructor(private subnetsApiService: SubnetsApiService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
    Observable<ISubnetCreateOptionsModel> | Promise<ISubnetCreateOptionsModel> | ISubnetCreateOptionsModel {
    return this.subnetsApiService.createOptions({
      network_id: route.params.id,
    })
      .pipe(catchError(() => of(null))) as unknown as ISubnetCreateOptionsModel;
  }
}
