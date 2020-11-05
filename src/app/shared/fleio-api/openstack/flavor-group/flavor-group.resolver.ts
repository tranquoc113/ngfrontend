import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { IFlavorGroupModel } from '../model/flavor-group.model';
import { FlavorGroupsApiService } from './flavor-groups-api.service';

@Injectable({
  providedIn: 'root'
})
export class FlavorGroupResolver implements Resolve<IFlavorGroupModel> {
  constructor(private flavorGroupsApiService: FlavorGroupsApiService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
    Observable<IFlavorGroupModel> | Promise<IFlavorGroupModel> | IFlavorGroupModel {
    return this.flavorGroupsApiService.get(route.params.id).pipe(catchError(() => of(null)));
  }
}
