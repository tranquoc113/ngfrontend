import { FleioObjectsList } from '../../../fleio-api/fleio-objects-list';
import { IBaseFleioObjectModel } from '../../../fleio-api/base-model/base-fleio-object.model';

export interface ISubheaderConfig {
  objectName: string;
  objectNamePlural: string;

  objectList(data): FleioObjectsList<IBaseFleioObjectModel>;
}
