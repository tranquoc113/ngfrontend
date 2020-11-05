import { IClientModel } from '../../client-user/model/client.model';
import { IRegionModel } from './region.model';
import { IFlavorModel } from './flavor.model';
import { IImageModel } from './image.model';
import { IVolumeModel } from './volume.model';
import { IVolumeType } from './volume-type.model';
import { IVolumeSnapshotModel } from '@fleio-api/openstack/model/volume-snapshot.model';


export interface IInstanceCreateOptions {
  client: IClientModel;
  selected_region: string;
  region: IRegionModel[];
  enable_volumes: boolean;
  enable_snapshots: boolean;
  nics: {id: string; name: string; tags: {tag_name: string; }[] }[];
  flavor: IFlavorModel[];
  bootSources: {
    image: Array<IImageModel>;
    owned_image: Array<IImageModel>;
    shared_image: Array<IImageModel>;
    community_image: Array<IImageModel>;
    requested_image: Array<IImageModel>;
    volume: Array<IVolumeModel>;
    volume_snapshot: Array<IVolumeSnapshotModel>;
    volume_types: Array<IVolumeType>;
    requested_boot_source: boolean;
  };
  ssh_key: {id: string; name: string; }[];
}
