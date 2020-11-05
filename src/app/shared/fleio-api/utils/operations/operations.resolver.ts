import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { IListQueryParams } from '../../base-model/list-query-params';
import { IOperationModel } from '../model/operation.model';
import { OperationsApiService } from './operations-api.service';

@Injectable({
  providedIn: 'root'
})
export class OperationsResolver implements Resolve<IOperationModel> {
  constructor(private operationsApiService: OperationsApiService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
    Observable<IOperationModel> | Promise<IOperationModel> | IOperationModel {
    return this.operationsApiService.list(
      route.queryParams as IListQueryParams
    ).pipe(catchError(() => of(null)));
  }
}
