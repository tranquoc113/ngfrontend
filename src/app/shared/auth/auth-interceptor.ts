import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpParameterCodec,
  HttpParams,
  HttpRequest
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { NotificationService } from '../ui-api/notification.service';
import { CookiesHelper } from '../ui-api/helpers/cookies-helper';

// TODO(manu): move this logic to a new EncoderInterceptor
class CustomEncoder implements HttpParameterCodec {
  encodeKey(key: string): string {
    return encodeURIComponent(key);
  }

  encodeValue(value: string): string {
    return encodeURIComponent(value);
  }

  decodeKey(key: string): string {
    return decodeURIComponent(key);
  }

  decodeValue(value: string): string {
    return decodeURIComponent(value);
  }
}

function getCookie(name) {
  return CookiesHelper.getCookie(name);
}


@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private notificationService: NotificationService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const params = new HttpParams({encoder: new CustomEncoder(), fromString: req.params.toString()});
    const updatedRequestParams = {
      withCredentials: true,
      params,
    } as any;
    if (window.hasOwnProperty('setHeaders')) {
      // @ts-ignore
      const customHeaders = window.setHeaders(req, getCookie);
      if (customHeaders) {
        updatedRequestParams.setHeaders = customHeaders;
      }
    }
    const updatedRequest = req.clone(updatedRequestParams);

    return next.handle(updatedRequest);
  }
}
