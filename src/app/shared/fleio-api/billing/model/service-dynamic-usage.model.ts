import { IBaseFleioObjectModel } from '../../base-model/base-fleio-object.model';
import { IUsageDetails } from './usage-details';
import { ICurrencyModel } from './currency.model';

export interface IServiceDynamicUsageModel extends IBaseFleioObjectModel {
  service_id: number;
  is_cost: boolean;
  client_display: string;
  usage: {
    project: string;
    usage_details: IUsageDetails[],
    usage_end: Date,
    metrics_details: [];
    price: number;
    currency: ICurrencyModel
  };
  service_display: string;
  price: number;
  client_currency: ICurrencyModel;
  updated_at: Date;
  billing_start: Date;
  billing_end: Date;
  previous_history: object;
  start_date: Date;
  end_date: Date;
  service_cycle: number;
  reseller_service: number;
}
