import { FleioId } from '@fleio-api/base-model/base-fleio-object.model';

export interface IAppStatus {
  id: FleioId;
  details: {
    [key: string]: any;
  };
  last_updated: Date;
  status_type: string;
}
