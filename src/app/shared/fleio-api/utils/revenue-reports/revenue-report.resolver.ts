import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { IRevenueReportModel } from '../model/revenue-report.model';
import { RevenueReportsApiService } from './revenue-reports-api.service';

@Injectable({
  providedIn: 'root'
})
export class RevenueReportResolver implements Resolve<IRevenueReportModel> {
  constructor(private revenueReportsApiService: RevenueReportsApiService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
    Observable<IRevenueReportModel> | Promise<IRevenueReportModel> | IRevenueReportModel {
    return this.revenueReportsApiService.get(route.params.id).pipe(catchError(() => of(null)));
  }
}
