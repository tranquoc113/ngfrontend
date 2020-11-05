import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { PortsApiService } from '@fleio-api/openstack/port/ports-api.service';
import { IPortCreateOptionsModel } from '@fleio-api/openstack/model/port-create-options.model';

@Injectable({
  providedIn: 'root'
})
export class PortCreateOptionsResolver implements Resolve<IPortCreateOptionsModel> {
  constructor(private portsApiService: PortsApiService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
    Observable<IPortCreateOptionsModel> | Promise<IPortCreateOptionsModel> | IPortCreateOptionsModel {
    return this.portsApiService.createOptions()
      .pipe(catchError(() => of(null))) as unknown as IPortCreateOptionsModel;
  }
}
