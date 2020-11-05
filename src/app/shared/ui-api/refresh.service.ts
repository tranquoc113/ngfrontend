import { Injectable, NgZone } from '@angular/core';
import {
  ActivatedRoute,
  NavigationCancel,
  NavigationEnd,
  NavigationError,
  NavigationStart,
  Router
} from '@angular/router';
import { RouteHelper } from './route-helper';
import { DEFAULT_BOOST_INTERVALS, RefreshTimer } from './helpers/refresh-timer';
import { ConfigService } from '@shared/config/config.service';

@Injectable({
  providedIn: 'root'
})
export class RefreshService {
  private refreshTimer: RefreshTimer;
  private refreshing = false;
  private refreshSuspended = false;
  private refreshPromise: Promise<any>;

  constructor(private router: Router, private route: ActivatedRoute, private configService: ConfigService,
              private ngZone: NgZone) {
    router.events.subscribe((event) => {
      switch (event.constructor.name) {
        case NavigationStart.name:
          this.refreshSuspended = true;
          break;

        case NavigationCancel.name:
        case NavigationEnd.name:
        case NavigationError.name:
          this.refreshSuspended = false;
          break;

        default:
          break;
      }
    });

    this.refreshTimer = new RefreshTimer(10000, () => {
      this.refresh();
    }, this.configService, this.ngZone, null,false);
  }

  public refresh() {
    this.ngZone.run(() => {
      if (!this.refreshing && !this.refreshSuspended) {
        this.refreshing = true;
        const routeToRefresh = new RouteHelper(this.route).getFinalRoute();
        this.refreshPromise = this.router.navigate([], {
          relativeTo: routeToRefresh,
          queryParams: routeToRefresh.snapshot.queryParams,
          skipLocationChange: true,
        }).then(() => {
          this.refreshing = false;
        });
      }
    });
  }

  public redirect(url: string) {
    this.refreshPromise = this.router.navigateByUrl(url).catch(() => {
    });
  }

  startRefreshTimer(interval: number) {
    this.refreshTimer.stop();

    this.refreshSuspended = false;
    this.refreshing = false;

    this.refreshTimer.setInterval(interval, true);
  }

  stopRefreshTimer() {
    this.refreshTimer.stop();
  }

  boost(boostIntervals: number[] = DEFAULT_BOOST_INTERVALS) {
    this.refreshTimer.boost(boostIntervals);
  }
}
