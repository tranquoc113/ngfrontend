import { Component } from '@angular/core';
import { DetailsBase } from '../../../../shared/ui/objects-view/details-base';
import { ActivatedRoute } from '@angular/router';
import { IRevenueReportModel } from '../../../../shared/fleio-api/utils/model/revenue-report.model';
import { RevenueReportsListUiService } from '../revenue-reports-list-ui.service';

@Component({
  selector: 'app-revenue-report-details',
  templateUrl: './revenue-report-details.component.html',
  styleUrls: ['./revenue-report-details.component.scss']
})
export class RevenueReportDetailsComponent extends DetailsBase<IRevenueReportModel> {
  constructor(route: ActivatedRoute, revenueReportsListUiService: RevenueReportsListUiService) {
    super(route, revenueReportsListUiService, 'details', 'revenueReport');
  }
}
