import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { IZoneCreateOptionsModel } from '@fleio-api/openstack/zone/model/zone-create-options.model';
import { ZonesApiService } from '@fleio-api/openstack/zone/zones-api.service';

@Injectable({
  providedIn: 'root'
})
export class ZoneCreateOptionsResolver implements Resolve<IZoneCreateOptionsModel> {
  constructor(private zonesApiService: ZonesApiService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
    Observable<IZoneCreateOptionsModel> | Promise<IZoneCreateOptionsModel> | IZoneCreateOptionsModel {
    return this.zonesApiService.createOptions()
      .pipe(catchError(() => of(null))) as unknown as IZoneCreateOptionsModel;
  }
}
