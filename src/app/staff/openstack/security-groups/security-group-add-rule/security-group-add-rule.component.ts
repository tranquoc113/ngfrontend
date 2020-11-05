import { Component, OnDestroy, OnInit } from '@angular/core';
import { DetailsBase } from '@objects-view/details-base';
import { ISecurityGroupModel } from '@fleio-api/openstack/model/security-group.model';
import { ActivatedRoute } from '@angular/router';
import { SecurityGroupsListUiService } from '../security-groups-list-ui.service';

@Component({
  selector: 'app-security-group-add-rule',
  templateUrl: './security-group-add-rule.component.html',
  styleUrls: ['./security-group-add-rule.component.scss']
})
export class SecurityGroupAddRuleComponent extends DetailsBase<ISecurityGroupModel> implements OnInit, OnDestroy {
  constructor(route: ActivatedRoute, securityGroupsListUiService: SecurityGroupsListUiService) {
    super(route, securityGroupsListUiService, 'add-rule', 'securityGroup');
  }
}
