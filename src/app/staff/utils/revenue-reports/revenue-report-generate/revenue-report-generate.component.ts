import { Component, OnInit } from '@angular/core';
import { DetailsBase } from '../../../../shared/ui/objects-view/details-base';
import { IRevenueReportModel } from '../../../../shared/fleio-api/utils/model/revenue-report.model';
import { ActivatedRoute } from '@angular/router';
import { RevenueReportsListUiService } from '../revenue-reports-list-ui.service';

@Component({
  selector: 'app-revenue-report-generate',
  templateUrl: './revenue-report-generate.component.html',
  styleUrls: ['./revenue-report-generate.component.scss']
})
export class RevenueReportGenerateComponent extends DetailsBase<IRevenueReportModel> {
  constructor(route: ActivatedRoute, revenueReportsListUiService: RevenueReportsListUiService) {
    super(route, revenueReportsListUiService, 'generate', null);
  }
}
