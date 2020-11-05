import { Component, OnInit } from '@angular/core';
import { DetailsComponentBase } from '../../../../../shared/ui/objects-view/details-component-base';
import { IActivityLogModel } from '../../../../../shared/fleio-api/utils/model/activity-log.model';
import { TaskLogApiService } from '../../../../../shared/fleio-api/utils/task-log/task-log-api.service';
import { ITaskModel } from '../../../../../shared/fleio-api/utils/model/task.model';
import { IObjectStatus, StatusType, StatusValue } from '../../../../../shared/ui/objects-view/interfaces/object-status';
import { LineDirection } from '../../../../../shared/ui/objects-view/status-line/status-line.component';
import { LineTypePipe } from '../../../../../shared/ui/objects-view/status-line/line-type.pipe';
import { LineColorPipe } from '../../../../../shared/ui/objects-view/status-line/line-color.pipe';
import { BaseAction } from '../../../../../shared/ui/objects-view/actions/base-action';
import { ApiCallAction, CallType } from '../../../../../shared/ui/objects-view/actions/api-call-action';


interface ITaskDetails {
  task: ITaskModel;
  status: IObjectStatus;
  taskLogLoaded: boolean;
  taskLogLoading: boolean;
  taskLogVisible: boolean;
  taskLog?: string;
  actions: BaseAction[]
}

@Component({
  selector: 'app-activity-log-detail',
  templateUrl: './activity-log-detail.component.html',
  styleUrls: ['./activity-log-detail.component.scss'],
  providers: [LineColorPipe, LineTypePipe]
})
export class ActivityLogDetailComponent extends DetailsComponentBase<IActivityLogModel> implements OnInit {
  constructor(private taskLogApi: TaskLogApiService) {
    super();
  }

  tasksDetails: ITaskDetails[] = null;

  statusLineDirection = LineDirection.Vertical;

  ngOnInit() {
    super.ngOnInit();
    if (this.object && this.object.tasks_count > 0) {
      this.taskLogApi.getTasksForActivity(this.object.id).subscribe(tasks => {
        this.tasksDetails = []
        for (const taskIndex of Object.keys(tasks)) {
          const task = tasks[taskIndex]
          let taskStatus = StatusValue.Undefined;
          switch (task.state) {
            case 'pending':
              taskStatus = StatusValue.Pending;
              break;
            case 'started':
              taskStatus = StatusValue.Started;
              break;
            case 'retry':
              taskStatus = StatusValue.Retry;
              break;
            case 'failure':
              taskStatus = StatusValue.Failed;
              break;
            case 'success':
              taskStatus = StatusValue.Success;
              break;
          }
          this.tasksDetails.push({
            task,
            status: {
              type: StatusType.Defined,
              value: taskStatus,
            },
            taskLogLoaded: false,
            taskLogVisible: false,
            taskLogLoading: false,
            actions: [
              new ApiCallAction({
                icon: {name: 'reboot', class: 'fl-icons'},
                tooltip: 'Recreate task',
                name: 'Recreate task and run again',
                confirmOptions: {
                  confirm: true,
                  title: 'Recreate task and run again',
                  message: `Are you sure you want to Recreate task ${task.id} and run again`,
                },
                object: task,
                apiService: this.taskLogApi,
                callType: CallType.Post,
                apiAction: 'recreate',
                apiParams: {},
              }),
            ]
          });
        }
      });
    }
  }

  toggleTaskLog(taskDetails: ITaskDetails) {
    taskDetails.taskLogVisible = !taskDetails.taskLogVisible;
    if (!taskDetails.taskLogLoading && taskDetails.taskLogVisible) {
      taskDetails.taskLogLoading = true;
      this.taskLogApi.getTaskLog(taskDetails.task.id).subscribe(taskLog => {
        taskDetails.taskLog = taskLog;
        taskDetails.taskLogLoaded = true;
      })
    }
  }
}
