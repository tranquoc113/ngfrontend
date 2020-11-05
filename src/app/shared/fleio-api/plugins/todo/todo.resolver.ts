import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ITodoModel } from './model/todo.model';
import { TodoApiService } from './todo-api.service';

@Injectable({
  providedIn: 'root'
})
export class TodoResolver implements Resolve<ITodoModel> {
  constructor(private todoApiService: TodoApiService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
    Observable<ITodoModel> | Promise<ITodoModel> | ITodoModel {
    return this.todoApiService.get(route.params.id).pipe(catchError(() => of(null)));
  }
}
