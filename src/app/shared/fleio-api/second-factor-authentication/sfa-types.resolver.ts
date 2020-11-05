import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ISfaTypeModel } from '@fleio-api/core/model/sfa-type.model';
import { SfaTypesApiService } from '@fleio-api/core/sfa-types-api.service';

@Injectable({
  providedIn: 'root'
})
export class SfaTypesResolver implements Resolve<ISfaTypeModel> {
  constructor(private sfaTypesApiService: SfaTypesApiService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
    Observable<ISfaTypeModel> | Promise<ISfaTypeModel> | ISfaTypeModel {
    return this.sfaTypesApiService.list().pipe(catchError(() => of(null)));
  }
}
