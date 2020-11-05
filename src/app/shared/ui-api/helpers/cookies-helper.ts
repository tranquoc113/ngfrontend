import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CookiesHelper {
  public static getCookie(name: string) {
    const c = document.cookie.match('(^|[^;]+)\\s*' + name + '\\s*=\\s*([^;]+)');
    return c ? c.pop() : '';
  }

  public static setCookie(name: string, value: any, days: number) {
    let expires = '';
    if (days) {
      const date = new Date();
      date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
      expires = '; expires=' + date.toUTCString();
    }
    document.cookie = name + '=' + (value || '')  + expires + '; path=/';
  }
}
