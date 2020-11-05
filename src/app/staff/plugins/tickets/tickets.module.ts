import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ObjectsViewModule } from '@objects-view/objects-view.module';
import { ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatInputModule } from '@angular/material/input';
import { ErrorHandlingModule } from '@shared/error-handling/error-handling.module';
import { MatSelectModule } from '@angular/material/select';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { UiModule } from '@shared/ui/ui.module';
import { TicketsListComponent } from './tickets-list/tickets-list.component';
import { TicketsOpenNewComponent } from './tickets-open-new/tickets-open-new.component';
import { TicketsOpenNewTabComponent } from './tabs/tickets-open-new-tab/tickets-open-new-tab.component';
import { EditorModule } from '@tinymce/tinymce-angular';
import { TicketDetailsComponent } from './ticket-details/ticket-details.component';
import { TicketDetailsTabComponent } from './tabs/ticket-details-tab/ticket-details-tab.component';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { TicketEditComponent } from './ticket-edit/ticket-edit.component';
import { TicketEditFormComponent } from './tabs/ticket-edit-form/ticket-edit-form.component';
import { TicketsPluginNotificationsComponent } from './tickets-plugin-notifications/tickets-plugin-notifications.component';
import { TicketsSignaturesButtonComponent } from './tickets-signatures-button/tickets-signatures-button.component';
import { TicketLinkDialogComponent } from './dialogs/ticket-link-dialog/ticket-link-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { RouterModule } from '@angular/router';
import { RemoveTicketLinkDialogComponent } from './dialogs/remove-ticket-link-dialog/remove-ticket-link-dialog.component';
import { TicketEditMessageDialogComponent } from './dialogs/ticket-edit-message-dialog/ticket-edit-message-dialog.component';
import { ClientDetailsTicketsListComponent } from './client-details-tickets-list/client-details-tickets-list.component';
import { MatTableModule } from '@angular/material/table';
import { UserDetailsTicketsListComponent } from './user-details-tickets-list/user-details-tickets-list.component';
import { UserSignaturesComponent } from './user-signatures/user-signatures.component';
import { TicketEditSignaturesFormComponent } from './tabs/ticket-edit-signatures-form/ticket-edit-signatures-form.component';
import { AddSignatureDialogComponent } from './tabs/ticket-edit-signatures-form/add-signature-dialog/add-signature-dialog.component';

@NgModule({
  declarations: [
    TicketsPluginNotificationsComponent,
    TicketsSignaturesButtonComponent,
    TicketsListComponent,
    TicketsOpenNewComponent,
    TicketsOpenNewTabComponent,
    TicketDetailsComponent,
    TicketDetailsTabComponent,
    TicketEditComponent,
    TicketEditFormComponent,
    TicketLinkDialogComponent,
    RemoveTicketLinkDialogComponent,
    TicketEditMessageDialogComponent,
    ClientDetailsTicketsListComponent,
    UserDetailsTicketsListComponent,
    UserSignaturesComponent,
    TicketEditSignaturesFormComponent,
    AddSignatureDialogComponent,
  ],
  entryComponents: [
    TicketLinkDialogComponent,
    RemoveTicketLinkDialogComponent,
    TicketEditMessageDialogComponent,
  ],
  exports: [
    TicketLinkDialogComponent,
    RemoveTicketLinkDialogComponent,
    TicketsPluginNotificationsComponent,
    TicketsSignaturesButtonComponent,
    TicketEditMessageDialogComponent,
    ClientDetailsTicketsListComponent,
    UserDetailsTicketsListComponent,
  ],
  imports: [
    CommonModule,
    ObjectsViewModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    MatInputModule,
    ErrorHandlingModule,
    MatSelectModule,
    MatAutocompleteModule,
    UiModule,
    EditorModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
    MatCheckboxModule,
    RouterModule,
    MatTableModule,
  ]
})
export class TicketsModule {
}
