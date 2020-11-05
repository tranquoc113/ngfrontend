import { RouteBreadCrumbsHelper } from './route-breadcrumbs-helper';
import { filter, map } from 'rxjs/operators';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { ConfigService } from '../../config/config.service';

export class TitleBuilder {

  constructor(
    private titleService: Title,
    private router: Router,
    private config: ConfigService,
    private activatedRoute: ActivatedRoute
  ) {
  }

  build() {
    const routeBreadCrumbsHelper = new RouteBreadCrumbsHelper(this.config, this.activatedRoute);
    this.router.events.pipe(
      filter((event) => event instanceof NavigationEnd),
      map(() => this.router)
    ).subscribe((event) => {
        let title = `${this.config.current.settings.baseTitle}:`;
        const locationEntries = routeBreadCrumbsHelper.getRouteLocationDetails().locationsArray;
        const lastLocationEntry = locationEntries[locationEntries.length - 1]
        const location = lastLocationEntry.charAt(0).toUpperCase() + lastLocationEntry.slice(1);
        title += ` ${location}`;
        this.titleService.setTitle(title);
      }
    );
  }
}
