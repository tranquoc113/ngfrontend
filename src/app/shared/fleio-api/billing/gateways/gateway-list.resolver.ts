import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { FleioObjectsList } from '@fleio-api/fleio-objects-list';
import { IGatewayModel } from '@fleio-api/billing/model/gateway.model';
import { GatewayApiService } from '@fleio-api/billing/gateways/gateway-api.service';
import { Observable, of } from 'rxjs';
import { IListQueryParams } from '@fleio-api/base-model/list-query-params';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GatewayListResolver implements Resolve<FleioObjectsList<IGatewayModel>> {
  constructor(private gatewayApiService: GatewayApiService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
    Observable<FleioObjectsList<IGatewayModel>> | Promise<FleioObjectsList<IGatewayModel>> |
    FleioObjectsList<IGatewayModel> {
    return this.gatewayApiService.list(
      route.queryParams as IListQueryParams
    ).pipe(catchError(() => of(null)));
  }
}
