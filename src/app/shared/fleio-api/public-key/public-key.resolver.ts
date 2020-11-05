import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { PublicKeysApiService } from './public-key-api.service';
import { IPublicKeyModel } from './model/public-key.model';

@Injectable({
  providedIn: 'root'
})
export class PublicKeyResolver implements Resolve<IPublicKeyModel> {
  constructor(private publicKeysApiService: PublicKeysApiService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
    Observable<IPublicKeyModel> | Promise<IPublicKeyModel> | IPublicKeyModel {
    return this.publicKeysApiService.get(route.params.id).pipe(catchError(() => of(null)));
  }
}
