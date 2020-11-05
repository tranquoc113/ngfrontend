import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FloatingIpListComponent } from './floating-ip-list/floating-ip-list.component';
import { FloatingIpCreateComponent } from './floating-ip-create/floating-ip-create.component';
import { FloatingIpDetailsComponent } from './floating-ip-details/floating-ip-details.component';
import { FloatingIpEditFormComponent } from './tabs/floating-ip-edit-form/floating-ip-edit-form.component';
import { FloatingIpDetailsOverviewComponent } from './tabs/floating-ip-details-overview/floating-ip-details-overview.component';
import { FloatingIpsRoutingModule } from './floating-ips-routing.module';
import { ObjectsViewModule } from '@objects-view/objects-view.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { ErrorHandlingModule } from '@shared/error-handling/error-handling.module';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatInputModule } from '@angular/material/input';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatSelectModule } from '@angular/material/select';
import { UiModule } from '@shared/ui/ui.module';


@NgModule({
  declarations: [
    FloatingIpListComponent,
    FloatingIpCreateComponent,
    FloatingIpDetailsComponent,
    FloatingIpEditFormComponent,
    FloatingIpDetailsOverviewComponent,
  ],
    imports: [
        CommonModule,
        FloatingIpsRoutingModule,
        ObjectsViewModule,
        FlexLayoutModule,
        ReactiveFormsModule,
        ErrorHandlingModule,
        MatFormFieldModule,
        MatCheckboxModule,
        MatInputModule,
        MatAutocompleteModule,
        MatSelectModule,
        UiModule,
    ]
})
export class FloatingIpsModule {
}
