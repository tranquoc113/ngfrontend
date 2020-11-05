import { Component, OnInit } from '@angular/core';
import { DetailsComponentBase } from '../../../../../shared/ui/objects-view/details-component-base';
import { IRevenueReportModel } from '../../../../../shared/fleio-api/utils/model/revenue-report.model';

@Component({
  selector: 'app-revenue-report-overview',
  templateUrl: './revenue-report-overview.component.html',
  styleUrls: ['./revenue-report-overview.component.scss']
})
export class RevenueReportOverviewComponent extends DetailsComponentBase<IRevenueReportModel> implements OnInit  {
  displayedColumns: string[] = ['name', 'revenue'];
  constructor() {
    super();
  }

  ngOnInit(): void {
    super.ngOnInit();
    if (this.object) {
      if (!this.object.total_revenue_per_location || !this.object.total_revenue_per_location.length) {
        this.object.total_revenue_per_location = [];
      }
      this.object.total_revenue_per_location.push({
          name: `All locations`,
          revenue: this.object.total_revenue
        });
    }
  }

}
