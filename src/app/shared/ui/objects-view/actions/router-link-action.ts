import { BaseAction } from './base-action';
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';
import { IActionResult } from '../interfaces/actions/action-result';
import { ActionTypes } from '@objects-view/actions/action-types';

export class RouterLinkAction extends BaseAction {
  type = ActionTypes.RouterLinkAction
  routerUrl: string;
  router: Router;
  queryParams = {};

  constructor(init?: Partial<RouterLinkAction>) {
    super(init);
    if (!this.options) {
      this.options = {displayConfirmation: false, displayMessages: false};
    }
    this.refreshAfterExecute = false;
    const needle = this.routerUrl.indexOf('?');
    if (needle > -1) {
      const substring = this.routerUrl.substr(needle + 1);
      substring.split('&').forEach((part) => {
        const item = part.split('=');
        this.queryParams[item[0]] = decodeURIComponent(item[1]);
      });
      this.routerUrl = this.routerUrl.substr(0, needle);
    }
  }

  executeImpl(): Observable<IActionResult> {
    return of(null);
  }
}
