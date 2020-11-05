import { Component, OnInit } from '@angular/core';
import { DetailsBase } from '@objects-view/details-base';
import { IServiceModel } from '@fleio-api/billing/model/service.model';
import { ActivatedRoute } from '@angular/router';
import { ServiceListUIService } from '../service-list-ui.service';

@Component({
  selector: 'app-service-change-product',
  templateUrl: './service-change-product.component.html',
  styleUrls: ['./service-change-product.component.scss']
})
export class ServiceChangeProductComponent extends DetailsBase<IServiceModel> {
  constructor(route: ActivatedRoute, serviceListUIService: ServiceListUIService) {
    super(
      route, serviceListUIService, 'change-product', 'service', ['upgradeOptions']
    );
  }
}
