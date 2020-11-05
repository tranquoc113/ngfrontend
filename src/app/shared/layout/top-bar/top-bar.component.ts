import { Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter, map, startWith } from 'rxjs/operators';
import { ISearchConfig } from '../../ui-api/interfaces/route-config/search-config';
import { RouteHelper } from '../../ui-api/route-helper';
import { AuthService } from '../../auth/auth.service';
import { LogoLinkOptions } from '../../ui/logo/logo.component';
import { ConfigService } from '../../config/config.service';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.scss']
})
export class TopBarComponent implements OnInit, OnDestroy {
  @Input() panel: string;
  @ViewChild('searchBox') searchBox;
  public searchConfig: ISearchConfig;
  private routerEventSubscription: Subscription;
  private routeHelper: RouteHelper;
  logoLinkOptions = new LogoLinkOptions(true);

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    public auth: AuthService,
  ) {
    this.routeHelper = new RouteHelper(activatedRoute);
  }

  ngOnInit() {
    this.routerEventSubscription = this.router.events.pipe(
      filter((event) => {
        return event instanceof NavigationEnd;
      }),
      map(() => {
        return this.routeHelper.getSearchConfig();
      }),
      startWith(this.routeHelper.getSearchConfig())
    ).subscribe(searchConfig => {
      this.searchConfig = searchConfig;
      if (this.searchConfig.show && this.searchBox && this.routeHelper.getUrlChanges(this.router.url).query) {
        this.searchBox.setSearchText();
      }
    });
  }

  ngOnDestroy(): void {
    this.routerEventSubscription.unsubscribe();
  }

}
