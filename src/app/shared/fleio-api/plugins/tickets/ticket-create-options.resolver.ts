import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { TicketsApiService } from './tickets-api.service';
import { ITicketCreateOptionsModel } from './model/ticket-create-options.model';

@Injectable({
  providedIn: 'root'
})
export class TicketCreateOptionsResolver implements Resolve<ITicketCreateOptionsModel> {
  constructor(private ticketsApiService: TicketsApiService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
    Observable<ITicketCreateOptionsModel> | Promise<ITicketCreateOptionsModel> | ITicketCreateOptionsModel {
    return this.ticketsApiService.getCreateOptionsForTicket(route.params.id).pipe(
      catchError(() => of(null))
    );
  }
}
