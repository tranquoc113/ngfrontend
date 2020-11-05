import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { ReactiveFormsModule } from '@angular/forms';
import { FleioServiceDynamicUsageComponent } from './service-dynamic-usage/fleio-service-dynamic-usage.component';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTableModule } from '@angular/material/table';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FlavorsAsCardsComponent } from './flavors-as-cards/flavors-as-cards.component';
import { MatIconModule } from '@angular/material/icon';
import { ImagesAsCardsComponent } from './images-as-cards/images-as-cards.component';
import { UiModule } from '../ui/ui.module';
import { MatTabsModule } from '@angular/material/tabs';
import { SetLicenseComponent } from './set-license/set-license.component';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { LicenseWarningDialogComponent } from './license-warning-dialog/license-warning-dialog.component';
import { ErrorHandlingModule } from '../error-handling/error-handling.module';
import { CustomFieldsComponent } from './custom-fields/custom-fields.component';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { OpenstackResourceLinkComponent } from './openstack-resource-link/openstack-resource-link.component';
import { RouterModule } from '@angular/router';
import { MatTooltipModule } from '@angular/material/tooltip';


@NgModule({
  declarations: [
    FleioServiceDynamicUsageComponent,
    FlavorsAsCardsComponent,
    ImagesAsCardsComponent,
    SetLicenseComponent,
    LicenseWarningDialogComponent,
    CustomFieldsComponent,
    OpenstackResourceLinkComponent,
  ],
  exports: [
    FleioServiceDynamicUsageComponent,
    FlavorsAsCardsComponent,
    ImagesAsCardsComponent,
    SetLicenseComponent,
    LicenseWarningDialogComponent,
    CustomFieldsComponent,
    OpenstackResourceLinkComponent,
  ],
  entryComponents: [
    SetLicenseComponent,
    LicenseWarningDialogComponent,
  ],
    imports: [
        CommonModule,
        MatAutocompleteModule,
        ReactiveFormsModule,
        MatDividerModule,
        MatExpansionModule,
        MatTableModule,
        FlexLayoutModule,
        MatIconModule,
        UiModule,
        MatTabsModule,
        MatInputModule,
        MatDialogModule,
        MatButtonModule,
        ErrorHandlingModule,
        MatSelectModule,
        MatCheckboxModule,
        RouterModule,
        MatTooltipModule
    ]
})
export class FleioDataControlsModule { }
