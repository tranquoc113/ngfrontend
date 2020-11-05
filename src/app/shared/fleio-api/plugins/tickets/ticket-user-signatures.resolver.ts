import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { FleioObjectsList } from '@fleio-api/fleio-objects-list';
import { ITicketSignatureModel } from '@fleio-api/plugins/tickets/model/ticket-signature.model';
import { TicketsSignaturesApiService } from '@fleio-api/plugins/tickets/tickets-signatures-api.service';

@Injectable({
  providedIn: 'root'
})
export class TicketUserSignaturesResolver implements Resolve<FleioObjectsList<ITicketSignatureModel>> {
  constructor(private ticketsSignaturesApiService: TicketsSignaturesApiService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
    Observable<FleioObjectsList<ITicketSignatureModel>> |
    Promise<FleioObjectsList<ITicketSignatureModel>> |
    FleioObjectsList<ITicketSignatureModel> {
    return this.ticketsSignaturesApiService.getSignaturesForCurrentUser().pipe(
      catchError(() => of(null))
    );
  }
}
