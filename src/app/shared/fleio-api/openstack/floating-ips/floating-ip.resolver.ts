import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { IFloatingIpModel } from '@fleio-api/openstack/floating-ips/model/floating-ip.model';
import { FloatingIpsApiService } from '@fleio-api/openstack/floating-ips/floating-ips-api.service';

@Injectable({
  providedIn: 'root'
})
export class FloatingIpResolver implements Resolve<IFloatingIpModel> {
  constructor(private floatingIpsApiService: FloatingIpsApiService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
    Observable<IFloatingIpModel> | Promise<IFloatingIpModel> | IFloatingIpModel {
    return this.floatingIpsApiService.get(route.params.id).pipe(catchError(() => of(null)));
  }
}
