import { Injectable } from '@angular/core';
import { ISFAMethod } from '../core/model/sfa-method.model';

@Injectable({
  providedIn: 'root',
})
export class SFALoginDataService {
  username: string;
  password: string;
  rememberMe: boolean;
  nextPath: string;
  sfaMethods: Array<ISFAMethod>;
  initializedAuthenticators: {
    [name: string]: boolean;
  } = {};
  constructor() {
  }

  initAuthenticator(name: string) {
    this.initializedAuthenticators[name] = true;
  }

  setLoginData(
    username: string,
    password: string,
    rememberMe: boolean,
    nextPath: string,
    sfaMethods: Array<ISFAMethod>,
  ) {
    this.username = username;
    this.password = password;
    this.rememberMe = rememberMe;
    this.nextPath = nextPath;
    this.sfaMethods = sfaMethods;
  }
}
