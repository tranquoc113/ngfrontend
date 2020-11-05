import { IBaseFleioObjectModel } from '@fleio-api/base-model/base-fleio-object.model';
import { IObjectUIService } from './interfaces/object-ui-service';
import { IPermissionsModel } from '@fleio-api/base-model/IPermissionsModel';
import { IIcon } from '../common/interfaces/icon';
import { IObjectStatus } from './interfaces/object-status';
import { ITitle } from './interfaces/card-data/card-title';
import { IAction } from './interfaces/actions/action';
import { IDataField } from './interfaces/card-data/data-field';
import { IDetailsTab } from './interfaces/details/details-tab';

export abstract class ObjectUIServiceBase<ObjectModel extends IBaseFleioObjectModel> implements IObjectUIService {
  protected permissions: IPermissionsModel;
  protected state: string;

  public object: ObjectModel;

  protected constructor(object: ObjectModel, permissions: IPermissionsModel, state: string) {
    this.state = state;
    this.setData(object, permissions);
  }

  setData(object: ObjectModel, permissions: IPermissionsModel) {
    this.object = object;
    this.permissions = permissions;
  }

  getIcon(): IIcon {
    console.warn('getIcon must be implemented in derived classes');
    return null;
  }

  getStatus(): IObjectStatus {
    console.warn('getStatus must be implemented in derived classes');
    return null;
  }

  getTitle(additionalObjects?: {[name: string]: object}): ITitle {
    console.warn('getTitle must be implemented in derived classes');
    return null;
  }

  getActions(): IAction[] {
    console.warn('getActions must be implemented in derived classes');
    return [];
  }

  getDetailsLink(): string {
    console.warn('getDetailsLink must be implemented in derived classes');
    return null;
  }

  getCardFields(): IDataField[] {
    console.warn('getCardFields must be implemented in derived classes');
    return [];
  }

  getCardTags(): string[] {
    console.warn('getCardTags must be implemented in derived classes');
    return [];
  }

  getTabs(additionalObjects?: {[name: string]: object}): IDetailsTab[] {
    console.warn('getTabs must be implemented in derived classes');
    return [];
  }

  getDetailsActions(): IAction[] {
    console.warn('getDetailsActions must be implemented in derived classes');
    return [];
  }
}
