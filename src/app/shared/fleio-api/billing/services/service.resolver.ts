import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { IServiceModel } from '../model/service.model';
import { ServicesApiService } from './service-api.service';

@Injectable({
  providedIn: 'root'
})
export class ServiceResolver implements Resolve<IServiceModel> {
  constructor(private servicesApiService: ServicesApiService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
    Observable<IServiceModel> | Promise<IServiceModel> | IServiceModel {
    return this.servicesApiService.get(route.params.id).pipe(catchError(() => of(null)));
  }
}
