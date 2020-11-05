import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { IOperationModel } from '../model/operation.model';
import { OperationsApiService } from './operations-api.service';

@Injectable({
  providedIn: 'root'
})
export class OperationResolver implements Resolve<IOperationModel> {
  constructor(private operationsApiService: OperationsApiService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
    Observable<IOperationModel> | Promise<IOperationModel> | IOperationModel {
    return this.operationsApiService.get(route.params.id).pipe(catchError(() => of(null)));
  }
}
