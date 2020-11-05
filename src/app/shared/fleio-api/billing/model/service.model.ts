import { IBaseFleioObjectModel } from '../../base-model/base-fleio-object.model';
import { IClientModel } from '../../client-user/model/client.model';
import { IConfigOptionModel } from './config-option.model';
import { IPricingPlanModel } from '../../openstack/model/pricing-plan.model';
import { IServiceHostingAccountModel } from '@fleio-api/billing/services/model/service-hosting-account.model';

export interface IServiceModel extends IBaseFleioObjectModel {
  pricing_plan: IPricingPlanModel;
  client: IClientModel;
  cycle: any;  // IProductCycleModel | FleioId
  product: any;  // IProductModel | FleioId
  order: number;
  configurable_options: IConfigOptionModel[];
  internal_id: string;
  external_billing_id: string;
  display_name: string;
  override_price: string;
  status: string;
  task: string;
  notes: string;
  override_suspend_until: Date;
  suspend_reason: string;
  suspend_type: string;
  created_at: Date;
  activated_at: Date;
  updated_at: Date;
  suspended_at: Date;
  terminated_at: Date;
  auto_terminate_date: Date;
  auto_terminate_reason: string;
  current_service_cycle_end: Date;
  paid_until: Date;
  next_expiration_date: Date;
  next_invoice_date: Date;
  plugin_data: string;
  domain_name: string;
  cancellation_request: object;
  last_service_cycle_state: string;
  status_display?: string;
  hosting_account: IServiceHostingAccountModel;
}
