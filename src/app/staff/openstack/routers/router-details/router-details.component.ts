import { Component, OnDestroy, OnInit } from '@angular/core';
import { DetailsBase } from '@objects-view/details-base';
import { IRouterModel } from '@fleio-api/openstack/model/router.model';
import { ActivatedRoute } from '@angular/router';
import { RouterListUIService } from '../router-list-ui.service';

@Component({
  selector: 'app-router-details',
  templateUrl: './router-details.component.html',
  styleUrls: ['./router-details.component.scss']
})
export class RouterDetailsComponent extends DetailsBase<IRouterModel> implements OnInit, OnDestroy {

  constructor(route: ActivatedRoute, routerListUIService: RouterListUIService) {
    super(route, routerListUIService, 'details', 'router');
  }
}
