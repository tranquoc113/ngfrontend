import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { IListQueryParams } from '../../base-model/list-query-params';
import { RevenueReportsApiService } from './revenue-reports-api.service';
import { IRevenueReportModel } from '../model/revenue-report.model';

@Injectable({
  providedIn: 'root'
})
export class RevenueReportsResolver implements Resolve<IRevenueReportModel> {
  constructor(private revenueReportsApiService: RevenueReportsApiService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
    Observable<IRevenueReportModel> | Promise<IRevenueReportModel> | IRevenueReportModel {
    return this.revenueReportsApiService.list(
      route.queryParams as IListQueryParams
    ).pipe(catchError(() => of(null)));
  }
}
