import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SshKeyCreateComponent } from './ssh-key-create/ssh-key-create.component';
import { SshKeyListComponent } from './ssh-key-list/ssh-key-list.component';
import { SshKeyEditComponent } from './ssh-key-edit/ssh-key-edit.component';
import { SshKeysRoutingModule } from './ssh-keys-routing.module';
import { ObjectsViewModule } from '@objects-view/objects-view.module';


@NgModule({
  declarations: [
    SshKeyCreateComponent,
    SshKeyListComponent,
    SshKeyEditComponent,
  ],
  imports: [
    CommonModule,
    SshKeysRoutingModule,
    ObjectsViewModule,
  ]
})
export class SshKeysModule {
}
