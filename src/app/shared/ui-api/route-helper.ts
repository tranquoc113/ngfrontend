import { ActivatedRoute } from '@angular/router';
import { IRouteConfig } from './interfaces/route-config/route-config';
import { ISearchConfig } from './interfaces/route-config/search-config';
import { IUrlChanges } from './interfaces/url-changes';

export class RouteHelper {
  private readonly detailPaths = [
    'create', 'auto-create', 'config-auto-create',
  ];

  private readonly route: ActivatedRoute;
  private previousPath: string = null;
  private previousQuery: string = null;

  constructor(route: ActivatedRoute) {
    this.route = route;
  }

  getFinalRoute(): ActivatedRoute {
    let route = this.route;
    while (route.firstChild) {
      route = route.firstChild;
    }

    return route;
  }

  getRoutePath(objectListRoute: boolean = false): string {
    const route = this.getFinalRoute();
    const urlSegments: string[] = [];
    for (const routeSegment of route.pathFromRoot) {
      if (routeSegment.snapshot.url.length > 0) {
        if (objectListRoute) {
          if (routeSegment.snapshot.params.id) {
            continue;
          }
          if (this.detailPaths.includes(routeSegment.snapshot.url[0].path)) {
            continue;
          }
          urlSegments.push(routeSegment.snapshot.url[0].path);
        } else {
          urlSegments.push(routeSegment.snapshot.url[0].path);
        }
      }
    }

    return urlSegments.join('/');
  }

  getRouteConfig(): IRouteConfig {
    const route = this.getFinalRoute();
    if (route.snapshot.data.config) {
      return route.snapshot.data.config;
    }

    return {};
  }

  getSearchConfig(): ISearchConfig {
    const routeConfig = this.getRouteConfig();
    if (routeConfig.search) {
      return routeConfig.search;
    }
    return {show: false, placeholder: undefined};
  }

  getUrlChanges(nextUrl: string): IUrlChanges {
    const parts = nextUrl.split('?');
    const nextPath = parts[0];
    const nextQuery = parts.length > 1 ? parts[1] : null;
    const changes = {
      path: this.previousPath !== nextPath,
      query: this.previousQuery !== nextQuery,
    };

    this.previousPath = nextPath;
    this.previousQuery = nextQuery;

    return changes;
  }
}
