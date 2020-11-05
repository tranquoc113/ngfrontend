import { IBaseFleioObjectModel } from '../../base-model/base-fleio-object.model';

export interface ISecurityGroupRuleModel extends IBaseFleioObjectModel {
  remote_group: any;
  remote_group_name: string;
  description: string;
  direction: string;
  protocol: string;
  ethertype: string;
  port_range_min: number;
  port_range_max: number;
  remote_ip_prefix: string;
  display?: string;
}
