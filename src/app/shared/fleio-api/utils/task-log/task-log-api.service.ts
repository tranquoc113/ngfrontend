import { Injectable } from '@angular/core';
import { ConfigService } from '../../../config/config.service';
import { FleioApiService } from '../../fleio-api.service';
import { HttpClient } from '@angular/common/http';
import { ITaskModel } from '../model/task.model';
import { Observable } from 'rxjs';
import { FleioObjectsList } from '../../fleio-objects-list';
import { FleioId } from '../../base-model/base-fleio-object.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TaskLogApiService extends FleioApiService<ITaskModel> {
  constructor(protected httpClient: HttpClient, protected config: ConfigService) {
    super();
    this.setEndpoint(config.getPanelApiUrl('tasklog'));
  }

  getTasksForActivity(activityId: FleioId): Observable<{[index:number]: ITaskModel}> {
    return this.getAction('get_tasks_for_activity', {activity_id: activityId}).pipe(
      map(tasks => tasks.objects),
    );
  }

  getTaskLog(taskId: FleioId): Observable<string> {
    return this.objectGetAction(taskId, 'get_task_log').pipe(map(result => result.task_log));
  }
}
