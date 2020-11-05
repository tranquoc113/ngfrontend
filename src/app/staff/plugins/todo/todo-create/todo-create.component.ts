import { Component, OnDestroy, OnInit } from '@angular/core';
import { DetailsBase } from '../../../../shared/ui/objects-view/details-base';
import { ActivatedRoute } from '@angular/router';
import { ITodoModel } from '../../../../shared/fleio-api/plugins/todo/model/todo.model';
import { TodoListUiService } from '../todo-list-ui.service';

@Component({
  selector: 'app-todo-create',
  templateUrl: './todo-create.component.html',
  styleUrls: ['./todo-create.component.scss']
})
export class TodoCreateComponent extends DetailsBase<ITodoModel> implements OnInit, OnDestroy {

  constructor(route: ActivatedRoute, todoListUiService: TodoListUiService) {
    super(route, todoListUiService, 'create', null);
  }
}
