import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-fl-backdrop',
  templateUrl: './fl-backdrop.component.html',
  styleUrls: ['./fl-backdrop.component.scss']
})
export class FlBackdropComponent implements OnInit {
  @Input() spinnerDiameter = 70;
  @Input() verticalAlignMiddle = false;
  constructor() { }

  ngOnInit() {
  }

}
