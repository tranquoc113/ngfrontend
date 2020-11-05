import { Component, OnDestroy, OnInit } from '@angular/core';
import { DetailsBase } from '@objects-view/details-base';
import { ActivatedRoute } from '@angular/router';
import { IRouterModel } from '@fleio-api/openstack/model/router.model';
import { RouterListUIService } from '../router-list-ui.service';

@Component({
  selector: 'app-router-add-interface',
  templateUrl: './router-add-interface.component.html',
  styleUrls: ['./router-add-interface.component.scss']
})
export class RouterAddInterfaceComponent extends DetailsBase<IRouterModel> implements OnInit, OnDestroy {

  constructor(route: ActivatedRoute, routerListUIService: RouterListUIService) {
    super(route, routerListUIService, 'add-interface', 'router', ['createOptions']);
  }
}
