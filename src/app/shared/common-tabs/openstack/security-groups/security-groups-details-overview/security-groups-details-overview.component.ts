import { Component } from '@angular/core';
import { DetailsComponentBase } from '@objects-view/details-component-base';
import { ISecurityGroupModel } from '@fleio-api/openstack/model/security-group.model';
import { ConfigService } from '@shared/config/config.service';
import { FleioId } from '@fleio-api/base-model/base-fleio-object.model';
import { Observable } from 'rxjs';
import { NotificationService } from '@shared/ui-api/notification.service';
import { SecurityGroupsApiService } from '@fleio-api/openstack/security-groups/security-groups-api.service';

@Component({
  selector: 'app-security-groups-details-overview',
  templateUrl: './security-groups-details-overview.component.html',
  styleUrls: ['./security-groups-details-overview.component.scss']
})
export class SecurityGroupsDetailsOverviewComponent extends DetailsComponentBase<ISecurityGroupModel> {
  displayedColumns = ['direction', 'type', 'protocol', 'ports', 'cidr', 'remote_group', 'actions'];

  constructor(
    public config: ConfigService,
    private notificationService: NotificationService,
    private securityGroupsApiService: SecurityGroupsApiService,
  ) {
    super();
  }

  protected refreshData() {
    this.securityGroupsApiService.get(this.object.id).subscribe(result => {
      this.objectController.object = result;
    });
  }

  deleteRule(ruleId: FleioId) {
    let dialogResult$: Observable<string>;
    dialogResult$ = this.notificationService.confirmDialog({
        title: `Delete security group rule ${ruleId}?`,
        message: 'Are you sure?',
      });
    dialogResult$.subscribe(dialogResult => {
      if (dialogResult === 'yes') {
        this.securityGroupsApiService.deleteRule(this.object.id, ruleId).subscribe(response => {
          this.notificationService.showMessage('Delete rule scheduled');
          this.refreshData();
        }, error => {
          this.notificationService.showMessage('Failed to delete rule');
        })
      }
    });
  }

}
