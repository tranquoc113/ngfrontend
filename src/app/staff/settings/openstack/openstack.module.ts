import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SettingsOpenstackComponent } from './settings-openstack/settings-openstack.component';
import { OpenstackRoutingModule } from './openstack-routing.module';
import { ObjectsViewModule } from '../../../shared/ui/objects-view/objects-view.module';
import { NotificationsComponent } from './tabs/notifications/notifications.component';
import { DefaultsComponent } from './tabs/defaults/defaults.component';
import { VolumeSizeIncrementsComponent } from './tabs/volume-size-increments/volume-size-increments.component';
import { DiscoveredServicesComponent } from './tabs/discovered-services/discovered-services.component';
import { CredentialsComponent } from './tabs/credentials/credentials.component';
import { UiModule } from '../../../shared/ui/ui.module';
import { ErrorHandlingModule } from '../../../shared/error-handling/error-handling.module';
import { FlexLayoutModule, FlexModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { TestNotificationsDialogComponent } from './tabs/notifications/dialogs/test-notifications-dialog/test-notifications-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { TestCredentialsDialogComponent } from './tabs/credentials/dialogs/test-credentials-dialog/test-credentials-dialog.component';
import { ApiUserDownloadOpenrcComponent } from '../../../shared/common-dialogs/openstack/api-users/api-user-download-openrc/api-user-download-openrc.component';


@NgModule({
  declarations: [
    SettingsOpenstackComponent,
    CredentialsComponent,
    NotificationsComponent,
    DefaultsComponent,
    VolumeSizeIncrementsComponent,
    DiscoveredServicesComponent,
    TestNotificationsDialogComponent,
    TestCredentialsDialogComponent,
  ],
  imports: [
    CommonModule,
    OpenstackRoutingModule,
    ObjectsViewModule,
    UiModule,
    ErrorHandlingModule,
    FlexModule,
    ReactiveFormsModule,
    FormsModule,
    MatButtonModule,
    MatInputModule,
    MatSelectModule,
    MatCheckboxModule,
    MatDialogModule,
    FlexLayoutModule,
  ],
})
export class OpenstackModule {
}
