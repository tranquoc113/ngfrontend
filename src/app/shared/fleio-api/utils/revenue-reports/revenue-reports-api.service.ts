import { Injectable } from '@angular/core';
import { ConfigService } from '../../../config/config.service';
import { FleioApiService } from '../../fleio-api.service';
import { HttpClient } from '@angular/common/http';
import { IRevenueReportModel } from '../model/revenue-report.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RevenueReportsApiService extends FleioApiService<IRevenueReportModel> {
  constructor(protected httpClient: HttpClient, protected config: ConfigService) {
    super();
    this.setEndpoint(config.getPanelApiUrl('revenue_reports'));
  }

  generateForDate(month: number, year: number): Observable<any> {
    return this.postAction('trigger_revenue_report_generation', {
      month, year
    });
  }

}
