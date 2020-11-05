import { IRegionModel } from './region.model';

export interface IImageCreateOptionsModel {
  architectures: string[][];
  regions: IRegionModel[];
  container_formats: string[];
  disk_formats: string[];
  visibilities: string[];
  os_distros: string[];
  hypervisor_types: string[];
  selected_region: string;
  statuses: {
    display: string;
    value: string;
  }[];
}
