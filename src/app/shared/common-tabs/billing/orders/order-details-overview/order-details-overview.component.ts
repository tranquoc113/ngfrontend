import { Component } from '@angular/core';
import { DetailsComponentBase } from '@objects-view/details-component-base';
import { IOrderModel } from '@fleio-api/billing/model/order.model';
import { ConfigService } from '@shared/config/config.service';

@Component({
  selector: 'app-order-details-overview',
  templateUrl: './order-details-overview.component.html',
  styleUrls: ['./order-details-overview.component.scss']
})
export class OrderDetailsOverviewComponent extends DetailsComponentBase<IOrderModel> {
  constructor(
    public config: ConfigService,
  ) {
    super();
  }
}
