import { IBaseFleioObjectModel } from '@fleio-api/base-model/base-fleio-object.model';
import { Observable, of } from 'rxjs';
import { IAction } from '../interfaces/actions/action';
import { IIcon } from '../../common/interfaces/icon';
import { delay } from 'rxjs/operators';
import { NotificationService } from '@shared/ui-api/notification.service';
import { IActionResult } from '../interfaces/actions/action-result';
import { IActionExecutionOptions } from '../interfaces/actions/action-options';
import { IActionConfirmOptions } from '../interfaces/actions/action-confirm-options';
import { RefreshService } from '@shared/ui-api/refresh.service';
import { ActionTypes } from '@objects-view/actions/action-types';

export class BaseAction implements IAction {
  object: IBaseFleioObjectModel;
  icon: IIcon;
  name: string;
  tooltip: string;
  primary: boolean;
  type: ActionTypes;
  routerUrl: string;
  queryParams?: {};

  options?: IActionExecutionOptions;
  confirmOptions?: IActionConfirmOptions;

  disabled: boolean;
  isRunning: boolean;
  noPermissions: boolean;
  featureName: string;
  refreshAfterExecute = true;
  redirectAfterExecute = false;
  redirectUrl: string;

  notificationService: NotificationService;

  mouseEvent: MouseEvent;

  constructor(init?: Partial<BaseAction>) {
    Object.assign(this, init);
    if (!this.tooltip) {
      if (this.noPermissions) {
        this.tooltip = 'You don\'t have permissions to perform this action';
      }
      if (this.disabled) {
        this.tooltip = 'This action is disabled';
      }
    }
  }

  executeImpl(): Observable<IActionResult> {
    console.warn('Base object action executeImpl method invoked, ' +
      'override this in your derived classes.');
    return of({message: 'Base object action execute method invoked.'}).pipe(delay(1000));
  }

  getActiveOptions(executionOptions: IActionExecutionOptions): IActionExecutionOptions {
    const activeOptions: IActionExecutionOptions = {
      displayConfirmation: true,
      displayMessages: true,
    };

    if (this.options) {
      activeOptions.displayConfirmation =
        activeOptions.displayConfirmation && this.options.displayConfirmation;
      activeOptions.displayMessages = activeOptions.displayMessages && this.options.displayMessages;
    }
    if (executionOptions) {
      activeOptions.displayConfirmation =
        activeOptions.displayConfirmation && executionOptions.displayConfirmation;
      activeOptions.displayMessages = activeOptions.displayMessages && executionOptions.displayMessages;
    }

    return activeOptions;
  }

  execute(
    notificationService: NotificationService, refreshService: RefreshService, options?: IActionExecutionOptions,
    event?: MouseEvent,
  ) {
    this.mouseEvent = event;
    this.isRunning = true;
    this.notificationService = notificationService;
    const activeOptions = this.getActiveOptions(options);
    let dialogResult$: Observable<string> = of('yes');
    if (this.confirmOptions && this.confirmOptions.confirm && activeOptions.displayConfirmation) {
      dialogResult$ = notificationService.confirmDialog({
        title: this.confirmOptions.title,
        message: this.confirmOptions.message,
        importantMessage: this.confirmOptions.importantMessage,
      });
    }
    dialogResult$.subscribe(dialogResult => {
      if (dialogResult === 'yes') {
        this.executeImpl().subscribe(result => {
          if (activeOptions.displayMessages && result && result.message) {
            notificationService.showMessage(result.message);
          }
          if (this.refreshAfterExecute) {
            refreshService.refresh();
          }
          if (this.redirectAfterExecute) {
            refreshService.redirect(this.redirectUrl);
          }
        }).add(() => {
          this.isRunning = false;
        });
      } else {
        this.isRunning = false;
      }
    });
  }
}
