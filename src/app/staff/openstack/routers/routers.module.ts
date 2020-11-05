import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterListComponent } from './router-list/router-list.component';
import { RouterCreateComponent } from './router-create/router-create.component';
import { RouterEditComponent } from './router-edit/router-edit.component';
import { RouterDetailsComponent } from './router-details/router-details.component';
import { RouterDetailsOverviewComponent } from './tabs/router-details-overview/router-details-overview.component';
import { RouterEditFormComponent } from './tabs/router-edit-form/router-edit-form.component';
import { RouterAddInterfaceComponent } from './router-add-interface/router-add-interface.component';
import { RouterAddInterfaceFormComponent } from './tabs/router-add-interface-form/router-add-interface-form.component';
import { ObjectsViewModule } from '@objects-view/objects-view.module';
import { RoutersRoutingModule } from './routers-routing.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { ErrorHandlingModule } from '@shared/error-handling/error-handling.module';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { UiModule } from '@shared/ui/ui.module';


@NgModule({
  declarations: [
    RouterListComponent,
    RouterCreateComponent,
    RouterEditComponent,
    RouterDetailsComponent,
    RouterDetailsOverviewComponent,
    RouterEditFormComponent,
    RouterAddInterfaceComponent,
    RouterAddInterfaceFormComponent
  ],
    imports: [
        CommonModule,
        RoutersRoutingModule,
        ObjectsViewModule,
        FlexLayoutModule,
        ReactiveFormsModule,
        ErrorHandlingModule,
        MatFormFieldModule,
        MatSelectModule,
        MatInputModule,
        MatCheckboxModule,
        MatAutocompleteModule,
        UiModule
    ]
})
export class RoutersModule {
}
