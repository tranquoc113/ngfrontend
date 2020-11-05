import { Pipe, PipeTransform } from '@angular/core';
import { StatusValue } from '../interfaces/object-status';
import { AppColor } from '../../common/enums/app-color.enum';

@Pipe({
  name: 'lineColor'
})
export class LineColorPipe implements PipeTransform {
  transform(value: StatusValue): AppColor {
    switch (value) {
      case StatusValue.Enabled:
        return AppColor.Green;
      case StatusValue.Disabled:
        return AppColor.Gray;
      case StatusValue.Waiting:
        return AppColor.Orange;
      case StatusValue.Warning:
        return AppColor.Yellow;
      case StatusValue.Error:
        return AppColor.Red;
      default:
        return AppColor.None;
    }
  }

}
