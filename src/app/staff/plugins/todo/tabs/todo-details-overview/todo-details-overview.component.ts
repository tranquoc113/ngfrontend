import { Component, OnInit } from '@angular/core';
import { DetailsComponentBase } from '../../../../../shared/ui/objects-view/details-component-base';
import { ITodoModel } from '../../../../../shared/fleio-api/plugins/todo/model/todo.model';
import { ConfigService } from '../../../../../shared/config/config.service';
import { TodoApiService } from '../../../../../shared/fleio-api/plugins/todo/todo-api.service';
import { RefreshService } from '../../../../../shared/ui-api/refresh.service';
import { NotificationService } from '../../../../../shared/ui-api/notification.service';

@Component({
  selector: 'app-todo-details-overview',
  templateUrl: './todo-details-overview.component.html',
  styleUrls: ['./todo-details-overview.component.scss']
})
export class TodoDetailsOverviewComponent extends DetailsComponentBase<ITodoModel> {
  commentText: string;

  constructor(
    public config: ConfigService,
    private todoApi: TodoApiService,
    private refreshService: RefreshService,
    private notificationService: NotificationService,
  ) {
    super();
  }

  addComment(closeTodo: boolean) {
    this.todoApi.objectPostAction(this.object.id, 'add_comment', {
      comment_text: this.commentText,
      close_todo: closeTodo,
    }).subscribe(() => {
      this.commentText = '';
      this.notificationService.showMessage('Comment added');
      this.refreshService.refresh();
    });
  }
}
