import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { TLDsApiService } from './tlds-api.service';
import { ITLDPricesModel } from './model/tld-prices.model';

@Injectable({
  providedIn: 'root'
})
export class TLDPricesResolver implements Resolve<ITLDPricesModel> {
  constructor(private tldsApiService: TLDsApiService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
    Observable<ITLDPricesModel> | Promise<ITLDPricesModel> | ITLDPricesModel {
    return this.tldsApiService.getPrices(route.params.id).pipe(catchError(() => of(null)));
  }
}
