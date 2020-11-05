import { Component, OnInit } from '@angular/core';
import { DetailsFormBase } from '../../../../../shared/ui/objects-view/details-form-base';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfigService } from '../../../../../shared/config/config.service';
import { IAction } from '../../../../../shared/ui/objects-view/interfaces/actions/action';
import { Observable, of } from 'rxjs';
import { IActionResult } from '../../../../../shared/ui/objects-view/interfaces/actions/action-result';
import { ITodoModel } from '../../../../../shared/fleio-api/plugins/todo/model/todo.model';
import { TodoApiService } from '../../../../../shared/fleio-api/plugins/todo/todo-api.service';
import { ITodoCreateOptionsModel } from '../../../../../shared/fleio-api/plugins/todo/model/todo-create-options.model';
import { map, mergeMap, startWith } from 'rxjs/operators';
import { IUserModel } from '../../../../../shared/fleio-api/client-user/model/user.model';
import { UsersApiService } from '../../../../../shared/fleio-api/client-user/user/users-api.service';

@Component({
  selector: 'app-todo-edit-form',
  templateUrl: './todo-edit-form.component.html',
  styleUrls: ['./todo-edit-form.component.scss']
})
export class TodoEditFormComponent extends DetailsFormBase<ITodoModel> implements OnInit {
  todoForm = this.formBuilder.group({
    title: ['', Validators.required],
    status: ['open', Validators.required],
    assigned_to: [null],
    description: [''],
  });

  createOptions: ITodoCreateOptionsModel;
  filteredUsers$: Observable<IUserModel[]>;

  constructor(
    private formBuilder: FormBuilder,
    private todoApiService: TodoApiService,
    private router: Router,
    private config: ConfigService,
    private activatedRoute: ActivatedRoute,
    private usersApiService: UsersApiService,
  ) {
    super();
  }

  displayUserFn(user: IUserModel) {
    return user.full_name || user.id;
  }

  clickedUserInput() {
    this.todoForm.controls.assigned_to.setValue('');
  }


  ngOnInit() {
    super.ngOnInit();
    if (this.objectController) {
      this.objectController.actionCallback = (action: IAction) => this.todoActions(action);
    }
    this.createOptions = this.activatedRoute.snapshot.data.createOptions;

    if (this.object) {
      this.todoForm.patchValue(this.object);
      this.todoForm.controls.assigned_to.setValue({
        id: this.object.assigned_to,
        full_name: this.object.assigned_to_display,
      });
    }

    this.filteredUsers$ = this.todoForm.controls.assigned_to.valueChanges.pipe(
      startWith(''),
      map(value => {
        return typeof value === 'string' ? value : value.id;
      }),
      mergeMap(value => {
        return this.usersApiService.list({
          search: value,
          is_staff: true,
        }).pipe(map(usersList => usersList.objects));
      })
    );
  }

  todoActions(action: IAction): Observable<IActionResult> {
    const value = this.todoForm.value as ITodoModel;
    if (value.assigned_to instanceof Object) {
      if (value.assigned_to.id) {
        value.assigned_to = value.assigned_to.id;
      } else {
        value.assigned_to = null;
      }
    }
    this.createOrUpdate(
      this.todoApiService,
      value,
    ).subscribe(() => {
      this.router.navigateByUrl(
        this.config.getPrevUrl('plugins/todo')
      ).catch(() => {
      });
    });

    return of(null);
  }
}
