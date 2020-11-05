import { IBaseFleioObjectModel } from '../../base-model/base-fleio-object.model';
import { IServerPluginModel } from './server-plugin.model';
import { IServerGroupModel } from './server-group.model';

export interface IServerCreateOptionsModel extends IBaseFleioObjectModel {
  statusList: string[][];
  plugins: IServerPluginModel[];
  groups: IServerGroupModel[];
}
