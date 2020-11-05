import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PluginComponentHostDirective } from './plugin-ui/plugin-component-host.directive';
import { PluginUIComponent } from './plugin-ui/plugin-ui.component';
import { UiModule } from '../ui/ui.module';
import { MatIconModule } from '@angular/material/icon';
import { TicketsModule } from '../../staff/plugins/tickets/tickets.module';
import { TodoModule } from '../../staff/plugins/todo/todo.module';
import { DepartmentsModule } from '../../staff/plugins/tickets/departments/departments.module';
import { GoogleAuthenticatorDetailsTabComponent } from './tabs/common/google-authenticator-details-tab/google-authenticator-details-tab.component';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { ErrorHandlingModule } from '@shared/error-handling/error-handling.module';
import { MatInputModule } from '@angular/material/input';
import { SmsAuthenticatorDetailsTabComponent } from './tabs/common/sms-authenticator-details-tab/sms-authenticator-details-tab.component';
import { FlexModule } from '@angular/flex-layout';
import { GoogleAuthenticatorConfirmFormComponent } from './tabs/common/google-authenticator-confirm-form/google-authenticator-confirm-form.component';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { SmsAuthenticatorConfirmFormComponent } from './tabs/common/sms-authenticator-confirm-form/sms-authenticator-confirm-form.component';
import { DomainsPluginComponentsModule } from '../../staff/plugins/domains/domains-plugin-components.module';
import { CpanelModule } from '../../staff/plugins/cpanel/cpanel.module';
import { CpanelserverModule } from '../../staff/plugins/cpanelserver/cpanelserver.module';
import { OpenstackModule } from '../../staff/plugins/openstack/openstack.module';

@NgModule({
  declarations: [
    PluginComponentHostDirective,
    PluginUIComponent,
    GoogleAuthenticatorDetailsTabComponent,
    SmsAuthenticatorDetailsTabComponent,
    GoogleAuthenticatorConfirmFormComponent,
    SmsAuthenticatorConfirmFormComponent,
  ],
  exports: [
    PluginUIComponent,
  ],
  imports: [
    CommonModule,
    MatIconModule,
    UiModule,
    TicketsModule,
    TodoModule,
    CpanelModule,
    CpanelserverModule,
    OpenstackModule,
    DepartmentsModule,
    MatButtonModule,
    RouterModule,
    ReactiveFormsModule,
    ErrorHandlingModule,
    MatInputModule,
    FlexModule,
    MatCardModule,
    MatCheckboxModule,
    DomainsPluginComponentsModule,
  ]
})
export class PluginsModule { }
