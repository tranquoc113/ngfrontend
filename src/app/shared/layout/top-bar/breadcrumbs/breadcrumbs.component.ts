import { Component, OnInit } from '@angular/core';
import {
  ActivatedRoute, NavigationEnd,
  Router
} from '@angular/router';
import { BreadCrumbModel } from '../../../ui/models/breadcrumb.model';
import { ConfigService } from '../../../config/config.service';
import { OrderingService } from '../../../ui-api/ordering.service';
import { RouteBreadCrumbsHelper } from '../../../ui-api/helpers/route-breadcrumbs-helper';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styleUrls: ['./breadcrumbs.component.scss']
})
export class BreadcrumbsComponent implements OnInit {
  path: string;
  breadCrumbs: BreadCrumbModel[] = [];

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private config: ConfigService,
    private ordering: OrderingService,
  ) { }

  changeBreads() {
    const breadCrumbsHelper = new RouteBreadCrumbsHelper(
      this.config,
      this.activatedRoute,
      this.ordering,
    );

    this.breadCrumbs = breadCrumbsHelper.getBreadcrumbs();
  }

  ngOnInit() {
    this.changeBreads();
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.changeBreads();
      }
    });
  }

}
