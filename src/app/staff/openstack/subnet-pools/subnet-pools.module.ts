import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SubnetPoolListComponent } from './subnet-pool-list/subnet-pool-list.component';
import { SubnetPoolCreateComponent } from './subnet-pool-create/subnet-pool-create.component';
import { SubnetPoolEditComponent } from './subnet-pool-edit/subnet-pool-edit.component';
import { SubnetPoolDetailsComponent } from './subnet-pool-details/subnet-pool-details.component';
import { SubnetPoolDetailsOverviewComponent } from './tabs/subnet-pool-details-overview/subnet-pool-details-overview.component';
import { SubnetPoolEditFormComponent } from './tabs/subnet-pool-edit-form/subnet-pool-edit-form.component';
import { SubnetPoolsRoutingModule } from './subnet-pools-routing.module';
import { ObjectsViewModule } from '@objects-view/objects-view.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { ErrorHandlingModule } from '@shared/error-handling/error-handling.module';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { UiModule } from '@shared/ui/ui.module';


@NgModule({
  declarations: [
    SubnetPoolListComponent,
    SubnetPoolCreateComponent,
    SubnetPoolEditComponent,
    SubnetPoolDetailsComponent,
    SubnetPoolDetailsOverviewComponent,
    SubnetPoolEditFormComponent,
  ],
    imports: [
        CommonModule,
        SubnetPoolsRoutingModule,
        ObjectsViewModule,
        FlexLayoutModule,
        ReactiveFormsModule,
        ErrorHandlingModule,
        MatFormFieldModule,
        MatInputModule,
        MatCheckboxModule,
        MatAutocompleteModule,
        MatSelectModule,
        MatButtonModule,
        MatIconModule,
        UiModule,
    ]
})
export class SubnetPoolsModule {
}
