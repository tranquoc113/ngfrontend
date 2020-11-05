import { ISummaryCardData } from './summary-card-data';
import { TrackByFunction } from '@angular/core';

export interface ICardViewData {
  cards: ISummaryCardData[];
  trackByFunction?: TrackByFunction<object>;
}
