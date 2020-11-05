import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardViewComponent } from './card-view/card-view.component';
import { ListViewComponent } from './list-view/list-view.component';
import { ObjectCardComponent } from './object-card/object-card.component';
import { MatCardModule } from '@angular/material/card';
import { RouterModule } from '@angular/router';
import { ObjectDetailsComponent } from './object-details/object-details.component';
import { MatTabsModule } from '@angular/material/tabs';
import { ObjectsViewComponent } from './objects-view/objects-view.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { ObjectActionsComponent } from './object-actions/object-actions.component';
import { MatMenuModule } from '@angular/material/menu';
import { StatusLineComponent } from './status-line/status-line.component';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { LineTypePipe } from './status-line/line-type.pipe';
import { LineColorPipe } from './status-line/line-color.pipe';
import { UiModule } from '../ui.module';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ObjectsSubheaderComponent } from './objects-subheader/objects-subheader.component';
import { ObjectsOrderingMenuComponent } from './objects-ordering-menu/objects-ordering-menu.component';
import { ObjectsListFilteringComponent } from './objects-list-filtering/objects-list-filtering.component';
import { ObjectsListFilteringDateComponent } from './objects-list-filtering/objects-list-filtering-date/objects-list-filtering-date.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { ComponentHostDirective } from './object-details/component-host.directive';
import { MatDialogModule } from '@angular/material/dialog';
import { ObjectsListFilteringCustomModelComponent } from './objects-list-filtering/objects-list-filtering-custom-model/objects-list-filtering-custom-model.component';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { ObjectsListFilteringDisplayComponent } from './objects-list-filtering-display/objects-list-filtering-display.component';
import { MatChipsModule } from '@angular/material/chips';
import { ObjectsListFilteringChoicesComponent } from './objects-list-filtering/objects-list-filtering-choices/objects-list-filtering-choices.component';
import { MatSelectModule } from '@angular/material/select';
import { ObjectsListFilteringWildCardComponent } from './objects-list-filtering/objects-list-filtering-wild-card/objects-list-filtering-wild-card.component';
import { ObjectsListFilteringDecimalComponent } from './objects-list-filtering/objects-list-filtering-decimal/objects-list-filtering-decimal.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { ObjectsListFilteringBooleanComponent } from './objects-list-filtering/objects-list-filtering-boolean/objects-list-filtering-boolean.component';
import { MatDividerModule } from '@angular/material/divider';
import { FlexLayoutModule, FlexModule } from '@angular/flex-layout';
import { MatNativeDateModule, MatRippleModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatRadioModule } from '@angular/material/radio';
import { ObjectDetailsDialogComponent } from './object-details-dialog/object-details-dialog.component';

@NgModule({
  declarations: [
    CardViewComponent,
    ListViewComponent,
    ObjectCardComponent,
    ObjectDetailsComponent,
    ObjectsViewComponent,
    ObjectActionsComponent,
    StatusLineComponent,
    LineColorPipe,
    LineTypePipe,
    ObjectsSubheaderComponent,
    ObjectsOrderingMenuComponent,
    ObjectsListFilteringComponent,
    ObjectsListFilteringDateComponent,
    ComponentHostDirective,
    ObjectsListFilteringCustomModelComponent,
    ObjectsListFilteringDisplayComponent,
    ObjectsListFilteringChoicesComponent,
    ObjectsListFilteringWildCardComponent,
    ObjectsListFilteringDecimalComponent,
    ObjectsListFilteringBooleanComponent,
    ObjectDetailsDialogComponent,
  ],
  exports: [
    CardViewComponent,
    ListViewComponent,
    ObjectDetailsComponent,
    ObjectsViewComponent,
    ObjectActionsComponent,
    ComponentHostDirective,
    StatusLineComponent,
    LineTypePipe,
    LineColorPipe,
    ObjectDetailsDialogComponent,
  ],
  imports: [
    CommonModule,
    MatCardModule,
    RouterModule,
    MatTabsModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
    MatProgressBarModule,
    UiModule,
    MatTooltipModule,
    MatProgressBarModule,
    MatRippleModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatRadioModule,
    FormsModule,
    MatSortModule,
    MatTableModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    MatChipsModule,
    MatSelectModule,
    MatDialogModule,
    MatCheckboxModule,
    MatDividerModule,
    FlexModule,
    FlexLayoutModule,
  ]
})
export class ObjectsViewModule { }
