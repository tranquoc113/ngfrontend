import { FleioId, IBaseFleioObjectModel } from '../../../base-model/base-fleio-object.model';
import { ITLDModel } from './tld.model';
import { INameserverModel } from './nameserver.model';
import { IDomainContactModel } from './domain-contact.model';
import { IDomainRegistrarModel } from './domain-registrar.model';

export interface IDomainModel extends IBaseFleioObjectModel {
  name: string;
  status_display: string;
  tld: ITLDModel;
  price_display: string;
  nameservers: INameserverModel[];
  last_registrar_name: string;
  dns_management: boolean;
  email_forwarding: boolean;
  id_protection: boolean;
  contact: IDomainContactModel;
  client_id: FleioId;
  created_at: Date;
  updated_at: Date;
  managed: boolean;
  status: string;
  registration_date: Date;
  expiry_date: Date;
  registration_period: number;
  registrar_locked: boolean;
  epp_code: string;
  service: FleioId;
  assigned_to_service: FleioId;
  last_registrar: FleioId | IDomainRegistrarModel;
}
