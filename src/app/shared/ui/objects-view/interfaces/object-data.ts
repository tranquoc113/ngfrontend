import { IBaseFleioObjectModel } from '../../../fleio-api/base-model/base-fleio-object.model';
import { IPermissionsModel } from '../../../fleio-api/base-model/IPermissionsModel';

export interface IObjectData {
      object: IBaseFleioObjectModel;
      additionalObjects?: { [objectName: string]: IBaseFleioObjectModel };
      permissions?: IPermissionsModel;
}
