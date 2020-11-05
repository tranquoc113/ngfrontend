import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IRouteConfig } from '../../../shared/ui-api/interfaces/route-config/route-config';
import { AuthGuard } from '../../../shared/auth/auth.guard';
import { IBaseFleioObjectModel } from '../../../shared/fleio-api/base-model/base-fleio-object.model';
import { FleioObjectsList } from '../../../shared/fleio-api/fleio-objects-list';
import { OrderingDirection } from '../../../shared/ui-api/interfaces/route-config/ordering-directions';
import { RevenueReportsResolver } from '../../../shared/fleio-api/utils/revenue-reports/revenue-reports.resolver';
import { RevenueReportsListComponent } from './revenue-reports-list/revenue-reports-list.component';
import { RevenueReportDetailsComponent } from './revenue-report-details/revenue-report-details.component';
import { RevenueReportResolver } from '../../../shared/fleio-api/utils/revenue-reports/revenue-report.resolver';
import { RevenueReportGenerateComponent } from './revenue-report-generate/revenue-report-generate.component';

const routes: Routes = [
  {
    path: '',
    component: RevenueReportsListComponent,
    resolve: {
      revenueReports: RevenueReportsResolver,
    },
    canActivate: [AuthGuard],
    data: {
      config: {
        feature: 'utils.reports',
        search: {
          show: false,
        },
        subheader: {
          objectList(data): FleioObjectsList<IBaseFleioObjectModel> {
            return data.revenueReports;
          },
          objectName: 'revenue report',
          objectNamePlural: 'revenue reports',
        },
        ordering: {
          default: {
            display: 'Start date',
            field: 'start_date',
            direction: OrderingDirection.Descending,
          },
          options: [
            {
              display: 'Start date',
              field: 'start_date',
            },
            {
              display: 'End date',
              field: 'end_date',
            },
          ]
        },
      } as IRouteConfig,
    },
    runGuardsAndResolvers: 'always'
  },
  {
    path: 'generate',
    component: RevenueReportGenerateComponent,
    data: {
      config: {
        getBreadCrumbDetail: (data) => {
          return `Generate report`;
        },
      } as IRouteConfig,
    },
    runGuardsAndResolvers: 'always'
  },
  {
    path: ':id',
    component: RevenueReportDetailsComponent,
    resolve: {
      revenueReport: RevenueReportResolver
    },
    data: {
      config: {
        getBreadCrumbDetail: (data) => {
          return `Report for ${data.revenueReport.report_month_year}`;
        },
      } as IRouteConfig,
    },
    runGuardsAndResolvers: 'always'
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RevenueReportsRoutingModule {
}
