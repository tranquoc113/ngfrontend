import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { INetworkCreateOptionsModel } from '@fleio-api/openstack/network/model/network-create-options.model';
import { NetworksApiService } from '@fleio-api/openstack/network/networks-api.service';

@Injectable({
  providedIn: 'root'
})
export class NetworkCreateOptionsResolver implements Resolve<INetworkCreateOptionsModel> {
  constructor(private networksApiService: NetworksApiService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
    Observable<INetworkCreateOptionsModel> | Promise<INetworkCreateOptionsModel> | INetworkCreateOptionsModel {
    return this.networksApiService.createOptions()
      .pipe(catchError(() => of(null))) as unknown as INetworkCreateOptionsModel;
  }
}
