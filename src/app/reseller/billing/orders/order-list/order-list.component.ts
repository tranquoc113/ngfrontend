import { Component, OnInit } from '@angular/core';
import { ListBase } from '@objects-view/list-base';
import { ActivatedRoute } from '@angular/router';
import { RefreshService } from '@shared/ui-api/refresh.service';
import { IOrderModel } from '@fleio-api/billing/model/order.model';
import { OrderListUIService } from '../order-list-ui.service';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.scss']
})
export class OrderListComponent extends ListBase<IOrderModel> implements OnInit {

  constructor(
    private route: ActivatedRoute, private orderListUIService: OrderListUIService,
    private refreshService: RefreshService,
  ) {
    super(route, orderListUIService, refreshService, 'orders');
  }

  ngOnInit() {
    super.ngOnInit();
  }

}
