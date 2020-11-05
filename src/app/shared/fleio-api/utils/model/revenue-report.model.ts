import { IBaseFleioObjectModel } from '../../base-model/base-fleio-object.model';

export interface IRevenueReportModel extends IBaseFleioObjectModel {
  start_date: Date;
  end_date: Date;
  report_month_year: string;
  total_revenue: string;
  currency_code: string;
  generating: boolean;
  processed: number;
  total_revenue_per_location: Array<{
    name: string;
    revenue: string;
  }>;
}
