import { IInstanceModel } from './instance.model';
import { IImageModel } from './image.model';


export interface IInstanceRebuildOptionsModel {
  bootSources: {
    image: IImageModel[];
    owned_image: IImageModel[];
    shared_image: IImageModel[];
  };
  instance: IInstanceModel;
  ssh_keys: {id: string; name: string; }[];
}
