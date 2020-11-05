import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SideNavMenuComponent } from './menu/side-nav-menu/side-nav-menu.component';
import { MatTreeModule } from '@angular/material/tree';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar'
import { MatIconModule } from '@angular/material/icon';
import { LogoComponent } from './logo/logo.component';
import { MenuItemComponent } from './menu/menu-item/menu-item.component';
import { MenuItemContainerComponent } from './menu/menu-item-container/menu-item-container.component';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GravatarComponent } from './gravatar/gravatar.component';
import { IconComponent } from './common/icon/icon.component';
import { FlBackdropComponent } from './fl-backdrop/fl-backdrop.component';
import { PhoneInputComponent } from '../fleio-data-controls/phone-input/phone-input.component';
import { MatRippleModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { UploadInterfaceComponent } from './upload-interface/upload-interface.component';
import { YesNoPipe } from './common/pipes/yes-no.pipe';
import { SnackbarWithLinkComponent } from './snackbar-with-link/snackbar-with-link.component';
import { FormSubmitDirective } from './common/directives/form-submit.directive';

@NgModule({
  declarations: [
    SideNavMenuComponent,
    LogoComponent,
    MenuItemComponent,
    MenuItemContainerComponent,
    GravatarComponent,
    IconComponent,
    FlBackdropComponent,
    PhoneInputComponent,
    UploadInterfaceComponent,
    YesNoPipe,
    SnackbarWithLinkComponent,
    FormSubmitDirective,
  ],
  exports: [
    IconComponent,
    LogoComponent,
    GravatarComponent,
    FlBackdropComponent,
    PhoneInputComponent,
    SideNavMenuComponent,
    UploadInterfaceComponent,
    YesNoPipe,
    FormSubmitDirective,
  ],
  imports: [
    CommonModule,
    RouterModule,
    FlexLayoutModule,
    MatTreeModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatProgressBarModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatMenuModule,
    MatRippleModule,
    MatProgressSpinnerModule,
    FormsModule,
    MatSelectModule,
  ]
})
export class UiModule { }
