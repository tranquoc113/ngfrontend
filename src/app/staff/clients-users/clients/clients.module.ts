import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientsRoutingModule } from './clients-routing.module';
import { ObjectsViewModule } from '../../../shared/ui/objects-view/objects-view.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ErrorHandlingModule } from '../../../shared/error-handling/error-handling.module';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { FleioDataControlsModule } from '../../../shared/fleio-data-controls/fleio-data-controls.module';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatSelectModule } from '@angular/material/select';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTableModule } from '@angular/material/table';
import { MatDividerModule } from '@angular/material/divider';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { UiModule } from '../../../shared/ui/ui.module';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { ClientEditComponent } from './client-edit/client-edit.component';
import { ClientCreateComponent } from './client-create/client-create.component';
import { ClientDetailsComponent } from './client-details/client-details.component';
import { ClientListComponent } from './client-list/client-list.component';
import { MatRadioModule } from '@angular/material/radio';
import { ClientDetailsResellerServiceComponent } from './tabs/client-details-reseller-service/client-details-reseller-service.component';
import { ResellerEnduserPanelUrlDialogComponent } from './tabs/client-details-reseller-service/dialogs/reseller-enduser-panel-url-dialog/reseller-enduser-panel-url-dialog.component';
import { CreateResellerServiceDialogComponent } from './tabs/client-details-reseller-service/dialogs/create-reseller-service-dialog/create-reseller-service-dialog.component';
import { ClientSendMassEmailComponent } from './client-send-mass-email/client-send-mass-email.component';
import { CommonTabsModule } from '../../../shared/common-tabs/common-tabs.module';


@NgModule({
  declarations: [
    ClientListComponent,
    ClientDetailsComponent,
    ClientEditComponent,
    ClientCreateComponent,
    ClientDetailsResellerServiceComponent,
    ResellerEnduserPanelUrlDialogComponent,
    CreateResellerServiceDialogComponent,
    ClientSendMassEmailComponent
  ],
  entryComponents: [
    ClientDetailsResellerServiceComponent,
    ResellerEnduserPanelUrlDialogComponent,
    CreateResellerServiceDialogComponent,
  ],
  imports: [
    CommonModule,
    ClientsRoutingModule,
    ObjectsViewModule,
    FlexLayoutModule,
    ErrorHandlingModule,
    MatFormFieldModule,
    MatCheckboxModule,
    ReactiveFormsModule,
    MatInputModule,
    FleioDataControlsModule,
    MatAutocompleteModule,
    MatSelectModule,
    MatExpansionModule,
    MatTableModule,
    MatDividerModule,
    MatSlideToggleModule,
    UiModule,
    MatButtonModule,
    MatDialogModule,
    MatRadioModule,
    CommonTabsModule,
  ]
})
export class ClientsModule {
}
