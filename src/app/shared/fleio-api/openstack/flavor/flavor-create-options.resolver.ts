import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { FlavorsApiService } from './flavors-api.service';
import { IFlavorCreateOptionsModel } from '../model/flavor-create-options.model';

@Injectable({
  providedIn: 'root'
})
export class FlavorCreateOptionsResolver implements Resolve<IFlavorCreateOptionsModel> {
  constructor(private flavorsApiService: FlavorsApiService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
    Observable<IFlavorCreateOptionsModel> | Promise<IFlavorCreateOptionsModel> | IFlavorCreateOptionsModel {
    return this.flavorsApiService.createOptions()
      .pipe(catchError(() => of(null))) as unknown as IFlavorCreateOptionsModel;
  }
}
