import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OpenstackPlansRoutingModule } from './openstack-plans-routing.module';
import { OpenstackPlanListComponent } from './openstack-plan-list/openstack-plan-list.component';
import { OpenstackPlanDetailsComponent } from './openstack-plan-details/openstack-plan-details.component';
import { OpenstackPlanCreateComponent } from './openstack-plan-create/openstack-plan-create.component';
import { OpenstackPlanEditComponent } from './openstack-plan-edit/openstack-plan-edit.component';
import { ObjectsViewModule } from '../../../../shared/ui/objects-view/objects-view.module';
import { ReactiveFormsModule } from '@angular/forms';
import { ErrorHandlingModule } from '../../../../shared/error-handling/error-handling.module';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { PricingPlanListUIService } from './openstack-plan-list-ui.service';
import { MatTableModule } from '@angular/material/table';
import { FlexModule } from '@angular/flex-layout';
import { MatIconModule } from '@angular/material/icon';


@NgModule({
  declarations: [
    OpenstackPlanListComponent,
    OpenstackPlanDetailsComponent,
    OpenstackPlanCreateComponent,
    OpenstackPlanEditComponent,
  ],
  imports: [
    CommonModule,
    OpenstackPlansRoutingModule,
    ObjectsViewModule,
    ReactiveFormsModule,
    ErrorHandlingModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatCheckboxModule,
    MatDialogModule,
    MatButtonModule,
    MatTableModule,
    FlexModule,
    MatIconModule,
  ],
  providers: [
    {
      provide: PricingPlanListUIService,
      useClass: PricingPlanListUIService,
      multi: false,
    },
  ]
})
export class OpenstackPlansModule {
}
