import { Component, Input, OnInit } from '@angular/core';
import { ISummaryCardData } from '../interfaces/card-data/summary-card-data';

@Component({
  selector: 'app-object-card',
  templateUrl: './object-card.component.html',
  styleUrls: ['./object-card.component.scss']
})
export class ObjectCardComponent implements OnInit {
  @Input() cardData: ISummaryCardData;

  constructor() {
  }

  ngOnInit() {
  }
}
