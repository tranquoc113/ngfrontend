import { Component, OnInit } from '@angular/core';
import { ListBase } from '@objects-view/list-base';
import { ActivatedRoute } from '@angular/router';
import { RefreshService } from '@shared/ui-api/refresh.service';
import { IServiceModel } from '@fleio-api/billing/model/service.model';
import { ServiceListUIService } from '../service-list-ui.service';

@Component({
  selector: 'app-service-list',
  templateUrl: './service-list.component.html',
  styleUrls: ['./service-list.component.scss']
})
export class ServiceListComponent extends ListBase<IServiceModel> implements OnInit {

  constructor(
    private route: ActivatedRoute, private serviceListUIService: ServiceListUIService,
    private refreshService: RefreshService,
  ) {
    super(route, serviceListUIService, refreshService, 'services');
  }

  ngOnInit() {
    super.ngOnInit();
  }

}
