import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { animate, state, style, transition, trigger } from '@angular/animations';
import {
  ActivatedRoute,
  Event,
  NavigationCancel,
  NavigationEnd,
  NavigationError,
  NavigationStart,
  Router
} from '@angular/router';
import { RouteHelper } from '../../ui-api/route-helper';
import { Subscription } from 'rxjs';
import { delay } from 'rxjs/operators';
import { VERSION } from '../../../../environments/version';
import { ThemingService } from '../../ui/theming/theming.service';

@Component({
  selector: 'app-panel-layout',
  templateUrl: './panel-layout.component.html',
  styleUrls: ['./panel-layout.component.scss'],
  animations: [
    trigger('openCloseSidebar', [
      state('closed', style({
        left: '-237px',
      })),
      transition('open => closed', [
        animate('430ms ease-in-out')
      ]),
      transition('closed => open', [
        animate('430ms ease-in-out')
      ]),
    ]),
    trigger('alignContent', [
      state('closed', style({
        paddingLeft: '0px',
      })),
      transition('open => closed', [
        animate('430ms ease-in-out')
      ]),
      transition('closed => open', [
        animate('430ms ease-in-out')
      ]),
    ]),
    trigger('openCloseTopBar', [
      state('closed', style({
        marginTop: '-67px',
      })),
      transition('open => closed', [
        animate('430ms ease-in-out')
      ]),
      transition('closed => open', [
        animate('430ms ease-in-out')
      ]),
    ]),
  ],
})
export class PanelLayoutComponent implements OnInit, OnDestroy {
  @Input() panel: string;

  private readonly routeHelper: RouteHelper;
  private routerEventsSubscription: Subscription;
  private isLoggedInSubscription: Subscription;
  private smallWindow: boolean
  private isLoggedIn: boolean;

  public version = VERSION.version;
  public topBarVisible = true;
  public sideBarVisible: boolean;
  public showSidebar: boolean = null;
  public loading = false;

  constructor(public auth: AuthService, private router: Router, private activatedRoute: ActivatedRoute,
              private themingService: ThemingService) {
    this.routeHelper = new RouteHelper(activatedRoute);
    window.addEventListener('resize', () => this.windowResized());

    // emulate initial window resize to set visibility based on window size
    this.windowResized();
  }

  windowResized() {
    const smallWindow = window.innerWidth <= 1280;
    if (smallWindow !== this.smallWindow) {
      // window size changed, invalidate user choice
      this.showSidebar = null;
    }
    this.smallWindow = smallWindow
    this.updateSideBarVisibility();
  }

  toggleSideBar() {
    if (this.showSidebar === null) {
      // if no user choice present yet just toggle visibility
      this.showSidebar = !this.sideBarVisible;
    } else {
      // toggle user choice if present
      this.showSidebar = !this.showSidebar;
    }
    this.updateSideBarVisibility();
  }

  updateSideBarVisibility() {
    // first take into account window size
    let sideBarVisible = !this.smallWindow;

    // then take into account user choice
    if (this.showSidebar !== null) {
      sideBarVisible = this.showSidebar;
    }

    // finally if user is not logged in hide side bar
    sideBarVisible = sideBarVisible && this.isLoggedIn;

    this.sideBarVisible = sideBarVisible;
  }

  ngOnInit() {
    this.themingService.loadCustomStyles();
    this.themingService.activateTheme();
    this.isLoggedInSubscription = this.auth.isLoggedIn.subscribe(
      isLoggedIn => {
        this.isLoggedIn = isLoggedIn;
        if (!isLoggedIn) {
          // invalidate user choice when logged out
          this.showSidebar = null;
        }
        this.topBarVisible = isLoggedIn;
        this.updateSideBarVisibility();
      }
    );

    this.routerEventsSubscription = this.router.events.pipe(delay(0)).subscribe((event: Event) => {
      switch (true) {
        case event instanceof NavigationStart: {
          const urlChanges = this.routeHelper.getUrlChanges((event as NavigationStart).url);
          this.loading = urlChanges.path || urlChanges.query;
          break;
        }

        case event instanceof NavigationEnd:
        case event instanceof NavigationCancel:
        case event instanceof NavigationError: {
          if (this.loading && event instanceof NavigationEnd) {
            this.showSidebar = null;
            this.updateSideBarVisibility();
          }
          this.loading = false;
          break;
        }
        default: {
          break;
        }
      }
    });
  }

  ngOnDestroy(): void {
    this.isLoggedInSubscription.unsubscribe();
    this.routerEventsSubscription.unsubscribe();
  }
}
