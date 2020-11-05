import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ZonesApiService } from '@fleio-api/openstack/zone/zones-api.service';
import { IRecordListModel } from '@fleio-api/openstack/zone/model/record-list.model';

@Injectable({
  providedIn: 'root'
})
export class ZoneRecordListResolver implements Resolve<IRecordListModel> {
  constructor(private zonesApiService: ZonesApiService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
    Observable<IRecordListModel> | Promise<IRecordListModel> | IRecordListModel {
    return this.zonesApiService.listRecords(route.params.id).pipe(catchError(() => of(null)));
  }
}
