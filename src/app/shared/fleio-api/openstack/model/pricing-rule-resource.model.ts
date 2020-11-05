import { IPricingRuleAttribute } from './pricing-rule-attribute.model';

export interface IPricingRuleResource {
  name: string;
  type: string;
  id: number;
  metric_display: boolean;
  metrics: {
    name: string;
    help_text: string;
    display_name: string,
    reaggregation: string,
    billing_based_on_existence: boolean
  }[];
  attribute_display: boolean;
  attributes: IPricingRuleAttribute[];
}
