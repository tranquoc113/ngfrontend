import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ZoneListComponent } from './zone-list/zone-list.component';
import { ZoneEditComponent } from './zone-edit/zone-edit.component';
import { ZoneCreateComponent } from './zone-create/zone-create.component';
import { ZoneDetailsComponent } from './zone-details/zone-details.component';
import { ZoneEditFormComponent } from './tabs/zone-edit-form/zone-edit-form.component';
import { ZoneDetailsOverviewComponent } from './tabs/zone-details-overview/zone-details-overview.component';
import { ZonesRoutingModule } from './zones-routing.module';
import { ObjectsViewModule } from '@objects-view/objects-view.module';
import { ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ErrorHandlingModule } from '@shared/error-handling/error-handling.module';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { UiModule } from '@shared/ui/ui.module';


@NgModule({
  declarations: [
    ZoneListComponent,
    ZoneEditComponent,
    ZoneCreateComponent,
    ZoneDetailsComponent,
    ZoneEditFormComponent,
    ZoneDetailsOverviewComponent,
  ],
    imports: [
        CommonModule,
        ZonesRoutingModule,
        ObjectsViewModule,
        ReactiveFormsModule,
        FlexLayoutModule,
        ErrorHandlingModule,
        MatFormFieldModule,
        MatInputModule,
        MatAutocompleteModule,
        MatSelectModule,
        MatCheckboxModule,
        MatButtonModule,
        MatIconModule,
        UiModule,
    ]
})
export class ZonesModule { }
