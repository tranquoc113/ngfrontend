import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthModule } from './auth/auth.module';
import { ErrorHandlingModule } from './error-handling/error-handling.module';
import { ConfigModule } from './config/config.module';
import { UiApiModule } from './ui-api/ui-api.module';
import { CommonTabsModule } from './common-tabs/common-tabs.module';
import { UiModule } from './ui/ui.module';
import { FleioApiModule } from './fleio-api/fleio-api.module';
import { FleioDataControlsModule } from './fleio-data-controls/fleio-data-controls.module';
import { CommonDialogsModule } from './common-dialogs/common-dialogs.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    AuthModule,
    CommonTabsModule,
    CommonDialogsModule,
    ConfigModule,
    ErrorHandlingModule,
    FleioApiModule,
    FleioDataControlsModule,
    UiModule,
    UiApiModule,
  ]
})
export class SharedModule { }
