import { BaseAction } from './base-action';
import { Observable, of } from 'rxjs';
import { IActionResult } from '../interfaces/actions/action-result';

export class CallbackAction extends BaseAction {
  callback?: (action: CallbackAction) => Observable<IActionResult>;
  needsResult?: boolean;

  constructor(init: Partial<CallbackAction>) {
    super(init);
    if (!this.options) {
      this.options = {displayConfirmation: false, displayMessages: false };
    }
    this.refreshAfterExecute = init ? !!init.refreshAfterExecute : false;
  }

  executeImpl(): Observable<IActionResult> {
    if (this.callback) {
      return this.callback(this);
    }

    return of(null);
  }
}
