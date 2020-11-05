import { IBaseFleioObjectModel } from '@fleio-api/base-model/base-fleio-object.model';
import { IActionExecutionOptions } from './action-options';
import { IActionConfirmOptions } from './action-confirm-options';
import { NotificationService } from '@shared/ui-api/notification.service';
import { RefreshService } from '@shared/ui-api/refresh.service';
import { IIcon } from '@shared/ui/common/interfaces/icon';
import { ActionTypes } from '@objects-view/actions/action-types';

export interface IAction {
  object: IBaseFleioObjectModel;
  icon?: IIcon;
  name: string;
  tooltip: string;
  primary: boolean;
  type: ActionTypes;
  routerUrl?: string;
  queryParams?: {};

  options?: IActionExecutionOptions;
  confirmOptions?: IActionConfirmOptions;

  disabled?: boolean;
  isRunning: boolean;
  noPermissions: boolean;
  featureName: string;
  refreshAfterExecute: boolean;

  execute(
    notificationService: NotificationService, refreshService: RefreshService, options?: IActionExecutionOptions,
    event?: MouseEvent,
  );
}
