import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ITodoCreateOptionsModel } from './model/todo-create-options.model';
import { TodoApiService } from './todo-api.service';

@Injectable({
  providedIn: 'root'
})
export class TodoCreateOptionsResolver implements Resolve<ITodoCreateOptionsModel> {
  constructor(private todoApiService: TodoApiService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
    Observable<ITodoCreateOptionsModel> | Promise<ITodoCreateOptionsModel> | ITodoCreateOptionsModel {
    return this.todoApiService.createOptions()
      .pipe(catchError(() => of(null))) as unknown as ITodoCreateOptionsModel;
  }
}
