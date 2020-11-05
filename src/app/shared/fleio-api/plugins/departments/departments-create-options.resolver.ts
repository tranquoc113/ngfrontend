import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { IDepartmentCreateOptionsModel } from './model/department-create-options.model';
import { TicketDepartmentsApiService } from '../tickets/ticket-departments-api.service';

@Injectable({
  providedIn: 'root'
})
export class DepartmentsCreateOptionsResolver implements Resolve<IDepartmentCreateOptionsModel> {
  constructor(private ticketDepartmentsApiService: TicketDepartmentsApiService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
    Observable<IDepartmentCreateOptionsModel> | Promise<IDepartmentCreateOptionsModel> | IDepartmentCreateOptionsModel {
    return this.ticketDepartmentsApiService.createOptions()
      .pipe(catchError(() => of(null))) as unknown as IDepartmentCreateOptionsModel;
  }
}
