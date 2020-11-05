import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NetworkCreateComponent } from './network-create/network-create.component';
import { NetworkEditComponent } from './network-edit/network-edit.component';
import { NetworkDetailsComponent } from './network-details/network-details.component';
import { NetworkListComponent } from './network-list/network-list.component';
import { NetworkEditFormComponent } from './tabs/network-edit-form/network-edit-form.component';
import { NetworkDetailsOverviewComponent } from './tabs/network-details-overview/network-details-overview.component';
import { NetworkEditSubnetFormComponent } from './tabs/network-edit-subnet-form/network-edit-subnet-form.component';
import { NetworkAddSubnetComponent } from './network-add-subnet/network-add-subnet.component';
import { NetworkEditSubnetComponent } from './network-edit-subnet/network-edit-subnet.component';
import { NetworksRoutingModule } from './networks-routing.module';
import { ObjectsViewModule } from '@objects-view/objects-view.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { UiModule } from '@shared/ui/ui.module';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';
import { ErrorHandlingModule } from '@shared/error-handling/error-handling.module';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { NetworkAutoCreateComponent } from './network-auto-create/network-auto-create.component';
import { NetworkConfigAutoCreateComponent } from './network-config-auto-create/network-config-auto-create.component';
import { NetworkAutoCreateFormComponent } from './tabs/network-auto-create-form/network-auto-create-form.component';
import { NetworkConfigAutoCreateFormComponent } from './tabs/network-config-auto-create-form/network-config-auto-create-form.component';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { MatIconModule } from '@angular/material/icon';


@NgModule({
  declarations: [
    NetworkCreateComponent,
    NetworkEditComponent,
    NetworkDetailsComponent,
    NetworkListComponent,
    NetworkEditFormComponent,
    NetworkDetailsOverviewComponent,
    NetworkEditSubnetFormComponent,
    NetworkAddSubnetComponent,
    NetworkEditSubnetComponent,
    NetworkAutoCreateComponent,
    NetworkConfigAutoCreateComponent,
    NetworkAutoCreateFormComponent,
    NetworkConfigAutoCreateFormComponent,
  ],
    imports: [
        CommonModule,
        NetworksRoutingModule,
        ObjectsViewModule,
        FlexLayoutModule,
        UiModule,
        MatTableModule,
        MatButtonModule,
        ReactiveFormsModule,
        ErrorHandlingModule,
        MatFormFieldModule,
        MatInputModule,
        MatCheckboxModule,
        MatAutocompleteModule,
        MatSelectModule,
        MatRadioModule,
        MatIconModule,
    ]
})
export class NetworksModule {
}
