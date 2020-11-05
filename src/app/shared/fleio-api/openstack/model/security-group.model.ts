import { IBaseFleioObjectModel } from '../../base-model/base-fleio-object.model';
import { IInstanceModel } from '@fleio-api/openstack/model/instance.model';
import { ISecurityGroupRuleModel } from '@fleio-api/openstack/model/security-group-rule.model';

export interface ISecurityGroupModel extends IBaseFleioObjectModel {
  associated_instances: Array<IInstanceModel>;
  project: string;
  description: string;
  name: string;
  created_at: Date;
  updated_at: Date;
  region: string;
  security_group_rules: Array<ISecurityGroupRuleModel>;
}
