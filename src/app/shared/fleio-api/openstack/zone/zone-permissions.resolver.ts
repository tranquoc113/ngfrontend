import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { IPermissionsModel } from '../../base-model/IPermissionsModel';
import { catchError } from 'rxjs/operators';
import { ZonesApiService } from '@fleio-api/openstack/zone/zones-api.service';

@Injectable({
  providedIn: 'root'
})
export class ZonePermissionsResolver implements Resolve<IPermissionsModel> {
  constructor(private zonesApiService: ZonesApiService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
    Observable<IPermissionsModel> | Promise<IPermissionsModel> | IPermissionsModel {
    return this.zonesApiService.permissions().pipe(catchError(() => of(null)));
  }
}
