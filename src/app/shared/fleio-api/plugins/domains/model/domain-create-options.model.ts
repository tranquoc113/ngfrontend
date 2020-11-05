import { IBaseFleioObjectModel } from '../../../base-model/base-fleio-object.model';
import { IDomainStatusModel } from './domain-status.model';

export interface IDomainCreateOptionsModel extends IBaseFleioObjectModel {
  statuses: IDomainStatusModel[];
}
