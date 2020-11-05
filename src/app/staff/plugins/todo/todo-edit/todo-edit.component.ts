import { Component, OnDestroy, OnInit } from '@angular/core';
import { DetailsBase } from '../../../../shared/ui/objects-view/details-base';
import { ActivatedRoute } from '@angular/router';
import { ITodoModel } from '../../../../shared/fleio-api/plugins/todo/model/todo.model';
import { TodoListUiService } from '../todo-list-ui.service';

@Component({
  selector: 'app-todo-edit',
  templateUrl: './todo-edit.component.html',
  styleUrls: ['./todo-edit.component.scss']
})
export class TodoEditComponent extends DetailsBase<ITodoModel> implements OnInit, OnDestroy {

  constructor(route: ActivatedRoute, todoListUiService: TodoListUiService) {
    super(route, todoListUiService, 'edit', 'todo');
  }
}
