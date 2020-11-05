import { IRegionModel } from '@fleio-api/openstack/model/region.model';

export interface INetworkCreateOptionsModel {
  regions: IRegionModel[];
  provider_types: {
    [type: string]: {
      display_name: string;
      require_physical_network: boolean;
      require_segmentation_id: boolean;
    }
  };
  segmentation_id_range: {
    [id: string]: number[]
  };
  selected_region: string;
}
