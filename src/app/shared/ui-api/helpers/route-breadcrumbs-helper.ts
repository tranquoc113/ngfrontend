import { ConfigService } from '../../config/config.service';
import { RouteHelper } from '../route-helper';
import { ActivatedRoute } from '@angular/router';
import { BreadCrumbModel } from '../../ui/models/breadcrumb.model';
import { OrderingService } from '../ordering.service';

export class RouteBreadCrumbsHelper {
  routeHelper: RouteHelper;

  constructor(private config: ConfigService, private activatedRoute: ActivatedRoute,
              private ordering?: OrderingService) {
    this.routeHelper = new RouteHelper(this.activatedRoute);
  }

  public getBreadcrumbs(): BreadCrumbModel[] {
    const breadcrumbs = [];
    let snapshot = this.activatedRoute.snapshot
    let firstSegmentSkipped = false;
    let url = this.config.getPanelHomeUrl();
    let display = this.config.getPanelHomeName() || 'home';

    if (url === '/') {
      display = 'home';
    } else {
      snapshot = snapshot.firstChild;
    }
    display = display.charAt(0).toUpperCase() + display.slice(1);
    breadcrumbs.push({display, url});
    url = '';

    while (snapshot) {
      const hide = snapshot.url.length === 0 || !!snapshot.data.hideInBreadcrumbs;

      if (snapshot.url.length) {
        if (url.length > 0) {
          url += '/'
        }
        url += snapshot.url[0].path
      }

      if (!hide) {
        if (firstSegmentSkipped) {
          display = snapshot.url[0].path

          if (snapshot.data.config && snapshot.data.config.getBreadCrumbDetail) {
            display = snapshot.data.config.getBreadCrumbDetail(snapshot.data);
          }

          display = display.charAt(0).toUpperCase() + display.slice(1);
          if (snapshot.firstChild) {
            display = display.replace('-', ' ');
          }

          breadcrumbs.push({display, url: this.config.getPanelUrl(url), queryParams: this.ordering.getQueryParams(url)})
        } else {
          firstSegmentSkipped = true;
        }
      }

      snapshot = snapshot.firstChild;
    }

    if (breadcrumbs.length > 0) {
      delete breadcrumbs[breadcrumbs.length - 1].url;
    }
    return breadcrumbs;
  }

  public getRouteLocationDetails() {
    const homeUrl = this.config.getPanelHomeUrl();
    const homeName = this.config.getPanelHomeName();
    let routePath;
    if (this.config.panelIsRoot()) {
      routePath = this.routeHelper.getRoutePath();
    } else {
      routePath = this.routeHelper.getRoutePath().replace(homeUrl, '');
    }
    // parse path into a list of strings
    let locationsArray: Array<string>;
    locationsArray = routePath.split('/');
    // remove first item (e.g. openstack)
    let routeParent;
    if (this.config.panelIsRoot()) {
      routeParent = locationsArray.splice(0, 1);
    } else {
      routeParent = locationsArray.splice(1, 1);
      locationsArray.splice(0, 1);
    }
    // determine and add the home bread crumb
    let homeBreadCrumbDisplay;
    if (homeUrl === '/') {
      homeBreadCrumbDisplay = 'Home';
    } else {
      if (homeName) {
        homeBreadCrumbDisplay = homeName.charAt(0).toUpperCase() + homeName.slice(1);
      } else {
        homeBreadCrumbDisplay = '';
      }
    }
    locationsArray.unshift(homeBreadCrumbDisplay);
    if (locationsArray[2]) {
      const finalRoute = this.routeHelper.getFinalRoute();
      if (finalRoute.snapshot.data.config && finalRoute.snapshot.data.config.getBreadCrumbDetail) {
        try {
          locationsArray[2] = finalRoute.snapshot.data.config.getBreadCrumbDetail(finalRoute.snapshot.data);
        } catch (e) {
          console.error('Exception when getting breadcrumb details: ' + e.message);
        }
      } else {
        if (finalRoute.snapshot.url.length !== 0) {
          // show error that breadcrumb definition is missing but not for base paths as they don't need this definition
          console.error('You need to define route config && getBreadCrumbDetails in route data');
          locationsArray[2] = 'n/a';
        }
      }
    }
    return {
      routeParent,
      locationsArray,
      homeUrl,
    };
  }
}
