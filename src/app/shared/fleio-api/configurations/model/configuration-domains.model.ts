import { IBaseFleioObjectModel } from '../../base-model/base-fleio-object.model';

export interface IConfigurationDomainsModel extends IBaseFleioObjectModel {
    allow_domain_registration: boolean;
    allow_domain_transfer: boolean
    enable_default_tld: boolean
    default_tld: string;
    enable_default_nameservers: boolean;
    default_nameserver1: string;
    default_nameserver2: string;
    default_nameserver3: string;
    default_nameserver4: string;
}
