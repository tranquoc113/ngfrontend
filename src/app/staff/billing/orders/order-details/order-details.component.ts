import { Component } from '@angular/core';
import { DetailsBase } from '@objects-view/details-base';
import { ActivatedRoute } from '@angular/router';
import { IOrderModel } from '@fleio-api/billing/model/order.model';
import { OrderListUIService } from '../order-list-ui.service';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.scss']
})
export class OrderDetailsComponent extends DetailsBase<IOrderModel> {
  constructor(route: ActivatedRoute, orderListUIService: OrderListUIService) {
    super(route, orderListUIService, 'details', 'order');
  }
}
