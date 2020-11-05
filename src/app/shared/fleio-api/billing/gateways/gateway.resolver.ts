import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { IGatewayModel } from '../model/gateway.model';
import { GatewayApiService } from '@fleio-api/billing/gateways/gateway-api.service';

@Injectable({
  providedIn: 'root'
})
export class GatewayResolver implements Resolve<IGatewayModel> {
  constructor(private gatewayApiService: GatewayApiService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
    Observable<IGatewayModel> | Promise<IGatewayModel> | IGatewayModel {
    return this.gatewayApiService.get(route.params.id).pipe(catchError(() => of(null)));
  }
}
