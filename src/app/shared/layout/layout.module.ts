import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PanelLayoutComponent } from './panel-layout/panel-layout.component';
import { BreadcrumbsComponent } from './top-bar/breadcrumbs/breadcrumbs.component';
import { HelloUserButtonComponent } from './top-bar/hello-user-button/hello-user-button.component';
import { PluginsNotificationsComponent } from './top-bar/plugins-notifications/plugins-notifications.component';
import { SearchBoxComponent } from './top-bar/search-box/search-box.component';
import { StopImpersonatingButtonComponent } from './top-bar/stop-impersonating-button/stop-impersonating-button.component';
import { TopBarComponent } from './top-bar/top-bar.component';
import { UiModule } from '../ui/ui.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatRippleModule } from '@angular/material/core';
import { MatMenuModule } from '@angular/material/menu';
import { PluginsModule } from '../plugins/plugins.module';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { TodoModule } from '../../staff/plugins/todo/todo.module';
import { LicenseWarningComponent } from './top-bar/license-warning/license-warning.component';
import { OperationsInProgressComponent } from './top-bar/operations-in-progress/operations-in-progress.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';


@NgModule({
  declarations: [
    PanelLayoutComponent,
    BreadcrumbsComponent,
    HelloUserButtonComponent,
    PluginsNotificationsComponent,
    SearchBoxComponent,
    StopImpersonatingButtonComponent,
    TopBarComponent,
    LicenseWarningComponent,
    OperationsInProgressComponent,
  ],
  exports: [
    PanelLayoutComponent,
    TopBarComponent,
  ],
  imports: [
    CommonModule,
    UiModule,
    FlexLayoutModule,
    RouterModule,
    MatIconModule,
    MatRippleModule,
    MatMenuModule,
    PluginsModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatToolbarModule,
    MatProgressBarModule,
    TodoModule,
    MatProgressSpinnerModule
  ]
})
export class LayoutModule {
}
