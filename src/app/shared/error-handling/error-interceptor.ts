import {
  HttpClient,
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EMPTY, Observable } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { NotificationService } from '../ui-api/notification.service';
import { ConfigService } from '../config/config.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { IActionResult } from '../ui/objects-view/interfaces/actions/action-result';
import { MatDialog } from '@angular/material/dialog';
import { SetLicenseComponent } from '../fleio-data-controls/set-license/set-license.component';
import { LanguageService } from '../language/language.service';
import { UiFeaturesService } from '../ui-api/ui-features.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  private authService: AuthService;
  private disconnected = false;
  private setLicenseDialogShown = false;

  constructor(
    private notificationService: NotificationService, private configService: ConfigService,
    private router: Router, private httpClient: HttpClient, private route: ActivatedRoute,
    private readonly matDialog: MatDialog, private lang: LanguageService, private uiFeatures: UiFeaturesService,
  ) {
  }

  initAuthService() {
    if (!this.authService) {
      this.authService = new AuthService(this.httpClient, this.configService, this.lang, this.uiFeatures);
    }
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(tap(response => {
      if (this.disconnected && response.type !== 0) {
        this.disconnected = false;
      }
    })).pipe(catchError(error => {
      if (error instanceof HttpErrorResponse) {
        const httpError = error as HttpErrorResponse;
        switch (httpError.status) {
          case 402:
            if (this.configService.currentConfigurationName === 'staff') {
              if (this.setLicenseDialogShown) {
                return EMPTY;
              }
              this.matDialog.open(
                SetLicenseComponent, {
                  data: {}
                }).afterClosed().pipe(map(result => {
                return {message: result} as IActionResult;
              }));
              this.setLicenseDialogShown = true;
            } else {
              this.notificationService.showMessage('License is missing. Contact support.');
            }
            return EMPTY;
          case 401:
            // authorization error
            if (this.configService.getCurrentUrl() === this.configService.getPanelUrl('login')) {
              if (httpError.url.endsWith('plugins/plugins_with_notifications') ||
                httpError.url.endsWith('operations/has_operations_in_progress')) {
                // TODO: only on e2e tests on ci these requests are sometimes made while unauthenticated and tests
                //  would fail. Find a better way to overcome this issue.
                console.warn('An unauthenticated request was made.');
                return EMPTY;
              }
              // we are at login page, pass error
              throw error;
            }

            console.warn('Unauthorized, redirecting to login');
            this.notificationService.showMessage(error.error.detail);
            this.initAuthService();
            this.authService.logout().subscribe(() => {
              this.router.navigateByUrl(this.configService.getPanelUrl('login')).then(() => {});
            });
            return EMPTY;
          case 400:
            // ignored errors, will be treated by caller
            break;
          case 409:
            this.notificationService.showMessage(
              `HTTP Error ${httpError.status}: ${
                httpError.error.detail ? httpError.error.detail : httpError.statusText
              }`
            );
            const queryParams = {};
            Object.assign(queryParams, this.route.snapshot.queryParams);
            this.router.navigate([], {
              relativeTo: this.route,
              queryParams
            });
            throw error;
          case 0:
            if (!this.disconnected) {
              this.disconnected = true;
              if (this.configService.getCurrentUrl() !== this.configService.getPanelUrl('disconnected')) {
                window.location.href = this.configService.getPanelUrl('disconnected');
              }
            }
            return EMPTY;
          default:
            this.notificationService.showMessage(`HTTP Error ${httpError.status}: ${httpError.statusText}`);
        }
      }
      throw error;
    }));
  }
}
