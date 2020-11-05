import { FleioId } from '@fleio-api/base-model/base-fleio-object.model';
import { IProductModel } from '@fleio-api/billing/model/product.model';

export interface IServiceUpgradeModel {
  confirm?: boolean;
  cycle: FleioId;
  product?: IProductModel | FleioId;
  service_remaining_cost?: number;
  new_product_cycle?: FleioId;
  upgrade_price?: number;
  product_upgrade_price?: number;
  taxes_applied?: { string: number };
  total_due?: number;
  service_id?: FleioId;
  product_id?: FleioId;
  cycle_id?: FleioId;
  display_name?: string;
  currency?: string;
  invoice?: FleioId;
  configurable_options: {
    option: FleioId;
    option_value: string;
    display_name?: string;
    is_free?: boolean;
    price?: number;
    upgrade_cost?: number;
    has_price?: boolean;
    taxable?: boolean;
    unit_price?: number;
    quantity?: number;
    setupfee?: number;
  }[]
}
