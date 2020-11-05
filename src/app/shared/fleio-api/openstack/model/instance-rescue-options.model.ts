import { IInstanceModel } from './instance.model';
import { IImageModel } from './image.model';


export interface IInstanceRescueOptionsModel {
  image: {
    pub: IImageModel[];
    own: IImageModel[];
    shr: IImageModel[];
  };
  instance: IInstanceModel;
}
