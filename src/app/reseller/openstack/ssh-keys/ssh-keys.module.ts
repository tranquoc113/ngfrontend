import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SshKeyCreateComponent } from './ssh-key-create/ssh-key-create.component';
import { SshKeyDetailsComponent } from './ssh-key-details/ssh-key-details.component';
import { SshKeyEditComponent } from './ssh-key-edit/ssh-key-edit.component';
import { SshKeyListComponent } from './ssh-key-list/ssh-key-list.component';
import { SshKeysRoutingModule } from './ssh-keys-routing.module';
import { ErrorHandlingModule } from '@shared/error-handling/error-handling.module';
import { ReactiveFormsModule } from '@angular/forms';
import { ObjectsViewModule } from '@objects-view/objects-view.module';
import { MatButtonModule } from '@angular/material/button';
import { FlexModule } from '@angular/flex-layout';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';


@NgModule({
  declarations: [
    SshKeyCreateComponent,
    SshKeyDetailsComponent,
    SshKeyEditComponent,
    SshKeyListComponent,
  ],
  imports: [
    CommonModule,
    SshKeysRoutingModule,
    ErrorHandlingModule,
    ReactiveFormsModule,
    ObjectsViewModule,
    MatButtonModule,
    FlexModule,
    MatFormFieldModule,
    MatInputModule,
  ]
})
export class SshKeysModule {
}
