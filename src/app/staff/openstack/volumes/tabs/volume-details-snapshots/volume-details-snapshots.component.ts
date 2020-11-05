import { ChangeDetectorRef, Component, NgZone, OnInit } from '@angular/core';
import { DetailsComponentBase } from '@objects-view/details-component-base';
import { IVolumeModel } from '@fleio-api/openstack/model/volume.model';
import { ConfigService } from '@shared/config/config.service';
import { MatDialog } from '@angular/material/dialog';
import { NotificationService } from '@shared/ui-api/notification.service';
import { FleioObjectsList } from '@fleio-api/fleio-objects-list';
import { IAction } from '@objects-view/interfaces/actions/action';
import { IObjectStatus, StatusType, StatusValue } from '@objects-view/interfaces/object-status';
import { CallbackAction } from '@objects-view/actions/callback-action';
import { map } from 'rxjs/operators';
import { IActionResult } from '@objects-view/interfaces/actions/action-result';
import { ApiCallAction, CallType } from '@objects-view/actions/api-call-action';
import { LineDirection } from '@objects-view/status-line/status-line.component';
import { VolumeSnapshotsApiService } from '@fleio-api/openstack/volume/volume-snapshots-api.service';
import { IVolumeSnapshotModel } from '@fleio-api/openstack/model/volume-snapshot.model';
import { EditVolumeSnapshotDialogComponent } from '@shared/common-dialogs/volume-snapshots/edit-volume-snapshot-dialog/edit-volume-snapshot-dialog.component';
import { ResetVolumeSnapshotStateDialogComponent } from '@shared/common-dialogs/volume-snapshots/reset-volume-snapshot-state-dialog/reset-volume-snapshot-state-dialog.component';

@Component({
  selector: 'app-volume-details-snapshots',
  templateUrl: './volume-details-snapshots.component.html',
  styleUrls: ['./volume-details-snapshots.component.scss']
})
export class VolumeDetailsSnapshotsComponent extends DetailsComponentBase<IVolumeModel> implements OnInit {

  constructor(
    public config: ConfigService,
    private volumeSnapshotsApiService: VolumeSnapshotsApiService,
    private matDialog: MatDialog,
    private notificationService: NotificationService,
    ngZone: NgZone,
    changeDetectorRef: ChangeDetectorRef,
  ) {
    super(ngZone, changeDetectorRef);
  }

  snapshots: FleioObjectsList<IVolumeSnapshotModel>;
  snapshotActions: { [id: string]: IAction[] };
  snapshotStatus: { [id: string]: IObjectStatus };
  LineDirection = LineDirection;
  currentPage = 1;
  nextPage = false;
  previousPage = false;

  private getSnapshotActions(snapshot: IVolumeSnapshotModel): IAction[] {
    return [
      new CallbackAction(
        {
          object: this.object,
          icon: {name: 'edit'},
          tooltip: 'Update snapshot',
          name: 'Update',
          callback: () => {
            return this.matDialog.open(
              EditVolumeSnapshotDialogComponent, {
                data: {
                  volume: this.object,
                  snapshot,
                }
              }).afterClosed().pipe(map(result => {
              if (result === false) {
                return;
              }
              this.notificationService.showMessage('Snapshot update scheduled');
              return {message: result} as IActionResult;
            }));
          },
          refreshAfterExecute: true,
        }
      ),
      new CallbackAction(
        {
          object: this.object,
          icon: {name: 'redo'},
          tooltip: 'Reset state',
          name: 'Reset state',
          callback: () => {
            return this.matDialog.open(
              ResetVolumeSnapshotStateDialogComponent, {
                data: {
                  snapshot,
                }
              }).afterClosed().pipe(map(result => {
              if (result === false) {
                return;
              }
              this.notificationService.showMessage('Snapshot reset state scheduled');
              return {message: result} as IActionResult;
            }));
          },
          refreshAfterExecute: true,
        }
      ),
      new ApiCallAction(
        {
          object: snapshot,
          icon: {name: 'delete'},
          tooltip: 'Delete volume snapshot',
          name: 'Delete',
          confirmOptions: {
            confirm: true,
            title: 'Delete volume snapshot',
            message: `Are you sure you want to delete volume snapshot ${snapshot.name}`,
          },
          successMessage: 'Volume snapshot delete queued',
          errorMessage: 'Volume snapshot delete failed, check logs for details',
          apiService: this.volumeSnapshotsApiService,
          callType: CallType.Delete,
          refreshAfterExecute: true,
          redirectAfterExecute: false,
        }
      ),
    ];
  }

  ngOnInit(): void {
    super.ngOnInit();
    if (this.config && this.config.current && this.config.current.settings &&
      this.config.current.settings.refreshIntervals) {
      this.setupRefreshTimer(this.config.current.settings.refreshIntervals.volumeDetailsSnapshotsInterval);
    }

    if (this.objectController) {
      this.snapshots = this.objectController.additionalObjects.snapshots as FleioObjectsList<IVolumeSnapshotModel>;
      this.updateStatusAndActions();
    }
  }

  protected refreshData() {
    super.refreshData();
    this.volumeSnapshotsApiService.list({
      volume__id: this.object.id, page: this.currentPage,
    }).subscribe(snapshots => {
      this.snapshots = snapshots;
      this.updateStatusAndActions();
    });
  }

  createNewSnapshot() {
    return this.matDialog.open(
      EditVolumeSnapshotDialogComponent, {
        data: {
          volume: this.object,
        }
      }).afterClosed().pipe(map(result => {
      if (result === false) {
        return;
      }
      this.notificationService.showMessage('Snapshot create scheduled');
      return {message: result} as IActionResult;
    }));
  }

  changePage(action) {
    if (action === 'next') {
      this.currentPage = this.currentPage + 1;
      this.refreshData();
    }
    if (action === 'previous') {
      this.currentPage = this.currentPage - 1;
      this.refreshData();
    }
  };

  private updateStatusAndActions() {
    this.nextPage = !!this.snapshots.next;
    this.previousPage = !!this.snapshots.previous;
    this.snapshotActions = {};
    this.snapshotStatus = {};
    for (const snapshot of this.snapshots.objects) {
      this.snapshotActions[snapshot.id] = this.getSnapshotActions(snapshot);
      let status: IObjectStatus = null;
      switch (snapshot.status) {
        case 'creating':
        case 'restoring':
          status = {type: StatusType.Defined, value: StatusValue.Pending};
          break;
        case 'available':
          status = {type: StatusType.Defined, value: StatusValue.Available};
          break;
        case 'deleting':
          status = {type: StatusType.Defined, value: StatusValue.Deactivated};
          break;
        case 'error':
        case 'error_deleting':
          status = {type: StatusType.Defined, value: StatusValue.Error};
          break;
      }

      this.snapshotStatus[snapshot.id] = status;
    }
  }
}
