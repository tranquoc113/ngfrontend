import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { AppColor } from '../../common/enums/app-color.enum';

export enum LineDirection {
  Horizontal,
  Vertical,
}

export enum LineType {
  None,
  Solid,
  Progress
}

@Component({
  selector: 'app-status-line',
  templateUrl: './status-line.component.html',
  styleUrls: ['./status-line.component.scss']
})
export class StatusLineComponent implements OnChanges {
  @Input() color: AppColor = AppColor.None;
  @Input() direction: LineDirection = LineDirection.Horizontal;
  @Input() type: LineType = LineType.None;
  classes: {[className: string]: boolean} = {};

  private readonly DirectionClasses: { [direction in LineDirection]: string } = {
    [LineDirection.Horizontal]: 'status-line-horizontal',
    [LineDirection.Vertical]: 'status-line-vertical',
  };

  public readonly LineType = LineType;

  private readonly ColorClasses: { [color in AppColor]: string } = {
    [AppColor.None]: 'status-line-color-none',
    [AppColor.Green]: 'status-line-color-green',
    [AppColor.Gray]: 'status-line-color-gray',
    [AppColor.Orange]: 'status-line-color-orange',
    [AppColor.Yellow]: 'status-line-color-yellow',
    [AppColor.Red]: 'status-line-color-red',
  };

  constructor() {
  }

  ngOnChanges(changes: SimpleChanges) {
    this.classes = {};
    this.classes[this.ColorClasses[this.color]] = true;
    this.classes[this.DirectionClasses[this.direction]] = true;
  }

}
