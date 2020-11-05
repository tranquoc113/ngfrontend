import { Component, OnInit } from '@angular/core';
import { ListBase } from '@objects-view/list-base';
import { ActivatedRoute } from '@angular/router';
import { RefreshService } from '@shared/ui-api/refresh.service';
import { ISecurityGroupModel } from '@fleio-api/openstack/model/security-group.model';
import { SecurityGroupsListUiService } from '../security-groups-list-ui.service';

@Component({
  selector: 'app-security-group-list',
  templateUrl: './security-group-list.component.html',
  styleUrls: ['./security-group-list.component.scss']
})
export class SecurityGroupListComponent extends ListBase<ISecurityGroupModel> implements OnInit {

  constructor(
    private route: ActivatedRoute, private securityGroupsListUiService: SecurityGroupsListUiService,
    private refreshService: RefreshService,
  ) {
    super(route, securityGroupsListUiService, refreshService, 'securityGroups');
  }

  ngOnInit() {
    super.ngOnInit();
  }

}
