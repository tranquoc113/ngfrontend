import { IFlavorModel } from './flavor.model';
import { IInstanceModel } from './instance.model';


export interface IInstanceResizeOptionsModel {
  flavors: IFlavorModel[];
  instance: IInstanceModel;
}
