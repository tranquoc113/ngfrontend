import { Component, OnInit } from '@angular/core';
import { DetailsBase } from '@objects-view/details-base';
import { IServiceModel } from '@fleio-api/billing/model/service.model';
import { ActivatedRoute } from '@angular/router';
import { ServiceListUIService } from '../service-list-ui.service';

@Component({
  selector: 'app-service-change-options',
  templateUrl: './service-change-options.component.html',
  styleUrls: ['./service-change-options.component.scss']
})
export class ServiceChangeOptionsComponent extends DetailsBase<IServiceModel> {
  constructor(route: ActivatedRoute, serviceListUIService: ServiceListUIService) {
    super(
      route, serviceListUIService, 'change-options', 'service', ['upgradeOptions']
    );
  }
}
