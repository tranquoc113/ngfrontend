import { ISFAMethod } from '../../fleio-api/core/model/sfa-method.model';

export interface IAuthResultModel {
  success: boolean;
  errorMessage: string;
  sfaRequired?: boolean;
  sfaMethods?: Array<ISFAMethod>;
  rememberSFAToken?: string;
}
