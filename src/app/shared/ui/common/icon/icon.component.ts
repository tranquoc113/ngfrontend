import { Component, Input, OnInit } from '@angular/core';
import { IIcon } from '../interfaces/icon';
import { AppColor } from '../enums/app-color.enum';

@Component({
  selector: 'app-icon',
  templateUrl: './icon.component.html',
  styleUrls: ['./icon.component.scss']
})
export class IconComponent implements OnInit {
  @Input() icon: IIcon;
  IconColor = AppColor;

  constructor() { }

  ngOnInit() {
  }

}
