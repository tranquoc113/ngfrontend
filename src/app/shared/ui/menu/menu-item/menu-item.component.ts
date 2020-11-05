import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { MenuItemModel } from '../../models/menu-item.model';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { ConfigService } from '@shared/config/config.service';
import { AuthService } from '@shared/auth/auth.service';
import { Subscription } from 'rxjs';
import { RouteHelper } from '@shared/ui-api/route-helper';

@Component({
  selector: 'app-menu-item',
  templateUrl: './menu-item.component.html',
  styleUrls: ['./menu-item.component.scss']
})
export class MenuItemComponent implements OnInit, OnDestroy {
  @Input() menuItem: MenuItemModel;
  @Input() isAlone = true;
  panelHomeUrl: string;
  isActive: boolean;
  private routerEventsSubscription: Subscription;

  constructor(
    private router: Router,
    private config: ConfigService,
    public authService: AuthService,
    private activatedRoute: ActivatedRoute,
  ) {
  }

  public isMenuActive(): boolean {
    const currentUrl = this.config.getPanelUrl(
      (new RouteHelper(this.activatedRoute)).getRoutePath(true),
    );

    if (!this.menuItem) {
      return false;
    }

    const lastIndexOf = currentUrl.indexOf(this.menuItem.route);
    if (lastIndexOf > -1) {
      const nextCharAfterOccurrenceIndex = lastIndexOf + this.menuItem.route.length
      if (currentUrl[nextCharAfterOccurrenceIndex] && [
        '-', '/',
      ].includes(currentUrl[nextCharAfterOccurrenceIndex])) {
        // if next character after last occurrence is something in the list (route path string separators),
        // do not mark menu item as active
        return false;
      }
      return (this.menuItem.route !== this.panelHomeUrl) || (
        currentUrl === this.panelHomeUrl && this.menuItem.route === this.panelHomeUrl
      );
    }
    return false;
  }

  getAngularJsPath(endingPath: string): string {
    return this.config.current.urls.angularJsPanelUrl + endingPath;
  }

  ngOnInit() {
    this.panelHomeUrl = this.config.getPanelHomeUrl();
    this.isActive = this.isMenuActive()
    this.routerEventsSubscription = this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.isActive = this.isMenuActive();
      }
    });
  }

  ngOnDestroy() {
    if (this.routerEventsSubscription) {
      this.routerEventsSubscription.unsubscribe();
      this.routerEventsSubscription = null;
    }
  }
}
