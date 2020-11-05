import { FleioId } from '../../../base-model/base-fleio-object.model';
import { IPriceCyclesModel } from './price-cycle.model';
import { ITLDModel } from './tld.model';

export interface IDomainAvailabilityInfoModel {
  client_id?: FleioId;
  client_details?: string;
  available: boolean;
  adjusted_name?: string;
  prices?: IPriceCyclesModel;
  dns_prices?: IPriceCyclesModel;
  email_prices?: IPriceCyclesModel;
  id_prices?: IPriceCyclesModel;
  config?: {
    allow_domain_registration: boolean;
    allow_domain_transfer: boolean;
    enable_default_tld: boolean;
    default_tld: FleioId;
    enable_default_nameservers: boolean;
    default_nameserver1: string;
    default_nameserver2: string;
    default_nameserver3: string;
    default_nameserver4: string;
  }
  tld?: ITLDModel;
  error?: string;
}
