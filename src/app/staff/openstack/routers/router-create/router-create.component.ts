import { Component, OnDestroy, OnInit } from '@angular/core';
import { DetailsBase } from '@objects-view/details-base';
import { IRouterModel } from '@fleio-api/openstack/model/router.model';
import { ActivatedRoute } from '@angular/router';
import { RouterListUIService } from '../router-list-ui.service';

@Component({
  selector: 'app-router-create',
  templateUrl: './router-create.component.html',
  styleUrls: ['./router-create.component.scss']
})
export class RouterCreateComponent extends DetailsBase<IRouterModel> implements OnInit, OnDestroy {

  constructor(route: ActivatedRoute, routerListUIService: RouterListUIService) {
    super(route, routerListUIService, 'create', null, ['createOptions']);
  }
}
