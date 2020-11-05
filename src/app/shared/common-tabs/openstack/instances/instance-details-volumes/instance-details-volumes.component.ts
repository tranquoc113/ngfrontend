import { ChangeDetectorRef, Component, NgZone, OnInit } from '@angular/core';
import { DetailsComponentBase } from '@objects-view/details-component-base';
import { IInstanceModel } from '@fleio-api/openstack/model/instance.model';
import { MatDialog } from '@angular/material/dialog';
import { map } from 'rxjs/operators';
import { IActionResult } from '@objects-view/interfaces/actions/action-result';
import { NotificationService } from '@shared/ui-api/notification.service';
import { IVolumeModel } from '@fleio-api/openstack/model/volume.model';
import { VolumesApiService } from '@fleio-api/openstack/volume/volumes-api.service';
import { Observable } from 'rxjs';
import { InstancesApiService } from '@fleio-api/openstack/instance/instances-api.service';
import { InstanceDetailsAttachVolumeDialogComponent } from '@shared/common-dialogs/openstack/instances/instance-details-attach-volume-dialog/instance-details-attach-volume-dialog.component';
import { ConfigService } from '@shared/config/config.service';

export interface IAttachedVolumesForInstanceResponse {
  objects: {
    volume: IVolumeModel
  }[];
}

@Component({
  selector: 'app-instance-details-snapshots',
  templateUrl: './instance-details-volumes.component.html',
  styleUrls: ['./instance-details-volumes.component.scss']
})
export class InstanceDetailsVolumesComponent extends DetailsComponentBase<IInstanceModel> implements OnInit {
  attachedVolumesResponse: IAttachedVolumesForInstanceResponse | null;
  loading = null;
  displayedColumns: string[] = ['display_name', 'status', 'size', 'has_snapshots', 'actions'];
  permissions: {};
  constructor(
    private notificationService: NotificationService,
    private volumesApiService: VolumesApiService,
    private instancesApiService: InstancesApiService,
    private matDialog: MatDialog,
    public config: ConfigService,
    ngZone: NgZone,
    changeDetectorRef: ChangeDetectorRef,
  ) {
    super(ngZone, changeDetectorRef);
    this.matDialog = matDialog;
  }

  private loadVolumes() {
    if (this.loading === null) {
      // refresh only the first time
      this.loading = true;
    }
    this.volumesApiService.getAction(
      'get_attachments',
      {
        instance_uuid: this.object.id
      }).pipe().subscribe((response: IAttachedVolumesForInstanceResponse) => {
        this.attachedVolumesResponse = response;
        this.loading = false;
    });
  }

  public detachVolume(volumeId) {
    let dialogResult$: Observable<string>;
    dialogResult$ = this.notificationService.confirmDialog({
        title: 'Detach volume ' + volumeId + '?',
        message: 'Are you sure?',
      });
    dialogResult$.subscribe(dialogResult => {
      if (dialogResult === 'yes') {
        this.instancesApiService.objectPostAction(
          this.object.id,
          'detach_volume',
          {
            volume_id: volumeId
          }
        ).pipe(map(success => {
          if (success) {
            this.notificationService.showMessage('Volume detach scheduled.');
            this.boostRefreshTimer();
          } else {
            this.notificationService.showMessage('Could not detach volume.');
          }
        })).subscribe();
      }
    });
  }

  public openAttachVolumeDialog() {
    return this.matDialog.open(
      InstanceDetailsAttachVolumeDialogComponent, {
        data: {
          instanceId: this.object.id,
          instanceName: this.object.name,
          project: this.object.project,
          region: this.object.region
        }
    }).afterClosed().pipe(map(result => {
      if (result === false) {
        return ;
      }
      this.notificationService.showMessage('Attaching volume...');
      this.boostRefreshTimer();
      return {message: result} as IActionResult;
    })).subscribe();
  }

  protected refreshData() {
    this.loadVolumes();
  }

  allowedAction(action: string) {
    if (this.object) {
      return this.object.allowed_actions.indexOf(action) > -1;
    }
    return false;
  }

  ngOnInit() {
    super.ngOnInit();
    if (this.objectController) {
      this.permissions = this.objectController.additionalObjects.permissions;
    }
    this.attachedVolumesResponse = null;
    this.setupRefreshTimer(5000);
  }

}
