import { IBaseFleioObjectModel } from '../../base-model/base-fleio-object.model';
import { IConfigurableOptionCycleModel } from './configurable-option-cycle.model';
import { IConfigurableOptionChoiceModel } from './configurable-option-choice.model';

export interface IConfigOptionModel extends IBaseFleioObjectModel {
  cycle: IConfigurableOptionCycleModel;
  cycles: IConfigurableOptionCycleModel[];
  choices: IConfigurableOptionChoiceModel[];
  settings: string;
  name: string;
  description: string;
  help_text: string;
  widget: string;
  status: string;
  required: boolean;
  created_at: Date;
  visible: boolean;
  is_free: boolean;
  display: string;
  price: number;
  option_value?: string;
}
