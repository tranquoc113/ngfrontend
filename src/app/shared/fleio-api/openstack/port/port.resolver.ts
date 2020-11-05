import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { IPortModel } from '@fleio-api/openstack/model/port.model';
import { PortsApiService } from '@fleio-api/openstack/port/ports-api.service';

@Injectable({
  providedIn: 'root'
})
export class PortResolver implements Resolve<IPortModel> {
  constructor(private portsApiService: PortsApiService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
    Observable<IPortModel> | Promise<IPortModel> | IPortModel {
    return this.portsApiService.get(route.params.id).pipe(catchError(() => of(null)));
  }
}
