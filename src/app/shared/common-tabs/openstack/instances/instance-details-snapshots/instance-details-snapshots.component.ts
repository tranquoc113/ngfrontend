import { ChangeDetectorRef, Component, NgZone, OnInit } from '@angular/core';
import { DetailsComponentBase } from '@objects-view/details-component-base';
import { IInstanceModel } from '@fleio-api/openstack/model/instance.model';
import { ImagesApiService } from '@fleio-api/openstack/image/image-api.service';
import { IImageModel } from '@fleio-api/openstack/model/image.model';
import { MatDialog } from '@angular/material/dialog';
import { IActionResult } from '@objects-view/interfaces/actions/action-result';
import {
  InstanceDetailsCreateSnapshotDialogComponent
} from '@shared/common-dialogs/openstack/instances/instance-details-create-snapshot-dialog/instance-details-create-snapshot-dialog.component';
import { NotificationService } from '@shared/ui-api/notification.service';
import { ConfigService } from '@shared/config/config.service';

export interface IGetSnapshotsForInstanceResponse {
  objects: IImageModel[];
  volume_snapshots_count: number;
}

@Component({
  selector: 'app-instance-details-snapshots',
  templateUrl: './instance-details-snapshots.component.html',
  styleUrls: ['./instance-details-snapshots.component.scss']
})
export class InstanceDetailsSnapshotsComponent extends DetailsComponentBase<IInstanceModel> implements OnInit {
  snapshots: IImageModel[];
  volumeSnapshotsCount = 0;
  loading = null;
  displayedColumns: string[] = ['name', 'status', 'size', 'created_at', 'client'];
  permissions: {};
  constructor(
    private notificationService: NotificationService,
    private imagesApiService: ImagesApiService,
    private matDialog: MatDialog,
    public config: ConfigService,
    ngZone: NgZone,
    changeDetectorRef: ChangeDetectorRef,
  ) {
    super(ngZone, changeDetectorRef);
  }

  private loadSnapshots() {
    if (this.loading === null) {
      // show loading only the first time
      this.loading = true;
    }
    this.imagesApiService.getAction(
      'get_snapshots_for_instance',
      {
        instance_uuid: this.object.id
      }).pipe().subscribe((response: IGetSnapshotsForInstanceResponse) => {
        this.snapshots = response.objects;
        this.volumeSnapshotsCount = response.volume_snapshots_count;
        this.loading = false;
    });
  }

  public openCreateSnapshotDialog() {
    return this.matDialog.open(
      InstanceDetailsCreateSnapshotDialogComponent, {
        data: {
          instanceId: this.object.id,
          instanceName: this.object.name
        }
    }).afterClosed().pipe().subscribe(result => {
      if (result === false) {
        return ;
      }
      this.notificationService.showMessage('Snapshot scheduled for creation.');
      this.boostRefreshTimer();
      return {message: result} as IActionResult;
    });
  }

  public readableBytes(bytes: number | null) {
    if (bytes === null) {
      return 'Size info not available';
    }
    if (bytes === 0) {
      return '0 bytes';
    }
    const i = Math.floor(Math.log(bytes) / Math.log(1024));
    const sizes = ['B', 'KB', 'MB', 'GB'];
    // @ts-ignore
    return (bytes / Math.pow(1024, i)).toFixed(2) * 1 + ' ' + sizes[i];
  }

  protected refreshData() {
    this.loadSnapshots();
  }

  allowedAction(action: string) {
    return this.object.allowed_actions.indexOf(action) > -1;
  }

  ngOnInit() {
    super.ngOnInit();
    if (this.objectController) {
      this.permissions = this.objectController.additionalObjects.permissions;
    }
    this.setupRefreshTimer(10000);
  }

}
