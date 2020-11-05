import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ITLDModel } from './model/tld.model';
import { TLDsApiService } from './tlds-api.service';

@Injectable({
  providedIn: 'root'
})
export class TLDResolver implements Resolve<ITLDModel> {
  constructor(private tldsApiService: TLDsApiService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
    Observable<ITLDModel> | Promise<ITLDModel> | ITLDModel {
    return this.tldsApiService.get(route.params.id).pipe(catchError(() => of(null)));
  }
}
