import { ICurrencyModel } from '../../billing/model/currency.model';
import { IPricingPlanModel } from './pricing-plan.model';

export interface IPricingPlanCreateOptions {
  currencies: ICurrencyModel[];
  non_default_plans: IPricingPlanModel[];
}
