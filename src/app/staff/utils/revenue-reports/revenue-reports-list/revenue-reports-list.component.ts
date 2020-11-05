import { Component, OnInit } from '@angular/core';
import { ListBase } from '../../../../shared/ui/objects-view/list-base';
import { ActivatedRoute } from '@angular/router';
import { RefreshService } from '../../../../shared/ui-api/refresh.service';
import { ConfigService } from '../../../../shared/config/config.service';
import { IRevenueReportModel } from '../../../../shared/fleio-api/utils/model/revenue-report.model';
import { RevenueReportsListUiService } from '../revenue-reports-list-ui.service';

@Component({
  selector: 'app-revenue-reports-list',
  templateUrl: './revenue-reports-list.component.html',
  styleUrls: ['./revenue-reports-list.component.scss']
})
export class RevenueReportsListComponent extends ListBase<IRevenueReportModel> implements OnInit {

  constructor(
    private route: ActivatedRoute, private revenueReportsListUiService: RevenueReportsListUiService,
    private refreshService: RefreshService, private configService: ConfigService,
  ) {
    super(route, revenueReportsListUiService, refreshService, 'revenueReports');
  }

  ngOnInit() {
    super.ngOnInit();
  }

}
