import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { IActivityLogModel } from '../model/activity-log.model';
import { ActivityLogApiService } from './activity-log-api.service';
import { IListQueryParams } from '../../base-model/list-query-params';

@Injectable({
  providedIn: 'root'
})
export class ActivityLogResolver implements Resolve<IActivityLogModel> {
  constructor(private activityLogApiService: ActivityLogApiService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
    Observable<IActivityLogModel> | Promise<IActivityLogModel> | IActivityLogModel {
    return this.activityLogApiService.list(
      route.queryParams as IListQueryParams
    ).pipe(catchError(() => of(null)));
  }
}
