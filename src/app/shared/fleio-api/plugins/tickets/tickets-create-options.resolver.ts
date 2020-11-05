import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ITicketCreateOptionsModel } from './model/ticket-create-options.model';
import { TicketsApiService } from './tickets-api.service';

@Injectable({
  providedIn: 'root'
})
export class TicketsCreateOptionsResolver implements Resolve<ITicketCreateOptionsModel> {
  constructor(private ticketsApiService: TicketsApiService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
    Observable<ITicketCreateOptionsModel> | Promise<ITicketCreateOptionsModel> | ITicketCreateOptionsModel {
    return this.ticketsApiService.createOptions()
      .pipe(catchError(() => of(null))) as unknown as ITicketCreateOptionsModel;
  }
}
