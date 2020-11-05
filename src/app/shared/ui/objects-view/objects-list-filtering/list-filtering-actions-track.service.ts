import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ListFilteringActionsTrackService {
  private filteringActionsTrackBS: BehaviorSubject<boolean>;
  filteringActionsTrack$: Observable<boolean>;

  constructor() {
    this.filteringActionsTrackBS = new BehaviorSubject<boolean>(false);
    this.filteringActionsTrack$ = this.filteringActionsTrackBS.asObservable();
  }

  didAction() {
    this.filteringActionsTrackBS.next(true);
    this.filteringActionsTrackBS.next(false); // re-set to initial state
  }
}
