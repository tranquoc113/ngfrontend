import { AppColor } from '@shared/ui/common/enums/app-color.enum';

export interface IAppServicesStatus {
  description: string;
  data: {
    value: any;
    tag?: boolean;
    bgColor?: AppColor;
    color?: AppColor;
    tooltip?: string;
  };
}
