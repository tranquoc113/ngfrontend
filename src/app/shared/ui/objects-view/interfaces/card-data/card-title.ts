import { IIcon } from '@shared/ui/common/interfaces/icon';

export interface ITitle {
  text: string;
  textBold?: boolean;
  subText?: string;
  subTextIcon?: IIcon;
  subTextIconTooltip?: string;
}
