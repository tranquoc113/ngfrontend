import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GatewayListComponent } from './gateway-list/gateway-list.component';
import { GatewayEditComponent } from './gateway-edit/gateway-edit.component';
import { GatewayEditFormComponent } from './tabs/gateway-edit-form/gateway-edit-form.component';
import { GatewaysRoutingModule } from './gateways-routing.module';
import { ObjectsViewModule } from '@objects-view/objects-view.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { ErrorHandlingModule } from '@shared/error-handling/error-handling.module';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { UiModule } from '@shared/ui/ui.module';


@NgModule({
  declarations: [
    GatewayListComponent,
    GatewayEditComponent,
    GatewayEditFormComponent
  ],
    imports: [
        CommonModule,
        GatewaysRoutingModule,
        ObjectsViewModule,
        FlexLayoutModule,
        ReactiveFormsModule,
        MatCheckboxModule,
        ErrorHandlingModule,
        MatFormFieldModule,
        MatInputModule,
        UiModule,
    ]
})
export class GatewaysModule {
}
