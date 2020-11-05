import { Component, OnDestroy, OnInit } from '@angular/core';
import { DetailsBase } from '../../../../shared/ui/objects-view/details-base';
import { ActivatedRoute } from '@angular/router';
import { TodoListUiService } from '../todo-list-ui.service';
import { ITodoModel } from '../../../../shared/fleio-api/plugins/todo/model/todo.model';

@Component({
  selector: 'app-todo-details',
  templateUrl: './todo-details.component.html',
  styleUrls: ['./todo-details.component.scss']
})
export class TodoDetailsComponent extends DetailsBase<ITodoModel> implements OnInit, OnDestroy {

  constructor(route: ActivatedRoute, todoListUiService: TodoListUiService) {
    super(route, todoListUiService, 'details', 'todo');
  }
}
