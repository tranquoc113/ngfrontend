import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { IListQueryParams } from '../../base-model/list-query-params';
import { FleioObjectsList } from '../../fleio-objects-list';
import { ITicketDepartmentModel } from '../tickets/model/ticket-department.model';
import { TicketDepartmentsApiService } from '../tickets/ticket-departments-api.service';

@Injectable({
  providedIn: 'root'
})
export class DepartmentsListResolver implements Resolve<FleioObjectsList<ITicketDepartmentModel>> {
  constructor(private ticketDepartmentsApiService: TicketDepartmentsApiService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
    Observable<FleioObjectsList<ITicketDepartmentModel>> | Promise<FleioObjectsList<ITicketDepartmentModel>> |
    FleioObjectsList<ITicketDepartmentModel> {
    return this.ticketDepartmentsApiService.list(
      route.queryParams as IListQueryParams
    ).pipe(catchError(() => of(null)));
  }
}
