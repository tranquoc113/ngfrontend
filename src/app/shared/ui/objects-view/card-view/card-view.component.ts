import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { IObjectListController } from '../interfaces/object-list-controller';
import { Subscription } from 'rxjs';
import { ICardViewData } from '../interfaces/card-data/card-view-data';

@Component({
  selector: 'app-card-view',
  templateUrl: './card-view.component.html',
  styleUrls: ['./card-view.component.scss']
})
export class CardViewComponent implements OnInit, OnDestroy {
  @Input() objectsListController: IObjectListController;
  cardViewDataSubscription: Subscription = null;
  cardViewData: ICardViewData;
  constructor() { }

  ngOnInit() {
    if (this.objectsListController) {
      this.objectsListController.cardViewData$.subscribe(response => {
        this.cardViewData = response;
      });
    } else {
      console.error('Card data cannot be received due to missing objectsListController');
    }
  }

  ngOnDestroy(): void {
    if (this.cardViewDataSubscription) {
      this.cardViewDataSubscription.unsubscribe();
      this.cardViewDataSubscription = null;
    }
  }

}
