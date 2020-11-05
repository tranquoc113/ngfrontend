import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ITicketDepartmentModel } from '../tickets/model/ticket-department.model';
import { TicketDepartmentsApiService } from '../tickets/ticket-departments-api.service';

@Injectable({
  providedIn: 'root'
})
export class DepartmentResolver implements Resolve<ITicketDepartmentModel> {
  constructor(private ticketDepartmentsApiService: TicketDepartmentsApiService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
    Observable<ITicketDepartmentModel> | Promise<ITicketDepartmentModel> | ITicketDepartmentModel {
    return this.ticketDepartmentsApiService.get(route.params.id).pipe(catchError(() => of(null)));
  }
}
