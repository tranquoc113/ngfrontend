import { Injectable } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { IOrdering } from './interfaces/route-config/ordering';
import { ActivatedRoute } from '@angular/router';
import { RouteHelper } from './route-helper';
import { ConfigService } from '../config/config.service';
import { FleioId } from '../fleio-api/base-model/base-fleio-object.model';
import { GridsterItem } from 'angular-gridster2';

@Injectable({
  providedIn: 'root'
})
export class AppLocalStorageService {

  constructor(private authService: AuthService, private activatedRoute: ActivatedRoute,
              private config: ConfigService) {
  }

  setItem(item: string, value: string, useUserInfo=true): void {
    if (useUserInfo && this.authService.userData && this.authService.userData.user &&
      this.authService.userData.user.username) {
      item = this.authService.userData.user.username + item;
    }
    localStorage.setItem(item, value);
  }
  getItem(item: string, useUserInfo=true): string | null {
    if (useUserInfo && this.authService.userData && this.authService.userData.user &&
      this.authService.userData.user.username) {
      item = this.authService.userData.user.username + item;
    }
    return localStorage.getItem(item);
  }

  setOrderingItem(orderingItem: IOrdering, routePath: string = null): void {
    const routeHelper = new RouteHelper(this.activatedRoute);
    this.setItem(
      '-ordering-' + (routePath || routeHelper.getRoutePath()),
      JSON.stringify(orderingItem),
    );
  }
  getOrderingItem(routePath: string = null): IOrdering | null {
    const routeHelper = new RouteHelper(this.activatedRoute);
    if (routePath && !this.config.panelIsRoot()) {
      routePath = this.config.getPanelHomeName() + '/' + routePath;
    }
    const savedValue = this.getItem(
      '-ordering-' + (routePath || routeHelper.getRoutePath()),
    );
    if (savedValue) {
      return JSON.parse(savedValue);
    }
    return null;
  }

  setCardsDisplay(cardsDisplay: boolean) {
    const routeHelper = new RouteHelper(this.activatedRoute);
    this.setItem('-cardsdisplay-' + routeHelper.getRoutePath(), JSON.stringify(cardsDisplay));
  }
  getCardsDisplay(): boolean | null {
    const routeHelper = new RouteHelper(this.activatedRoute);
    const savedValue = this.getItem('-cardsdisplay-' + routeHelper.getRoutePath());
    if (savedValue) {
      return JSON.parse(savedValue);
    }
    return null;
  }

  setActiveTheme(themeName: string) {
    this.setItem('-active-theme', themeName);
  }
  getSavedTheme(): string | null {
    const savedTheme = this.getItem('-active-theme');
    if (savedTheme) {
      return savedTheme;
    } else {
      return null;
    }
  }

  setLicenseWarningHide(value) {
    this.setItem('-flLicenseWarnPermanentlyHide', JSON.stringify(value))
  }
  getLicenseWarningHide(): boolean {
    const licenseWarnPermanentlyHide = this.getItem('-flLicenseWarnPermanentlyHide');
    if (licenseWarnPermanentlyHide) {
      return JSON.parse(licenseWarnPermanentlyHide);
    } else {
      return false;
    }
  }
  setLicenseLastWarningTime() {
    this.setItem('-flLastLicenseWarnTime', JSON.stringify(new Date()))
  }
  getLicenseLastWarningTime() {
    const licenseLastWarningTime = this.getItem('-flLastLicenseWarnTime');
    if (licenseLastWarningTime) {
      return JSON.parse(licenseLastWarningTime);
    } else {
      return null;
    }
  }

  setTicketsReplyText(ticketId: FleioId, value: string) {
    this.setItem(`-ticket-${ticketId}-reply-text`, JSON.stringify(value))
  }
  getTicketsReplyText(ticketId: FleioId) {
    const text = this.getItem(`-ticket-${ticketId}-reply-text`);
    if (text) {
      return JSON.parse(text);
    } else {
      return null;
    }
  }
  setTicketOpenData(value: string) {
    this.setItem(`-ticket-open-text`, JSON.stringify(value))
  }
  getTicketOpenData() {
    const text = this.getItem(`-ticket-open-text`);
    if (text) {
      return JSON.parse(text);
    } else {
      return null;
    }
  }

  setDashboardData(shownDashboardList: Array<GridsterItem>, hiddenDashboardList: Array<GridsterItem>) {
    this.setItem('-dashboard', JSON.stringify(shownDashboardList));
    this.setItem('-dashboard-hidden', JSON.stringify(hiddenDashboardList));
  }

  getDashboardShownData() {
    const value = this.getItem(`-dashboard`);
    if (value) {
      return JSON.parse(value);
    } else {
      return null;
    }
  }

  getDashboardHiddenData() {
    const value = this.getItem(`-dashboard-hidden`);
    if (value) {
      return JSON.parse(value);
    } else {
      return null;
    }
  }

}
