import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { RoutersApiService } from '@fleio-api/openstack/routers/routers-api.service';
import { IRouterModel } from '@fleio-api/openstack/model/router.model';

@Injectable({
  providedIn: 'root'
})
export class RouterResolver implements Resolve<IRouterModel> {
  constructor(private routersApiService: RoutersApiService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
    Observable<IRouterModel> | Promise<IRouterModel> | IRouterModel {
    return this.routersApiService.get(route.params.id).pipe(catchError(() => of(null)));
  }
}
