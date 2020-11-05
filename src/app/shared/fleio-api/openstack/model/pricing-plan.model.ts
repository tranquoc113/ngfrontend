import { IBaseFleioObjectModel } from '../../base-model/base-fleio-object.model';
import { IPricingRuleModel } from './pricing-rule.model';
import { IClientModel } from '../../client-user/model/client.model';

export interface IPricingPlanModel extends IBaseFleioObjectModel {
  pricing_rules: IPricingRuleModel[];
  services_count: number;
  name: string;
  is_default: boolean;
  currency: string;
  reseller_resources: number;
  reseller_client: IClientModel;
}
