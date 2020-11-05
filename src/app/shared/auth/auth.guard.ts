import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { map } from 'rxjs/operators';
import { ConfigService } from '../config/config.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private config: ConfigService, private router: Router) {
  }

  // TODO: extend this to perform feature check on routes too
  canActivate(
    route: ActivatedRouteSnapshot, state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.authService.checkIfLoggedIn().pipe(map(isAuthenticated => {
      const isLoginPage = route.routeConfig.path === 'login';
      const isResetPage = route.routeConfig.path === 'reset';
      const isNewPasswordPage = route.routeConfig.path === 'reset-password/:userid/:token';
      const isLogoutPage = route.routeConfig.path === 'logout';
      const sfaRelated = route.routeConfig.path === 'sfa';

      if (!isAuthenticated && isLogoutPage) {
        return this.router.parseUrl(this.config.getPanelUrl('login'));
      }

      if (isAuthenticated && (isLoginPage || isResetPage || isNewPasswordPage)) {
        // we are on login page, but we are already authenticated, go to home page
        return this.router.parseUrl(this.config.getPanelHomeUrl());
      }
      if (route.data.config && route.data.config.feature) {
        if (this.authService.userData.features[route.data.config.feature] === false) {
          return this.router.parseUrl(this.config.getPanelUrl('404'));
        }
      }
      if (!isAuthenticated && (isResetPage || isNewPasswordPage || sfaRelated)) {
        return true;
      }
      if (!isAuthenticated && !isLoginPage) {
        // we are not authenticated and we are not on login page, redirect to login page
        // save current url so we can redirect back after login
        this.config.setActiveUrl(state.url);
        return this.router.parseUrl(this.config.getPanelUrl('login'));
      }

      return true;

    }));
  }
}
