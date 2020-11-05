import { AppColor } from '../../../common/enums/app-color.enum';


export interface ITableCell {
  text?: string;
  textColor?: AppColor;
  textBold?: boolean;
  subText?: string;
  subTextLink?: string;
  url?: string;
  tags?: string[];
}
