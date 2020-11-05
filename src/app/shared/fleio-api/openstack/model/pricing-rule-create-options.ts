import { ICurrencyModel } from '../../billing/model/currency.model';
import { IPricingPlanModel } from './pricing-plan.model';
import { IPricingRuleResource } from './pricing-rule-resource.model';

export interface IPricingRuleCreateOptions {
  currencies: ICurrencyModel[];
  plans: IPricingPlanModel[];
  resources: IPricingRuleResource[];
  attribute_units: {};
  time_units: {};
  number_operators: [string];
  string_operators: [string];
}
