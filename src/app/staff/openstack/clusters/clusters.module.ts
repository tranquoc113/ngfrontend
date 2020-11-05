import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClustersRoutingModule } from './clusters-routing.module';
import { ObjectsViewModule } from '@objects-view/objects-view.module';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { ErrorHandlingModule } from '@shared/error-handling/error-handling.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ClusterListComponent } from './cluster-list/cluster-list.component';
import { ClusterCreateComponent } from './cluster-create/cluster-create.component';
import { ClusterDetailsComponent } from './cluster-details/cluster-details.component';
import { ClusterResizeComponent } from './cluster-resize/cluster-resize.component';
import { ClusterUpgradeComponent } from './cluster-upgrade/cluster-upgrade.component';


@NgModule({
  declarations: [
    ClusterListComponent,
    ClusterCreateComponent,
    ClusterDetailsComponent,
    ClusterResizeComponent,
    ClusterUpgradeComponent,
  ],
  imports: [
    CommonModule,
    ClustersRoutingModule,
    ObjectsViewModule,
    ReactiveFormsModule,
    MatCheckboxModule,
    ErrorHandlingModule,
    FlexLayoutModule,
    MatFormFieldModule,
    MatInputModule,
  ]
})
export class ClustersModule {
}
