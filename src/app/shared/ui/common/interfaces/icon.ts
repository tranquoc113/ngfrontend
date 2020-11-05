import { AppColor } from '../enums/app-color.enum';

export interface IIcon {
  name: string;
  class?: string;
  gravatarEmail?: string;
  color?: AppColor;
}
