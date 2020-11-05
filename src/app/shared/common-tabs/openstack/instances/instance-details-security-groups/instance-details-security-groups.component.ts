import { ChangeDetectorRef, Component, NgZone, OnInit } from '@angular/core';
import { DetailsComponentBase } from '@objects-view/details-component-base';
import { IInstanceModel } from '@fleio-api/openstack/model/instance.model';
import { InstancesApiService } from '@fleio-api/openstack/instance/instances-api.service';
import { ISecurityGroupModel } from '@fleio-api/openstack/model/security-group.model';
import { NotificationService } from '@shared/ui-api/notification.service';
import { map } from 'rxjs/operators';
import { IActionResult } from '@objects-view/interfaces/actions/action-result';
import { MatDialog } from '@angular/material/dialog';
import { InstanceAssociateSecurityGroupDialogComponent } from '@shared/common-dialogs/openstack/instances/instance-associate-security-group-dialog/instance-associate-security-group-dialog.component';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-instance-details-security-groups',
  templateUrl: './instance-details-security-groups.component.html',
  styleUrls: ['./instance-details-security-groups.component.scss']
})
export class InstanceDetailsSecurityGroupsComponent extends DetailsComponentBase<IInstanceModel> implements OnInit {
  securityGroups: Array<ISecurityGroupModel> = [];
  permissions: {} = {};

  constructor(
    private instancesApiService: InstancesApiService,
    private notificationService: NotificationService,
    private readonly matDialog: MatDialog,
    ngZone: NgZone,
    changeDetectorRef: ChangeDetectorRef,
  ) {
    super(ngZone, changeDetectorRef);
  }

  protected refreshData() {
    this.instancesApiService.getSecurityGroups(this.object.id).subscribe(response => {
      this.securityGroups = response.security_groups;
    }, error => {
      this.notificationService.showMessage('Could not load security groups.');
    })
  }

  public dissociateGroup(group: ISecurityGroupModel) {
    let dialogResult$: Observable<string>;
    dialogResult$ = this.notificationService.confirmDialog({
        title: 'Dissociate security group ' + (group.name || group.id) + '?',
        message: 'Are you sure?',
      });
    dialogResult$.subscribe(dialogResult => {
      if (dialogResult === 'yes') {
        this.instancesApiService.dissociateSecurityGroup(
          this.object.id,
          group.id,
        ).subscribe(response => {
          this.notificationService.showMessage('Security group dissociation scheduled.');
          this.boostRefreshTimer();
        }, error => {
          this.notificationService.showMessage('Failed to dissociate security group.');
        })
      }
    });
  }

  public openAssociateSecurityGroupDialog() {
    return this.matDialog.open(
      InstanceAssociateSecurityGroupDialogComponent, {
        data: {
          instance: this.object
        }
    }).afterClosed().pipe(map(result => {
      if (result === true || result === 'true') {
        this.boostRefreshTimer();
        this.notificationService.showMessage('Associate group scheduled');
      }
      return {message: result} as IActionResult;
    })).subscribe();
  }

  ngOnInit() {
    super.ngOnInit();
    if (this.objectController) {
      this.permissions = this.objectController.additionalObjects.permissions;
    }
    this.setupRefreshTimer(10000);
  }

}
