import { Component, OnInit } from '@angular/core';
import { DetailsBase } from '@objects-view/details-base';
import { IServiceModel } from '@fleio-api/billing/model/service.model';
import { ActivatedRoute } from '@angular/router';
import { ServiceListUIService } from '../service-list-ui.service';

@Component({
  selector: 'app-service-edit',
  templateUrl: './service-edit.component.html',
  styleUrls: ['./service-edit.component.scss']
})
export class ServiceEditComponent extends DetailsBase<IServiceModel> {
  constructor(route: ActivatedRoute, serviceListUIService: ServiceListUIService) {
    super(route, serviceListUIService, 'edit', 'service');
  }
}
