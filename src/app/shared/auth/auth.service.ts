import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { ConfigService } from '../config/config.service';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { IUserDataModel } from './models/user-data.model';
import { IAuthResultModel } from './models/auth-result.model';
import { LanguageService } from '../language/language.service';
import { UiFeaturesService } from '../ui-api/ui-features.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly loginEndpoint: string;
  private readonly logoutEndpoint: string;
  private readonly resetPasswordEndpoint: string;
  private readonly setNewPasswordEndpoint: string;
  private readonly currentUserEndpoint: string;

  // NOTE: user data should be refreshed from time to time
  private userDataBS: BehaviorSubject<IUserDataModel> = new BehaviorSubject<IUserDataModel>(null);
  private isLoggedInBS: BehaviorSubject<boolean> = new BehaviorSubject(false);
  private loggedInCompletedBS: BehaviorSubject<boolean> = new BehaviorSubject(false);

  public readonly observableUserData: Observable<IUserDataModel> = this.userDataBS.asObservable();
  public readonly isLoggedIn: Observable<boolean> = this.isLoggedInBS.asObservable();
  public readonly loggedInCompleted: Observable<boolean> = this.loggedInCompletedBS.asObservable();

  public userData: IUserDataModel = null;

  public feature(featureName: string): boolean {
    featureName = featureName.toLowerCase();
    if (this.userData && this.userData.features) {
      if (featureName.startsWith('ui.')) {
        return this.uiFeatures.feature(featureName);
      } else {
        return !!this.userData.features[featureName];
      }
    }

    // defaults to false if no feature found
    return false;
  }

  constructor(
    private httpClient: HttpClient,
    private config: ConfigService,
    private lang: LanguageService,
    private uiFeatures: UiFeaturesService,
  ) {
    this.loginEndpoint = this.config.getPanelApiUrl('login');
    this.logoutEndpoint = this.config.getPanelApiUrl('logout');
    this.resetPasswordEndpoint = this.config.getPanelApiUrl('reset-password/');
    this.currentUserEndpoint = this.config.getPanelApiUrl('current-user');
    this.setNewPasswordEndpoint = this.config.getPanelApiUrl('reset-password/confirm/');
  }

  public checkIfLoggedIn(): Observable<boolean> {
    return this.httpClient.get(
      this.currentUserEndpoint,
    ).pipe(
      map(currentUserData => {
        this.userData = currentUserData as IUserDataModel;
        if (this.userData.user) {
          this.lang.setUserLanguage(this.userData.user.language);
        }
        this.userDataBS.next(this.userData);
        const loggedIn = !!this.userData.user;
        this.isLoggedInBS.next(loggedIn);
        return loggedIn;
      })
    );
  }

  public setNewPassword(newPasswordData: {
    new_password: string,
    confirm_password: string,
    user_id: string,
    token: string,
  }){
    return this.httpClient.post(
      this.setNewPasswordEndpoint,
      newPasswordData
    );
  }

  public resetPassword(usernameOrEmail: string) {
    return this.httpClient.post(
      this.resetPasswordEndpoint,
      {
        username_or_email: usernameOrEmail
      }
    );
  }

  public login(username, password, rememberMe, sfaParams=null): Observable<IAuthResultModel> {
    return this.httpClient.post(
      this.loginEndpoint,
      {
        username,
        password,
        remember_me: rememberMe,
        sfa_params: sfaParams
      },
    ).pipe(map((currentUserData: any) => {
        this.userData = currentUserData as IUserDataModel;
        if (this.userData.user) {
          this.lang.setUserLanguage(this.userData.user.language);
        }
        this.loggedInCompletedBS.next(true);
        let sfaRequired = false;
        if (currentUserData.sfa_required) {
          sfaRequired = currentUserData.sfa_required;
        }
        let sfaMethods = null;
        if (currentUserData.sfa_methods) {
          sfaMethods = currentUserData.sfa_methods;
        }
        let rememberSFAToken = null;
        if (currentUserData.remember_sfa_token) {
          rememberSFAToken = currentUserData.remember_sfa_token;
        }
        return {
          success: true,
          errorMessage: '',
          rememberSFAToken,
          sfaRequired,
          sfaMethods,
        };
      }),
      catchError((err: HttpErrorResponse) => {
        this.lang.clearUserLanguage();
        // TODO: find a way to use constants instead of codes here
        if (err.status === 401) {
          return of({
            success: false,
            errorMessage: err.error.detail || 'Incorrect user name or password'
          });
        }

        return throwError(err);
      })
    );
  }

  public logout(): Observable<any> {
    return this.httpClient.post(
      this.logoutEndpoint, {}
    ).pipe(map(response => {
      this.lang.clearUserLanguage();
      this.userData = null;
      return response;
    }));
  }

  public isImpersonating(): boolean {
    return this.userData && this.userData.impersonated;
  }

  public stopImpersonating() {
    const staffBackendUrl = localStorage.getItem('fleio.flStaffBackend');
    const staffFrontendUrl = localStorage.getItem('fleio.flStaffUrl');

    this.httpClient.post(
      `${staffBackendUrl}/users/stop_impersonation`, {},
    ).subscribe(() => {
      window.location.href = staffFrontendUrl;
    });
  }
}
