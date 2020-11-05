import { FleioId } from '../../base-model/base-fleio-object.model';
import { IProductCycleModel } from '@fleio-api/billing/model/product-cycle.model';
import { IProductModel } from '@fleio-api/billing/model/product.model';
import { IConfigOptionModel } from '@fleio-api/billing/model/config-option.model';
import { IServiceConfigOptionModel } from '@fleio-api/billing/model/service-config-option.model';

export interface IServiceUpgradeOptionsModel {
  id: FleioId;
  display_name: string;
  cycle: IProductCycleModel,
  status: string;
  upgrades: IProductModel[];
  existing_upgrade_invoice: FleioId,
  cycle_upgrades: IProductCycleModel[];
  product: IProductModel[];
  configurable_options: IServiceConfigOptionModel[];
  configurable_options_upgrades: IConfigOptionModel[];
}
