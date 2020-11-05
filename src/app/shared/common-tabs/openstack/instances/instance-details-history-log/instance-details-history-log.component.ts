import { Component, OnInit } from '@angular/core';
import { DetailsComponentBase } from '@objects-view/details-component-base';
import { IInstanceModel } from '@fleio-api/openstack/model/instance.model';
import { InstancesApiService } from '@fleio-api/openstack/instance/instances-api.service';
import { IInstanceHistoryLogModel } from '@fleio-api/openstack/model/instance-history-log.model';
import { FleioObjectsList } from '@fleio-api/fleio-objects-list';
import { NotificationService } from '@shared/ui-api/notification.service';

@Component({
  selector: 'app-instance-details-history-log',
  templateUrl: './instance-details-history-log.component.html',
  styleUrls: ['./instance-details-history-log.component.scss']
})
export class InstanceDetailsHistoryLogComponent extends DetailsComponentBase<IInstanceModel> implements OnInit {
  historyLogs: IInstanceHistoryLogModel[];
  loading: boolean;

  constructor(private instancesApiService: InstancesApiService, private notificationService: NotificationService) {
    super();
  }

  private loadHistoryLog() {
    this.loading = true;
    this.instancesApiService.objectGetAction(
      this.object.id,
      'actions',
      {
        page_size: '20' // TODO: implement pagination
      }
    ).pipe().subscribe((response: FleioObjectsList<IInstanceHistoryLogModel>) => {
      this.historyLogs = response.objects;
      this.loading = false;
    }, error => {
      this.loading = false;
      this.notificationService.showMessage('Could not load history logs.');
    });
  }

  public openedLog(historyLog: IInstanceHistoryLogModel, index: number) {
    this.historyLogs[index].loading = true;
    this.instancesApiService.objectGetAction(
      this.object.id,
      'action_details',
      {
        request_id: historyLog.request_id
      }
    ).pipe().subscribe((response: IInstanceHistoryLogModel) => {
      this.historyLogs[index].events = response.events;
      this.historyLogs[index].loading = false;
    }, error => {
      this.notificationService.showMessage('Could not load history log details.');
      this.historyLogs[index].loading = false;
    });
  }

  ngOnInit() {
    super.ngOnInit();
    if (this.objectController) {
      this.objectController.currentTabIndex$.subscribe(newTabIndex => {
        if (newTabIndex === this.componentTabIndex) {
          this.loadHistoryLog();
        }
      });
    }
  }

}
