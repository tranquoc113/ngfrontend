import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { IListQueryParams } from '../../base-model/list-query-params';
import { FleioObjectsList } from '../../fleio-objects-list';
import { ITicketModel } from './model/ticket.model';
import { TicketsApiService } from './tickets-api.service';

@Injectable({
  providedIn: 'root'
})
export class TicketsListResolver implements Resolve<FleioObjectsList<ITicketModel>> {
  constructor(private ticketsApiService: TicketsApiService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
    Observable<FleioObjectsList<ITicketModel>> | Promise<FleioObjectsList<ITicketModel>> |
    FleioObjectsList<ITicketModel> {
    return this.ticketsApiService.list(
      route.queryParams as IListQueryParams
    ).pipe(catchError(() => of(null)));
  }
}
