import { BaseAction } from './base-action';
import { Observable, of } from 'rxjs';
import { IActionResult } from '../interfaces/actions/action-result';
import { catchError, map } from 'rxjs/operators';
import { FleioApiService } from '@fleio-api/fleio-api.service';
import { IBaseFleioObjectModel } from '@fleio-api/base-model/base-fleio-object.model';
import { HttpErrorResponse } from '@angular/common/http';

export enum CallType {
  Post,
  Delete
}

export class ApiCallAction extends BaseAction {
  apiService: FleioApiService<IBaseFleioObjectModel>;
  apiAction: string;
  apiParams: {};
  callType: CallType;
  successMessage: string;
  errorMessage: string;
  endpointIdentifier: any;

  constructor(init?: Partial<ApiCallAction>) {
    super(init);
    if (!this.callType) {
      this.callType = CallType.Post;
    }
  }

  executeImpl(): Observable<IActionResult> {
    if (!this.endpointIdentifier) {
      this.endpointIdentifier = this.object.id;
    }
    switch (this.callType) {
      case CallType.Post:
        return this.apiService.objectPostAction(this.endpointIdentifier, this.apiAction, this.apiParams).pipe(
          map(response => {
            if (response.detail) {
              return {message: response.detail};
            } else {
              console.warn('Unable to extract message from backend response');
              console.warn(response);
              return null;
            }
          })
        );
      case CallType.Delete:
        return this.apiService.delete(this.object.id).pipe(map(() => {
          const message: string = this.successMessage || 'Object deleted successfully';
          return {message};
        })).pipe(catchError((error: HttpErrorResponse) => {
          let message = error && error.error && error.error.detail ? error.error.detail: 'Failed to delete object';
          message = this.errorMessage || message;
          return of({message});
        }));
      default:
        console.warn('Unsupported call type in action');
        return of({message: 'Unsupported call type'});
    }
  }
}
