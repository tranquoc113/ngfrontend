import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfigurationListComponent } from './configuration-list/configuration-list.component';
import { ConfigurationDetailsComponent } from './configuration-details/configuration-details.component';
import { ConfigurationCreateComponent } from './configuration-create/configuration-create.component';
import { ConfigurationEditComponent } from './configuration-edit/configuration-edit.component';
import { ConfigurationsRoutingModule } from './configurations-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { ErrorHandlingModule } from '../../../shared/error-handling/error-handling.module';
import { ObjectsViewModule } from '../../../shared/ui/objects-view/objects-view.module';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatInputModule } from '@angular/material/input';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { MatExpansionModule } from '@angular/material/expansion';

@NgModule({
  declarations: [
    ConfigurationListComponent,
    ConfigurationDetailsComponent,
    ConfigurationCreateComponent,
    ConfigurationEditComponent,
  ],
  entryComponents: [
  ],
  imports: [
    CommonModule,
    ConfigurationsRoutingModule,
    ReactiveFormsModule,
    ErrorHandlingModule,
    ObjectsViewModule,
    MatFormFieldModule,
    MatCheckboxModule,
    MatInputModule,
    FlexLayoutModule,
    MatSelectModule,
    MatRadioModule,
    MatExpansionModule,
  ]
})
export class ConfigurationsModule { }
