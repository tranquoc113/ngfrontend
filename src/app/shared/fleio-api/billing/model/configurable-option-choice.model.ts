import { FleioId, IBaseFleioObjectModel } from '../../base-model/base-fleio-object.model';
import { IConfigurableOptionCycleModel } from '@fleio-api/billing/model/configurable-option-cycle.model';

export interface IConfigurableOptionChoiceModel extends IBaseFleioObjectModel {
  cycle?: IConfigurableOptionCycleModel;
  cycles?: IConfigurableOptionCycleModel[];
  choice: string;
  label: string;
  option: FleioId;
}
