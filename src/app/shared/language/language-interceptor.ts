import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LanguageService } from './language.service';

@Injectable()
export class LanguageInterceptor implements HttpInterceptor {
  constructor(private lang: LanguageService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const languageCode = this.lang.getCurrentLanguage();
    let request = req;

    if (languageCode) {
      request = req.clone({
        headers: req.headers.set('Accept-Language', languageCode)
      })
    }

    return next.handle(request);
  }
}
