import { IBaseFleioObjectModel } from './base-model/base-fleio-object.model';
import { IPermissionsModel } from './base-model/IPermissionsModel';


export class FleioObjectsList<ObjectModelType extends IBaseFleioObjectModel> {
  count: number;
  next: string;
  previous: string;
  objects: ObjectModelType[];
  totalCount: number;
  pageNumber: number;
  permissions: IPermissionsModel;
}
