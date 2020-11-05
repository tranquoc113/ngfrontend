import { Component } from '@angular/core';
import { DetailsBase } from '@objects-view/details-base';
import { ActivatedRoute } from '@angular/router';
import { IServiceModel } from '@fleio-api/billing/model/service.model';
import { ServiceListUIService } from '../service-list-ui.service';

@Component({
  selector: 'app-service-details',
  templateUrl: './service-details.component.html',
  styleUrls: ['./service-details.component.scss']
})
export class ServiceDetailsComponent extends DetailsBase<IServiceModel> {
  constructor(route: ActivatedRoute, serviceListUIService: ServiceListUIService) {
    super(route, serviceListUIService, 'details', 'service');
  }
}
