import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OrderingService } from '../../../ui-api/ordering.service';
import { IOrdering } from '../../../ui-api/interfaces/route-config/ordering';
import { OrderingDirection } from '../../../ui-api/interfaces/route-config/ordering-directions';
import { OrderingHelper } from '../../../ui-api/helpers/ordering-helper';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-objects-ordering-menu',
  templateUrl: './objects-ordering-menu.component.html',
  styleUrls: ['./objects-ordering-menu.component.scss']
})
export class ObjectsOrderingMenuComponent implements OnInit, OnDestroy {
  public readonly OrderingHelper = OrderingHelper;
  private orderingSubscription: Subscription;

  activeOrdering: IOrdering;
  orderOptions: IOrdering[];

  constructor(
    private activatedRoute: ActivatedRoute,
    private orderingService: OrderingService,
  ) {
  }

  hasOrderOptions(): boolean {
    return !!this.orderOptions && this.orderOptions.length > 0 && !!this.activeOrdering;
  }

  switchOrderingDirection() {
    switch (this.activeOrdering.direction) {
      case OrderingDirection.Ascending:
        return this.activeOrdering.direction = OrderingDirection.Descending;
      case OrderingDirection.Descending:
        return this.activeOrdering.direction = OrderingDirection.Ascending;
      default:
        // if direction is undefined it means it is ascending and we switch it
        return this.activeOrdering.direction = OrderingDirection.Descending;
    }
  }

  changeActiveOrdering(newOrderOption: IOrdering) {
    if (newOrderOption.field === this.activeOrdering.field) {
      this.switchOrderingDirection();
    } else {
      this.activeOrdering = newOrderOption;
    }
    this.applyOrdering();
  }

  applyOrdering() {
    if (this.activeOrdering) {
      this.orderingService.orderBy(this.activeOrdering);
    }
  }

  ngOnInit() {
    this.orderingSubscription = this.orderingService.ordering$.subscribe(ordering => {
      if (ordering) {
        this.activeOrdering = ordering.default;
        this.orderOptions = ordering.options;
        if (this.activeOrdering) {
          this.applyOrdering();
        } else {
          console.warn('No active ordering, you should probably define default ordering in route config.');
        }
      } else {
        this.orderOptions = null;
      }
    });
  }

  ngOnDestroy(): void {
    if (this.orderingSubscription) {
      this.orderingSubscription.unsubscribe();
      this.orderingSubscription = null;
    }
  }
}
