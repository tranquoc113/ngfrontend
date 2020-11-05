import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { FlavorsApiService } from './flavors-api.service';
import { IFlavorModel } from '../model/flavor.model';

@Injectable({
  providedIn: 'root'
})
export class FlavorResolver implements Resolve<IFlavorModel> {
  constructor(private flavorsApiService: FlavorsApiService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
    Observable<IFlavorModel> | Promise<IFlavorModel> | IFlavorModel {
    return this.flavorsApiService.get(route.params.id).pipe(catchError(() => of(null)));
  }
}
