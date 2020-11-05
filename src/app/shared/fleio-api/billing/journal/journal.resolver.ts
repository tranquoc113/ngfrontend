import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { IJournalEntryModel } from '../model/journal-entry.model';
import { JournalsApiService } from './journal-api.service';

@Injectable({
  providedIn: 'root'
})
export class JournalResolver implements Resolve<IJournalEntryModel> {
  constructor(private journalsApiService: JournalsApiService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
    Observable<IJournalEntryModel> | Promise<IJournalEntryModel> | IJournalEntryModel {
    return this.journalsApiService.get(route.params.id).pipe(catchError(() => of(null)));
  }
}
