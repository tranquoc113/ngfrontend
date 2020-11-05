import { IBaseFleioObjectModel } from '../../base-model/base-fleio-object.model';
import { ITieredPrice } from './tiered-price';

export interface IPricingRuleModel extends IBaseFleioObjectModel {
  display_name: string;
  resource_type: string;
  priority: number;
  resource_name: string;
  price: number;
  pricing_attribute: string | null;
  display_unit: string;
  modifiers_count: number;
  tiered_price: ITieredPrice[];
  pricing?: {
    prices: [];
    attribute?: string;
    attribute_unit?: string;
    time_unit?: string;
  };
  attribute?: string;
  attribute_unit?: string;
  time_unit?: string;
  modifiers?: [];
  conditions?: [];
  resource?: number;
  plan?: number;
  start_dt: Date;
  end_dt: Date;
}
