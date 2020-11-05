import { FleioId, IBaseFleioObjectModel } from '../../base-model/base-fleio-object.model';
import { IPricingPlanModel } from '../../openstack/model/pricing-plan.model';

export interface IClientModel extends IBaseFleioObjectModel {
  name: string;
  first_name: string;
  last_name: string;
  company: string;
  city: string;
  country: string;
  state: string;
  date_created: Date;
  currency: string; // TODO: we should use currency model here and in backend
  phone: string;
  country_name: string;
  long_name: string;
  email: string;
  vat_id: number;
  status: string;
  reseller_client: FleioId;
  uptodate_credit: number;
  suspend_instead_of_terminate: boolean;
  configuration_name: string;
  group_name: string;
  has_billing_agreement: boolean;
  outofcredit_datetime: Date;
  address1?: string;
  address2?: string;
  zip_code?: number;
  tax_exempt?: boolean;
  custom_fields?: object;
  openstack_billing_plans?: Array<IPricingPlanModel>;
  credits: {
    client: FleioId;
    amount: number;
    currency: string;
  }[];
}
