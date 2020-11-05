import { Component, OnDestroy, OnInit } from '@angular/core';
import { DetailsBase } from '@objects-view/details-base';
import { ActivatedRoute } from '@angular/router';
import { ISecurityGroupModel } from '@fleio-api/openstack/model/security-group.model';
import { SecurityGroupsListUiService } from '../security-groups-list-ui.service';

@Component({
  selector: 'app-security-group-edit',
  templateUrl: './security-group-edit.component.html',
  styleUrls: ['./security-group-edit.component.scss']
})
export class SecurityGroupEditComponent extends DetailsBase<ISecurityGroupModel> implements OnInit, OnDestroy {

  constructor(route: ActivatedRoute, securityGroupsListUiService: SecurityGroupsListUiService) {
    super(route, securityGroupsListUiService, 'edit', 'securityGroup');
  }
}
