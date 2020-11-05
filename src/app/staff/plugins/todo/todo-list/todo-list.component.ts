import { Component, OnInit } from '@angular/core';
import { ListBase } from '../../../../shared/ui/objects-view/list-base';
import { ActivatedRoute } from '@angular/router';
import { RefreshService } from '../../../../shared/ui-api/refresh.service';
import { ITodoModel } from '../../../../shared/fleio-api/plugins/todo/model/todo.model';
import { TodoListUiService } from '../todo-list-ui.service';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent extends ListBase<ITodoModel> {

  constructor(
    private route: ActivatedRoute, private todoListUiService: TodoListUiService,
    private refreshService: RefreshService,
  ) {
    super(route, todoListUiService, refreshService, 'todos');
  }
}
