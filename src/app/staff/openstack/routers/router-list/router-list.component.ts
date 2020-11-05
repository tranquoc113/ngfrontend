import { Component, OnInit } from '@angular/core';
import { ListBase } from '@objects-view/list-base';
import { ActivatedRoute } from '@angular/router';
import { RefreshService } from '@shared/ui-api/refresh.service';
import { IRouterModel } from '@fleio-api/openstack/model/router.model';
import { RouterListUIService } from '../router-list-ui.service';

@Component({
  selector: 'app-router-list',
  templateUrl: './router-list.component.html',
  styleUrls: ['./router-list.component.scss']
})
export class RouterListComponent extends ListBase<IRouterModel> {

  constructor(
    private route: ActivatedRoute, private routerListUIService: RouterListUIService,
    private refreshService: RefreshService,
  ) {
    super(route, routerListUIService, refreshService, 'routers');
  }
}
