import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { FleioObjectsList } from '../../fleio-objects-list';
import { Observable, of } from 'rxjs';
import { IListQueryParams } from '../../base-model/list-query-params';
import { catchError } from 'rxjs/operators';
import { IJournalEntryModel } from '../model/journal-entry.model';
import { JournalsApiService } from './journal-api.service';

@Injectable({
  providedIn: 'root'
})
export class JournalListResolver implements Resolve<FleioObjectsList<IJournalEntryModel>> {
  constructor(private journalsApiService: JournalsApiService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
    Observable<FleioObjectsList<IJournalEntryModel>> | Promise<FleioObjectsList<IJournalEntryModel>> |
    FleioObjectsList<IJournalEntryModel> {
    return this.journalsApiService.list(
      route.queryParams as IListQueryParams
    ).pipe(catchError(() => of(null)));
  }
}
