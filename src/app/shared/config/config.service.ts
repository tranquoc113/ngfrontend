import { Inject, Injectable, LOCALE_ID } from '@angular/core';
import { IPanelConfigModel } from './models/panel-config.model';
import { HttpClient } from '@angular/common/http';
import { IAppConfigModel } from './models/app-config.model';
import { NavigationEnd, RouteConfigLoadStart, Router } from '@angular/router';
import { environment } from '../../../environments/environment';

const configFilesPath = 'assets/config/';
const configBaseFilesPath = 'assets/config-base/';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  private isSubscribedToRouterEvents = false;

  private panels: { [panelName: string]: IPanelConfigModel } = {};

  private currentUrl: string;
  private previousUrl: string = null;

  public app: IAppConfigModel;

  // easy access shortcuts for a specific panel configuration
  public enduser: IPanelConfigModel;
  public reseller: IPanelConfigModel;
  public staff: IPanelConfigModel;
  public current: IPanelConfigModel;
  public currentConfigurationName: string;

  constructor(
    private httpClient: HttpClient,
    @Inject(LOCALE_ID) public locale: string
  ) {
  }

  private _initShortcuts(): void {
    if (this.panels.hasOwnProperty('enduser')) {
      this.enduser = this.panels.enduser;
    }
    if (this.panels.hasOwnProperty('reseller')) {
      this.reseller = this.panels.reseller;
    }
    if (this.panels.hasOwnProperty('staff')) {
      this.staff = this.panels.staff;
    }
  }

  private setActiveConfiguration(configurationName: string) {
    // update configuration
    this.current = this.panels[configurationName];
    this.currentConfigurationName = configurationName;
  }

  public setActiveUrl(url: string) {
    // update urls
    this.previousUrl = this.currentUrl;
    this.currentUrl = url;
  }

  public subscribeToRouterEvents(router: Router) {
    if (!this.isSubscribedToRouterEvents) {
      router.events.subscribe(event => {
        if (event instanceof RouteConfigLoadStart) {
          const routeConfigLoadStart = event as RouteConfigLoadStart;
          if (routeConfigLoadStart.route.data && routeConfigLoadStart.route.data.configurationName) {
            this.setActiveConfiguration(
              routeConfigLoadStart.route.data.configurationName
            );
          }
        }
        if (event instanceof NavigationEnd) {
          this.setActiveUrl(event.url);
        }
      });
      this.isSubscribedToRouterEvents = true;
    }
  }

  public getPanelApiUrl(endpoint: string): string {
    if (this.current) {
      if (!endpoint) {
        // return api url but without the last slash, like we would do if we had an endpoint
        return this.current.urls.backendApiUrl.substring(0, this.current.urls.backendApiUrl.length - 1);
      }
      return this.current.urls.backendApiUrl + endpoint;
    } else {
      if (environment.enableErrorLogging) {
        console.error(`Cannot determine api url for endpoint ${endpoint}`);
      }
      return '';
    }
  }

  public getPanelUrl(fragment: string): string {
    if (this.panelIsRoot()) {
      return '/' + fragment;
    }
    return this.getPanelHomeUrl() + '/' + fragment;
  }

  public getAngularJsPanelUrl(fragment: string): string {
    return this.current.urls.angularJsPanelUrl + fragment;
  }

  public getPanelHomeUrl(): string {
    if (this.panelIsRoot()) {
      return '/';
    }
    return '/' + this.getPanelHomeName();
  }

  public panelIsRoot(): boolean {
    return this.getPanelHomeName() === environment.basePanel;
  }

  public getPanelHomeName(): string {
    if (this.current && this.current.urls) {
      return this.current.urls.homeName;
    } else {
      if (environment.enableErrorLogging) {
        console.error('Cannot get panel home name');
      }
      return '';
    }
  }

  public getImagePath(imageName: string): string {
    if (this.current && this.current.settings) {
      return this.current.settings.imagesPath + imageName;
    }
    return '';
  }

  public getPrevUrl(defaultFragment: string = null): string {
    if (this.previousUrl != null) {
      return this.previousUrl;
    } else {
      return defaultFragment == null ? this.getPanelHomeUrl() : this.getPanelUrl(defaultFragment);
    }
  }

  public getCurrentUrl(): string {
    return this.currentUrl;
  }

  isDict(value: any): boolean {
    return typeof value === 'object' && value !== null && !(value instanceof Array) && !(value instanceof Date);
  }

  mergeObjects<T>(a: T, b: T): T {
    for (const key in a) {
      if (a.hasOwnProperty(key) && this.isDict(a[key])) {
        if (b.hasOwnProperty(key) && this.isDict(b[key])) {
          b[key] = this.mergeObjects(a[key], b[key]);
        }
      }
    }
    return Object.assign({}, a, b) as T;
  }

  loadPanelConfiguration(panelName: string, fileName: string): Promise<null> {
    return new Promise<null>(
      (resolve, reject) => {
        const panelConfigFile = configFilesPath + fileName;
        const panelBaseConfigFile = configBaseFilesPath + fileName;
        this.httpClient.get(panelBaseConfigFile).toPromise().then(
          (baseResponse: IPanelConfigModel) => {
            this.httpClient.get(panelConfigFile).toPromise().then(
              (response: IPanelConfigModel) => {
                this.panels[panelName] = this.mergeObjects<IPanelConfigModel>(baseResponse, response);
                resolve();
              }
            ).catch(
              () => {
                reject('Failed to load configuration file ${fileName} for panel ${panelName}');
              }
            );
          }
        ).catch(
          () => {
            reject('Failed to load base configuration file ${fileName} for panel ${panelName}');
          }
        );
      }
    );
  }

  load() {
    return new Promise<void>((resolve, reject) => {
      const promises = [];
      Object.keys(environment.panels).map(panelName => {
        const panel = environment.panels[panelName];
        promises.push(this.loadPanelConfiguration(panelName, panel.configFile));
      });
      Promise.all(promises).then(
        () => {
          this._initShortcuts();
          resolve();
        }
      ).catch(
        () => {
          reject('Failed to load panel configurations');
        }
      );
    });
  }
}
