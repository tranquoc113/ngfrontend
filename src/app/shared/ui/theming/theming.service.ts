import { Inject, Injectable } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { ConfigService } from '../../config/config.service';
import { environment } from '../../../../environments/environment';
import { AppLocalStorageService } from '../../ui-api/app-local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class ThemingService {
  private readonly preBuiltThemes = ['spring', 'navy', 'dusk'];

  public loadCustomStyles() {
    if (environment.production) {
      // load custom themes this way only on prod
      const head = this.document.getElementsByTagName('head')[0];
      for (const customThemeName of this.config.current.settings.availableThemes) {
        if (!(this.preBuiltThemes.indexOf(customThemeName) > -1)) {
          const styleElem = this.document.createElement('link');
          styleElem.rel = 'stylesheet';
          styleElem.type = 'text/css';
          styleElem.href = `assets/themes/${customThemeName}.css`;
          head.appendChild(styleElem);
        }
      }
    }
  }

  public setNewActiveTheme(themeName: string) {
    const oldTheme = this.getActiveThemeName();
    this.appLocalStorageService.setActiveTheme(themeName);
    this.activateTheme(oldTheme);
  }

  public activateTheme(oldThemeName?: string) {
    const themeName = this.getActiveThemeName();
    const body = this.document.getElementsByTagName('body')[0];
    if (oldThemeName) {
      if (body.classList.value.indexOf('app-theme') > -1) {
        body.classList.remove('app-theme-' + oldThemeName);
      }
    }
    body.classList.add('app-theme-' + themeName);
  }

  public getActiveThemeName() {
    const savedTheme = this.appLocalStorageService.getSavedTheme();
    if (savedTheme && this.config && this.config.current && this.config.current.settings) {
      // check if saved theme still exists in available themes
      for (const availableThemeName of this.config.current.settings.availableThemes) {
        if (availableThemeName === savedTheme) {
          return savedTheme;
        }
      }
      // return default theme as saved theme is not in the available themes list anymore
      return this.config.current.settings.defaultTheme;
    } else if (this.config && this.config.current && this.config.current.settings) {
      return this.config.current.settings.defaultTheme;
    }
  }

  constructor(@Inject(DOCUMENT) private document: Document, private config: ConfigService,
              private appLocalStorageService: AppLocalStorageService) { }
}
