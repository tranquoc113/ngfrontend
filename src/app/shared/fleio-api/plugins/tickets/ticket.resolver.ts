import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ITicketModel } from './model/ticket.model';
import { TicketsApiService } from './tickets-api.service';

@Injectable({
  providedIn: 'root'
})
export class TicketResolver implements Resolve<ITicketModel> {
  constructor(private ticketsApiService: TicketsApiService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
    Observable<ITicketModel> | Promise<ITicketModel> | ITicketModel {
    return this.ticketsApiService.get(route.params.id).pipe(catchError(() => of(null)));
  }
}
