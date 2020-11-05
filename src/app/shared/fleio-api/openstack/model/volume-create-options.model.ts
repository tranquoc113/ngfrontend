import { IVolumeType } from './volume-type.model';
import { IRegionModel } from './region.model';
import { IImageModel } from './image.model';
import { IVolumeModel } from './volume.model';

export interface IVolumeCreateOptionsModel {
  types: IVolumeType[];
  regions: IRegionModel[];
  sources: {
    image: IImageModel[];
    volume: IVolumeModel[];
  };
  selected_region: string;
}
