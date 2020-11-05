import { Injectable } from '@angular/core';
import { ConfigService } from '../config/config.service';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  private userLanguageCode: string;

  constructor(private config: ConfigService,) {
  }

  setUserLanguage(languageCode: string) {
    this.userLanguageCode = languageCode;
  }

  clearUserLanguage() {
    this.userLanguageCode = undefined;
  }

  getUserLanguage(): string {
    return this.userLanguageCode;
  }

  getCurrentLanguage(): string {
    let languageCode = this.userLanguageCode;

    if (!languageCode) {
      if (this.config.current && this.config.current.settings) {
        languageCode = this.config.current.settings.defaultLanguage;
      }
    }

    return languageCode;
  }
}
