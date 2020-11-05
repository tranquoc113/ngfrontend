import { IBaseFleioObjectModel } from '../../base-model/base-fleio-object.model';
import { ISubnetModel } from '@fleio-api/openstack/model/subnet.model';

export interface IRouterAddInterfaceCreateOptionsModel extends IBaseFleioObjectModel {
  subnets: ISubnetModel[];
}
