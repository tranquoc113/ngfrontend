import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { APP_INITIALIZER, NgModule } from '@angular/core';

import { AppStaffRoutingModule } from './app-staff-routing.module';

import { SharedModule } from '../../shared/shared.module';
import { HTTP_INTERCEPTORS, HttpClientModule, HttpClientXsrfModule } from '@angular/common/http';
import { ConfigService } from '../../shared/config/config.service';
import { AuthInterceptor } from '../../shared/auth/auth-interceptor';
import { ErrorInterceptor } from '../../shared/error-handling/error-interceptor';
import { StaffModule } from '../staff.module';
import { AppComponent } from './app.component';
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
    AppStaffRoutingModule,
    HttpClientModule,
    StaffModule,
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
export class AppStaffModule { }
