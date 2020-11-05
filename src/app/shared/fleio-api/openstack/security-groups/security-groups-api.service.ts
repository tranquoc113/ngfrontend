import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FleioApiService } from '../../fleio-api.service';
import { ConfigService } from '@shared/config/config.service';
import { ISecurityGroupModel } from '@fleio-api/openstack/model/security-group.model';
import { FleioId } from '@fleio-api/base-model/base-fleio-object.model';

@Injectable({
  providedIn: 'root'
})
export class SecurityGroupsApiService extends FleioApiService<ISecurityGroupModel> {
  constructor(protected httpClient: HttpClient, protected config: ConfigService) {
    super();
    this.setEndpoint(config.getPanelApiUrl('openstack/securitygroups'));
  }

  deleteRule(securityGroupId: FleioId, ruleId: FleioId) {
    return this.objectPostAction(securityGroupId, 'delete_rule', {
      rule_id: ruleId
    });
  }

  addRule(securityGroupId: FleioId, rule: {}) {
    return this.objectPostAction(securityGroupId, 'add_rule', rule);
  }

  getSecurityGroupsForProject(projectId: string) {
    return this.getAction('get_security_groups_for_project', {
      project_id: projectId
    });
  }

}
