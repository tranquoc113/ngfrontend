import { Component, OnDestroy, OnInit } from '@angular/core';
import { DetailsBase } from '@objects-view/details-base';
import { IRouterModel } from '@fleio-api/openstack/model/router.model';
import { ActivatedRoute } from '@angular/router';
import { RouterListUIService } from '../router-list-ui.service';

@Component({
  selector: 'app-router-edit',
  templateUrl: './router-edit.component.html',
  styleUrls: ['./router-edit.component.scss']
})
export class RouterEditComponent extends DetailsBase<IRouterModel> implements OnInit, OnDestroy {

  constructor(route: ActivatedRoute, routerListUIService: RouterListUIService) {
    super(route, routerListUIService, 'edit', 'router', ['createOptions']);
  }
}
