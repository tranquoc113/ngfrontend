import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SettingsGeneralComponent } from './settings-general/settings-general.component';
import { GeneralRoutingModule } from './general-routing.module';
import { CurrenciesComponent } from './tabs/currencies/currencies.component';
import { ObjectsViewModule } from '@objects-view/objects-view.module';
import { SignUpFormComponent } from './tabs/sign-up/sign-up-form.component';
import { AuthenticationComponent } from './tabs/authentication/authentication.component';
import { LicenseComponent } from './tabs/license/license.component';
import { TermsOfServiceComponent } from './tabs/terms-of-service/terms-of-service.component';
import { FrontendCustomizationComponent } from './tabs/frontend-customization/frontend-customization.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { UiModule } from '@shared/ui/ui.module';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ErrorHandlingModule } from '@shared/error-handling/error-handling.module';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { EditCurrencyDialogComponent } from './tabs/currencies/dialogs/edit-currency-dialog/edit-currency-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { EditorModule } from '@tinymce/tinymce-angular';
import { EditTermsOfServiceFormComponent } from './tabs/edit-terms-of-service-form/edit-terms-of-service-form.component';
import { MatTableModule } from '@angular/material/table';
import { EditTosComponent } from './edit-tos/edit-tos.component';
import { NewTosComponent } from './new-tos/new-tos.component';


@NgModule({
  declarations: [
    SettingsGeneralComponent,
    CurrenciesComponent,
    SignUpFormComponent,
    AuthenticationComponent,
    LicenseComponent,
    TermsOfServiceComponent,
    FrontendCustomizationComponent,
    EditCurrencyDialogComponent,
    EditTermsOfServiceFormComponent,
    EditTosComponent,
    NewTosComponent,
  ],
    imports: [
        CommonModule,
        GeneralRoutingModule,
        ObjectsViewModule,
        FlexLayoutModule,
        UiModule,
        MatButtonModule,
        ReactiveFormsModule,
        ErrorHandlingModule,
        MatCheckboxModule,
        MatFormFieldModule,
        MatSelectModule,
        MatInputModule,
        MatDialogModule,
        MatAutocompleteModule,
        MatSlideToggleModule,
        FormsModule,
        EditorModule,
        MatTableModule,
    ]
})
export class GeneralModule {
}
