import { IBaseFleioObjectModel } from '../../base-model/base-fleio-object.model';

export interface IConfigurationOpenstackModel extends IBaseFleioObjectModel {
  auto_cleanup_images: boolean;
  auto_cleanup_number_of_days: number;
  auto_cleanup_image_types: string;
}
