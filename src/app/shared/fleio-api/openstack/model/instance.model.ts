import { IBaseFleioObjectModel } from '../../base-model/base-fleio-object.model';
import { IClientModel } from '../../client-user/model/client.model';
import { IFlavorModel } from './flavor.model';
import { IRegionModel } from './region.model';
import { IImageModel } from './image.model';
import { IPortModel } from './port.model';

export interface IInstanceModel extends IBaseFleioObjectModel {
    name: string;
    allowed_actions: [string];
    access_ip: string;
    uuid: string;
    created: string;
    display_status: string;
    display_task: string;
    description: string;
    image: IImageModel;
    region: string;
    region_obj: IRegionModel;
    flavor: IFlavorModel;
    status: string;
    booted_from_iso: boolean;
    locked: boolean;
    current_cycle_traffic: number;
    current_month_traffic: number;
    client: IClientModel;
    host_name: string;
    project?: string;
    hostId?: string;
    traffic_type?: string;
    net_details: {
        ports: IPortModel[];
    };
    storage_details: {
        hide_local_storage: boolean;
        local_storage: number;
        volume_attachments: {
            volume_name: string;
            volume_id: string;
            size: number;
            is_boot: boolean;
            delete_on_termination: boolean;
        }[];
    };
}
