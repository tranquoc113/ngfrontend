import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { APP_INITIALIZER, NgModule } from '@angular/core';

import { ResellerModule } from '../reseller.module';
import { SharedModule } from '../../shared/shared.module';
import { HTTP_INTERCEPTORS, HttpClientModule, HttpClientXsrfModule } from '@angular/common/http';
import { ConfigService } from '../../shared/config/config.service';
import { AuthInterceptor } from '../../shared/auth/auth-interceptor';
import { ErrorInterceptor } from '../../shared/error-handling/error-interceptor';
import { AppComponent } from './app.component';
import { AppResellerRoutingModule } from './app-reseller-routing.module';
import { LanguageInterceptor } from '../../shared/language/language-interceptor';

export function initializeApp(configService: ConfigService) {
  return () => configService.load();
}

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppResellerRoutingModule,
    HttpClientModule,
    ResellerModule,
    SharedModule,
    HttpClientXsrfModule.withOptions({
      cookieName: 'csrftoken',
      headerName: 'X-CSRFToken'
    }),
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: initializeApp,
      deps: [ConfigService],
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LanguageInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent]
})
export class AppResellerModule { }
