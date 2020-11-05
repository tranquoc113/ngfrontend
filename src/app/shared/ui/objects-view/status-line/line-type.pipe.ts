import { Pipe, PipeTransform } from '@angular/core';
import { StatusType } from '../interfaces/object-status';
import { LineType } from './status-line.component';

@Pipe({
  name: 'lineType'
})
export class LineTypePipe implements PipeTransform {
  transform(value: StatusType): LineType {
    switch (value) {
      case StatusType.Defined:
        return LineType.Solid;
      case StatusType.Changing:
        return LineType.Progress;
      default:
        return LineType.None;
    }
  }

}
