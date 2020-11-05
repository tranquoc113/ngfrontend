import { IBaseFleioObjectModel } from '../../base-model/base-fleio-object.model';
import { IFlavorGroupModel } from '@fleio-api/openstack/model/flavor-group.model';

export interface IFlavorModel extends IBaseFleioObjectModel {
  show_in_fleio: boolean;
  display_for_clients: boolean;
  reseller_resources: any;
  is_public: boolean;
  disabled: boolean;
  memory_gb: number;
  flavor_group: IFlavorGroupModel;
  name: string;
  description: string;
  memory_mb: string;
  vcpus: number;
  swap: number;
  root_gb: number;
  ephemeral_gb: number;
  out_of_stock?: boolean;
  region: string;
  properties: any;
  show_to_groups: Array<{
    id: string;
    name: string;
  }>;
}
