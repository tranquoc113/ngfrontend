import { ChangeDetectorRef, Component, NgZone, OnInit } from '@angular/core';
import { DetailsComponentBase } from '@objects-view/details-component-base';
import { IInstanceModel } from '@fleio-api/openstack/model/instance.model';
import { AuthService } from '@shared/auth/auth.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { NotificationService } from '@shared/ui-api/notification.service';
import { PortsApiService } from '@fleio-api/openstack/port/ports-api.service';
import { IActionResult } from '@objects-view/interfaces/actions/action-result';
import { MatDialog } from '@angular/material/dialog';
import {
  InstanceDetailsAddPortDialogComponent
} from '@shared/common-dialogs/openstack/instances/instance-details-add-port-dialog/instance-details-add-port-dialog.component';
import { InstanceDetailsAddIpDialogComponent } from '@shared/common-dialogs/openstack/instances/instance-details-add-ip-dialog/instance-details-add-ip-dialog.component';
import {
  InstanceDetailsAutoAddIpDialogComponent
} from '@shared/common-dialogs/openstack/instances/instance-details-auto-add-ip-dialog/instance-details-auto-add-ip-dialog.component';
import { InstancesApiService } from '@fleio-api/openstack/instance/instances-api.service';
import { ConfigService } from '@shared/config/config.service';
import { IPortModel } from '@fleio-api/openstack/model/port.model';
import { InstanceDetailsAttachPortDialogComponent } from '@shared/common-dialogs/openstack/instances/instance-details-attach-port-dialog/instance-details-attach-port-dialog.component';
import { InstanceDetailsAssociateIpDialogComponent } from '@shared/common-dialogs/openstack/instances/instance-details-associate-ip-dialog/instance-details-associate-ip-dialog.component';

@Component({
  selector: 'app-instance-details-networking',
  templateUrl: './instance-details-networking.component.html',
  styleUrls: ['./instance-details-networking.component.scss']
})
export class InstanceDetailsNetworkingComponent extends DetailsComponentBase<IInstanceModel> implements OnInit {
  permissions: {};
  prevNetDetails: { ports: Array<IPortModel>} = null;
  constructor(
    public auth: AuthService,
    public config: ConfigService,
    private notificationService: NotificationService,
    private portsApiService: PortsApiService,
    private readonly matDialog: MatDialog,
    private instancesApi: InstancesApiService,
    ngZone: NgZone,
    changeDetectorRef: ChangeDetectorRef,
  ) {
    super(ngZone, changeDetectorRef);
  }

  public removePort(port) {
    let dialogResult$: Observable<string>;
    dialogResult$ = this.notificationService.confirmDialog({
        title: 'Delete port ' + port.id + '?',
        message: 'Are you sure?',
      });
    dialogResult$.subscribe(dialogResult => {
      if (dialogResult === 'yes') {
        this.portsApiService.delete(port.id).pipe(map(success => {
          if (success) {
            this.notificationService.showMessage('Port removal scheduled.');
            this.boostRefreshTimer();
          } else {
            this.notificationService.showMessage('Could not remove port.');
          }
        })).subscribe();
      }
    });
  }

  public detachPort(port: IPortModel) {
    let dialogResult$: Observable<string>;
    dialogResult$ = this.notificationService.confirmDialog({
        title: 'Detach port ' + port.id + '?',
        message: 'Are you sure?',
        importantMessage: 'Note that default ports (ports created automatically on instance create) are ' +
          'automatically deleted by OpenStack when they are detached.'
      });
    dialogResult$.subscribe(dialogResult => {
      if (dialogResult === 'yes') {
        this.instancesApi.detachPort(this.object.id, port.id).pipe(map(success => {
          if (success) {
            this.notificationService.showMessage('Port is being detached.');
            this.boostRefreshTimer();
          } else {
            this.notificationService.showMessage('Could not detach port.');
          }
        })).subscribe();
      }
    });
  }

  public removeIp(port, ip) {
    let dialogResult$: Observable<string>;
    dialogResult$ = this.notificationService.confirmDialog({
        title: 'Delete ip ' + ip.ip_address + '?',
        message: 'Are you sure?',
      });
    dialogResult$.subscribe(dialogResult => {
      if (dialogResult === 'yes') {
        this.portsApiService.objectPostAction(
          port.id,
          'remove_ip',
          {
            fixed_ips: [{ip_address: ip.ip_address, subnet_id: ip.subnet_id}],
            region: this.object.region
          }).pipe(map(success => {
          if (success) {
            this.notificationService.showMessage('Remove IP scheduled');
            this.boostRefreshTimer();
          } else {
            this.notificationService.showMessage('Could not remove ip.');
          }
        })).subscribe();
      }
    });
  }

  public openAddPortDialog() {
    return this.matDialog.open(
      InstanceDetailsAddPortDialogComponent, {
        data: {
          instance: this.object,
          project_id: this.object.project,
        }
    }).afterClosed().pipe(map(result => {
      if (result === true || result === 'true') {
        this.boostRefreshTimer();
        this.notificationService.showMessage('Add port scheduled');
      }
      return {message: result} as IActionResult;
    })).subscribe();
  }

  public openAttachPortDialog() {
    return this.matDialog.open(
      InstanceDetailsAttachPortDialogComponent, {
        data: {
          instance: this.object,
        }
    }).afterClosed().pipe(map(result => {
      if (result === true || result === 'true') {
        this.boostRefreshTimer();
        this.notificationService.showMessage('Port is being attached.');
      }
      return {message: result} as IActionResult;
    })).subscribe();
  }

  public openAssociateIpDialog() {
    this.instancesApi.getAssociateIpCreateOptions(this.object.id).subscribe(response => {
      return this.matDialog.open(
        InstanceDetailsAssociateIpDialogComponent, {
          data: {
            instance: this.object,
            ports: response.ports,
            freeIps: response.free_ips
          }
      }).afterClosed().pipe(map(result => {
        if (result === true || result === 'true') {
          this.boostRefreshTimer();
          this.notificationService.showMessage('Ip is being associated.');
        }
        return {message: result} as IActionResult;
      })).subscribe();
    }, error => {
      if (error.error && error.error.detail) {
        this.notificationService.showMessage(error.error.detail);
      } else {
        this.notificationService.showMessage('Error when trying to get associate ip options.');
      }
    });
  }

  public openAddIpDialog() {
    return this.matDialog.open(
      InstanceDetailsAddIpDialogComponent, {
        data: {
          instance: this.object
        }
    }).afterClosed().pipe(map(result => {
      if (result === true || result === 'true') {
        this.boostRefreshTimer();
        this.notificationService.showMessage('Add IP(s) scheduled');
      }
      return {message: result} as IActionResult;
    })).subscribe();
  }

  public openAddIpAutomaticallyDialog() {
    return this.matDialog.open(
      InstanceDetailsAutoAddIpDialogComponent, {
        data: {
          instance: this.object
        }
    }).afterClosed().pipe(map(result => {
      if (result === true || result === 'true') {
        this.prevNetDetails = JSON.parse(JSON.stringify(this.object.net_details));
        this.boostRefreshTimer();
        this.notificationService.showMessage('Add IP(s) scheduled');
      }
      return {message: result} as IActionResult;
    })).subscribe();
  }

  markNewIps () {
    if (this.prevNetDetails) {
      let i = 0;
      let j = 0;
      let k = 0;
      for (i = 0; i < this.prevNetDetails.ports.length; i++) {
        const port = this.prevNetDetails.ports[i];
        // tslint:disable-next-line:prefer-for-of
        for (k = 0; k < this.object.net_details.ports[i].ipv4s.length; k++) {
          for (j = 0; j < port.ipv4s.length; j++) {
            if (port.ipv4s[j].ip_address === this.object.net_details.ports[i].ipv4s[k].ip_address) {
              break;
            }
          }
          // new ip
          if (j === port.ipv4s.length) {
            this.object.net_details.ports[i].ipv4s[k].new = true;
          }
        }
        for (k = 0; k < this.object.net_details.ports[i].ipv6s.length; k++) {
          for (j = 0; j < port.ipv6s.length; j++) {
            if (port.ipv6s[j].ip_address === this.object.net_details.ports[i].ipv6s[k].ip_address) {
              break;
            }
          }
          // new ip
          if (j === port.ipv6s.length) {
            this.object.net_details.ports[i].ipv6s[k].new = true;
          }
        }
      }
    }
  };

  public dissociateIp(floatingIpAddress) {
    let dialogResult$: Observable<string>;
    dialogResult$ = this.notificationService.confirmDialog({
        title: `Disassociate floating IP ${floatingIpAddress}?`,
        message: 'Are you sure?',
      });
    dialogResult$.subscribe(dialogResult => {
      if (dialogResult === 'yes') {
        this.instancesApi.removeFloatingIp(this.object.id, floatingIpAddress).pipe(map(success => {
          if (success) {
            this.notificationService.showMessage('Ip is being removed.');
            this.boostRefreshTimer();
          } else {
            this.notificationService.showMessage('Could not remove ip.');
          }
        })).subscribe();
      }
    });
  }

  protected refreshData() {
    this.instancesApi.get(this.object.id).subscribe(result => {
      this.objectController.object = result;
      this.markNewIps();
    });
  }

  ngOnInit() {
    super.ngOnInit();
    if (this.objectController) {
      this.permissions = this.objectController.additionalObjects.permissions;
    }
    this.setupRefreshTimer(5000);
  }

}
