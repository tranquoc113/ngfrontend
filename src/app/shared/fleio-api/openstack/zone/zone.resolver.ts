import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { IZoneModel } from '@fleio-api/openstack/zone/model/zone.model';
import { ZonesApiService } from '@fleio-api/openstack/zone/zones-api.service';

@Injectable({
  providedIn: 'root'
})
export class ZoneResolver implements Resolve<IZoneModel> {
  constructor(private zonesApiService: ZonesApiService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
    Observable<IZoneModel> | Promise<IZoneModel> | IZoneModel {
    return this.zonesApiService.get(route.params.id).pipe(catchError(() => of(null)));
  }
}
