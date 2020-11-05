import { Component, OnDestroy, OnInit } from '@angular/core';
import { DetailsBase } from '@objects-view/details-base';
import { ActivatedRoute } from '@angular/router';
import { ISecurityGroupModel } from '@fleio-api/openstack/model/security-group.model';
import { SecurityGroupsListUiService } from '../security-groups-list-ui.service';

@Component({
  selector: 'app-security-group-details',
  templateUrl: './security-group-details.component.html',
  styleUrls: ['./security-group-details.component.scss']
})
export class SecurityGroupDetailsComponent extends DetailsBase<ISecurityGroupModel> implements OnInit, OnDestroy {
  constructor(route: ActivatedRoute, securityGroupsListUiService: SecurityGroupsListUiService) {
    super(route, securityGroupsListUiService, 'details', 'securityGroup');
  }
}
