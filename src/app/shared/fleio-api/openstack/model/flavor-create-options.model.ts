import { IRegionModel } from './region.model';

export interface IFlavorCreateOptionsModel {
  regions: IRegionModel[];
  selected_region: string;
}
